from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.test import APITestCase, APIClient


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


class TestRegistration(APITestCase):
    def setUp(self):
        self.client = APIClient()

    def test_everything_is_missing(self):
        response: Response = self.client.post(path="/authentication/register/", data={})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "username is missing!")

    def test_everything_is_empty(self):
        response: Response = self.client.post(path="/authentication/register/", data={
            "username": "",
            "email": "",
            "password": ""
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "username is empty!")

    def test_password_is_missing(self):
        response: Response = self.client.post(path="/authentication/register/", data={
            "username": "username",
            "email": "e@mail.de"
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "password is missing!")

    def test_password_is_empty(self):
        response: Response = self.client.post(path="/authentication/register/", data={
            "username": "username",
            "password": "",
            "email": "e@mail.de"
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "password is empty!")

    def test_email_is_missing(self):
        response: Response = self.client.post(path="/authentication/register/", data={
            "username": "username",
            "password": "password"
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "email is missing!")

    def test_email_is_empty(self):
        response: Response = self.client.post(path="/authentication/register/", data={
            "username": "username",
            "password": "",
            "email": ""
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "email is empty!")

    def test_user_already_exists(self):
        user = User.objects.create_user(username="Peter", password="password", email="e@mail.de")

        response: Response = self.client.post(path="/authentication/register/", data={
            "username": "Peter", "password": "password", "email": "e@mail.de"
        })

        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)

        self.assertEqual(response.data["error"], "UNIQUE constraint failed: auth_user.username")

    def test_register_valid_user(self):
        response: Response = self.client.post(path="/authentication/register/", data={
            "username": "another_user",
            "password": "another_password",
            "email": "another_e@mail.de"
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        token_user: User = Token.objects.get(key=response.data["token"]).user
        user: User = User.objects.get(username="another_user")
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
        self.assertEqual(response.data["error"], "Username or password invalid!")

    def test_user_can_not_login_with_wrong_password(self):
        response: Response = self.client.post(path="/authentication/login/", data={
            "username": "Bernd", "password": "Brötchen"
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "Username or password invalid!")

    def test_user_can_not_login_without_username(self):
        response: Response = self.client.post(path="/authentication/login/", data={
            "password": "Brot"
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "username is missing!")

    def test_user_can_not_login_with_empty_username(self):
        response: Response = self.client.post(path="/authentication/login/", data={
            "username": "", "password": "Brot"
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "username is empty!")

    def test_user_can_not_login_without_password(self):
        response: Response = self.client.post(path="/authentication/login/", data={
            "username": "Bernd"
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "password is missing!")

    def test_user_can_not_login_with_empty_password(self):
        response: Response = self.client.post(path="/authentication/login/", data={
            "username": "Bernd", "password": ""
        })

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["error"], "password is empty!")

    def tearDown(self):
        self.user.delete()
        try:
            user = User.objects.get(username="Bernd")
        except Exception as exception:
            user = None
        self.assertIsNone(user)
