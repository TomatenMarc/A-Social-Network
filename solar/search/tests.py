from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.test import APIClient, APITestCase

from accounts.models import Account
from contents.models import Hashtag


class TestSearch(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_bernd = User.objects.create_user(username="Bernd", email="Bernd@Brot.de", password="Brot")
        self.token_bernd = Token.objects.create(user=self.user_bernd)
        self.account_bernd: Account = Account.objects.create(user=self.user_bernd)
        self.hashtag: Hashtag = Hashtag.objects.create(tag="Berg")

    def clear_up_users(self, users: list[User]):
        for user in users:
            user.delete()
            try:
                user_exists = User.objects.get(username=user.username)
            except Exception as exception:
                user_exists = None
            self.assertIsNone(user_exists)
        # check if the accounts are also removed if the user is deleted
        for user in users:
            try:
                account_exists = Account.objects.get(user=user)
            except Exception as exception:
                account_exists = None
            self.assertIsNone(account_exists)

    def tearDown(self):
        self.clear_up_users([self.user_bernd])
        self.hashtag.delete()

    def test_user_can_search(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + str(self.token_bernd))
        response: Response = self.client.get(path="/search/?q=Ber")
        self.assertEqual(len(response.data["accounts"]), 1)
        self.assertEqual(response.data["accounts"][0]["user"]["username"], self.user_bernd.username)
        self.assertEqual(len(response.data["hashtags"]), 1)
        self.assertEqual(response.data["hashtags"][0]["tag"], self.hashtag.tag)

    def test_user_can_filter_search(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + str(self.token_bernd))
        response: Response = self.client.get(path="/search/?q=Ber&filter=account")
        self.assertEqual(len(response.data["accounts"]), 1)
        self.assertEqual(response.data["accounts"][0]["user"]["username"], self.user_bernd.username)
        self.assertTrue("hashtags" not in response.data.keys())
        response: Response = self.client.get(path="/search/?q=Ber&filter=hashtag")
        self.assertEqual(len(response.data["hashtags"]), 1)
        self.assertEqual(response.data["hashtags"][0]["tag"], self.hashtag.tag)
        self.assertTrue("accounts" not in response.data.keys())
