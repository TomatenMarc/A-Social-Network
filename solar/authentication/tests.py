from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.test import APITestCase, APIClient

from accounts.models import Account


class TestObtainingAToken(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="Rudiger", email="Rudiger@Dog.com", password="Rudiger")
        self.user.save()

    def tearDown(self):
        self.user.delete()
        try:
            user = User.objects.get(username="Rudiger")
        except Exception as exception:
            user = None
        self.assertIsNone(user)

    def test_valid_user_obtains_token(self):
        response: Response = self.client.post(path="/authentication/obtain/", data={
            "username": "Rudiger",
            "password": "Rudiger"
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("token" in response.data.keys())
        self.assertIsNotNone(response.data["token"])

    def test_invalid_user_does_not_obtains_token(self):
        response: Response = self.client.post(path="/authentication/obtain/", data={
            "username": "Klaus",
            "password": "Klaus"
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class TestValidateAToken(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="Rudiger", email="Rudiger@Dog.com", password="Rudiger")
        self.user_token = Token.objects.create(user=self.user)

    def tearDown(self):
        self.user.delete()
        try:
            user = User.objects.get(username="Rudiger")
        except Exception as exception:
            user = None
        self.assertIsNone(user)

    def test_invalid_user_cant_validate_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + 'Invalid Token')
        response: Response = self.client.get(path="/authentication/validate/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_valid_user_can_validate_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + str(self.user_token))
        response: Response = self.client.get(path="/authentication/validate/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestRegistration(APITestCase):
    def setUp(self):
        self.client = APIClient()

    def test_everything_is_missing(self):
        response: Response = self.client.post(path="/authentication/register/", data={})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["username"][0].code, "required")
        self.assertEqual(response.data["password"][0].code, "required")
        self.assertEqual(response.data["email"][0].code, "required")

    def test_everything_is_empty(self):
        response: Response = self.client.post(path="/authentication/register/", data={
            "username": "",
            "email": "",
            "password": ""
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["username"][0].code, "blank")
        self.assertEqual(response.data["password"][0].code, "blank")
        self.assertEqual(response.data["email"][0].code, "blank")

    def test_user_and_email_already_exists(self):
        user = User.objects.create_user(username="Peter", password="password", email="e@mail.de")

        response: Response = self.client.post(path="/authentication/register/", data={
            "username": "Peter",
            "password": "password",
            "email": "e@mail.de"
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["username"][0].code, "unique")
        self.assertEqual(response.data["email"][0].code, "unique")

    def test_username_is_not_alphanumeric(self):
        response: Response = self.client.post(path="/authentication/register/", data={
            "username": "NoWay%&/\/8)(?=!"'``´',
            "password": "password",
            "email": "e@mail.de"
        })
        self.assertEqual(response.data["username"][0].code, "invalid")

    def test_register_valid_user(self):
        response: Response = self.client.post(path="/authentication/register/", data={
            "username": "another_user100",
            "password": "another_password",
            "email": "another_e@mail.de"
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        token_user: User = Token.objects.get(key=response.data["token"]).user
        user: User = User.objects.get(username="another_user100")
        account: Account = Account.objects.get(user=user)
        self.assertIsNotNone(account)
        self.assertEqual(account.user, user)
        self.assertEqual(token_user, user)


class TestLogin(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="Bernd", email="Bernd@Brot.com", password="Brot")
        self.user.save()

    def test_valid_user_can_login(self):
        response: Response = self.client.post(path="/authentication/login/", data={
            "username": "Bernd", "password": "Brot"
        })

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        user: User = Token.objects.get(key=response.data["token"]).user
        self.assertEqual(self.user, user)
        user: User = authenticate(username="Bernd", password="Brot")
        self.assertIsNotNone(user)

    def test_token_gets_refreshed_after_new_login(self):
        response: Response = self.client.post(path="/authentication/login/", data={
            "username": "Bernd", "password": "Brot"
        })

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        token_old: Token = Token.objects.get(key=response.data["token"])
        self.assertIsNotNone(token_old)

        response: Response = self.client.post(path="/authentication/login/", data={
            "username": "Bernd", "password": "Brot"
        })

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        token_new: Token = Token.objects.get(key=response.data["token"])
        self.assertIsNotNone(token_new)

        self.assertNotEqual(token_old, token_new)

    def test_user_can_not_login_with_wrong_username(self):
        response: Response = self.client.post(path="/authentication/login/", data={
            "username": "Berndy", "password": "Brot"
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["user"][0].code, "invalid")

    def test_user_can_not_login_with_wrong_password(self):
        response: Response = self.client.post(path="/authentication/login/", data={
            "username": "Bernd", "password": "Brötchen"
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["user"][0].code, "invalid")

    def test_user_can_not_login_without_username(self):
        response: Response = self.client.post(path="/authentication/login/", data={
            "password": "Brot"
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["username"][0].code, "required")

    def test_user_can_not_login_with_empty_username(self):
        response: Response = self.client.post(path="/authentication/login/", data={
            "username": "", "password": "Brot"
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["username"][0].code, "blank")

    def test_user_can_not_login_without_password(self):
        response: Response = self.client.post(path="/authentication/login/", data={
            "username": "Bernd"
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["password"][0].code, "required")

    def test_user_can_not_login_with_empty_password(self):
        response: Response = self.client.post(path="/authentication/login/", data={
            "username": "Bernd", "password": ""
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["password"][0].code, "blank")

    def tearDown(self):
        self.user.delete()
        try:
            user = User.objects.get(username="Bernd")
        except Exception as exception:
            user = None
        self.assertIsNone(user)


class TestLogout(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="Beate", email="Rote@Beate.com", password="Rote")
        self.user.save()

    def test_valid_user_can_logout(self):
        response: Response = self.client.post(path="/authentication/login/", data={
            "username": "Beate", "password": "Rote"
        })

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        token: Token = Token.objects.get(key=response.data["token"])
        user: User = token.user
        self.assertEqual(self.user, user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + str(token))
        response: Response = self.client.post(path="/authentication/logout/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        token: Token = Token.objects.filter(user=user).first()
        self.assertIsNone(token)

    def test_valid_user_can_not_logout_twice(self):
        response: Response = self.client.post(path="/authentication/login/", data={
            "username": "Beate", "password": "Rote"
        })

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        user: User = Token.objects.get(key=response.data["token"]).user
        token: Token = Token.objects.get(key=response.data["token"])
        self.assertEqual(self.user, user)

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + str(token))
        response: Response = self.client.post(path="/authentication/logout/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        token: Token = Token.objects.filter(user=user).first()
        self.assertIsNone(token)

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + str(token))
        response: Response = self.client.post(path="/authentication/logout/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def tearDown(self):
        self.user.delete()
        try:
            user = User.objects.get(username="Rote")
        except Exception as exception:
            user = None
        self.assertIsNone(user)
