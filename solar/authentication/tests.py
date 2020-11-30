from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.test import APITestCase, APIClient


class TestSignUp(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="Rudiger", email="Rudiger@Dog.com", password="Rudiger")
        self.user.save()

    def test_valid_user_obtains_token(self):
        response: Response = self.client.post(path="/authentication/obtain/", data={
            "username": "Rudiger",
            "password": "Rudiger"
        })
        self.assertEqual(response.status_code, Response(status=status.HTTP_200_OK).status_code)
        self.assertTrue("token" in response.data.keys())
        self.assertIsNotNone(response.data["token"])

    def test_invalid_user_does_not_obtains_token(self):
        response: Response = self.client.post(path="/authentication/obtain/", data={
            "username": "Klaus",
            "password": "Klaus"
        })
        self.assertEqual(response.status_code, Response(status=status.HTTP_400_BAD_REQUEST).status_code)
