from typing import List

from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.response import Response
from rest_framework.test import APIClient, APITestCase

from .models import Account


class TestAccounts(TestCase):

    def setUp(self):
        self.user_bernd = User.objects.create_user(username="Bernd", email="Bernd@Brot.de", password="Brot")
        self.user_beate = User.objects.create_user(username="Beate", email="Rote@Beate.de", password="Rote")

        self.account_bernd: Account = Account.objects.create(user=self.user_bernd)
        self.account_beate: Account = Account.objects.create(user=self.user_beate)

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
        self.clear_up_users([self.user_beate, self.user_bernd])

    def test_account_can_follow_accounts(self):
        self.assertIsNotNone(self.account_bernd)
        self.assertIsNotNone(self.account_beate)
        self.assertFalse(self.account_bernd.related_to.all().exists())
        self.assertFalse(self.account_beate.related_to.all().exists())

        created: bool = self.account_beate.add_relationship(self.account_bernd)
        self.assertTrue(created)
        # Beate should have an relationship to Bernd
        beates_relations = self.account_beate.related_to.all()
        self.assertEqual(beates_relations[0], self.account_bernd)
        # But Bernd should not have an relationship to Beate
        self.assertFalse(self.account_bernd.related_to.all().exists())

    def test_account_can_unfollow_accounts(self):
        self.test_account_can_follow_accounts()
        deleted: bool = self.account_beate.remove_relationship(self.account_bernd)
        # Beate can delete her relationships
        self.assertTrue(deleted)
        self.assertFalse(self.account_beate.related_to.all().exists())

    def test_accounts_provide_related_accounts(self):
        self.test_account_can_follow_accounts()
        related_accounts_of_beate: List[Account] = self.account_beate.get_related_to()
        related_accounts_of_bernd: List[Account] = self.account_bernd.get_related_to()
        # there are results for the relationships for beate but not for bernd
        self.assertIsNotNone(related_accounts_of_beate)
        self.assertIsNotNone(related_accounts_of_bernd)
        self.assertEqual(related_accounts_of_bernd, [])
        # Beate has relation to Bernd
        self.assertEqual(related_accounts_of_beate[0], self.account_bernd)

    def test_accounts_can_provides_accounts_who_relates_with_them(self):
        self.test_account_can_follow_accounts()
        accounts_relating_to_beate: List[Account] = self.account_beate.get_related_by()
        accounts_relating_to_bernd: List[Account] = self.account_bernd.get_related_by()
        # Beate only relates to Bernd
        self.assertEqual([], accounts_relating_to_beate)
        self.assertNotEqual([], accounts_relating_to_bernd)


class TestGetAccount(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_bernd = User.objects.create_user(username="Bernd", email="Bernd@Brot.de", password="Brot")
        self.user_beate = User.objects.create_user(username="Beate", email="Rote@Beate.de", password="Rote")

        self.account_bernd: Account = Account.objects.create(user=self.user_bernd)
        self.account_beate: Account = Account.objects.create(user=self.user_beate)

    def test_account_provide_public_data(self):
        created: bool = self.account_beate.add_relationship(self.account_bernd)
        self.assertTrue(created)
        # Beate should have an relationship to Bernd
        beates_relations = self.account_beate.related_to.all()
        self.assertEqual(beates_relations[0], self.account_bernd)
        # But Bernd should not have an relationship to Beate
        self.assertFalse(self.account_bernd.related_to.all().exists())

        response: Response = self.client.get(path="/accounts/show/{}/".format(self.user_beate.id))

        # public information about beate
        self.assertEqual(response.data[0]["user"]["username"], self.user_beate.username)
        self.assertEqual(response.data[0]["user"]["id"], self.user_beate.id)

        # public information about the account she is relates to
        self.assertEqual(response.data[0]["related_to"][0]["user"]["username"], self.user_bernd.username)
        self.assertEqual(response.data[0]["related_to"][0]["user"]["id"], self.user_bernd.id)

        # public information about the account who relates to her
        self.assertEqual(response.data[0]["related_by"], [])

        # what do we know about bernd
        response: Response = self.client.get(path="/accounts/show/{}/".format(self.user_bernd.id))

        # public information about bernd
        self.assertEqual(response.data[0]["user"]["username"], self.user_bernd.username)
        self.assertEqual(response.data[0]["user"]["id"], self.user_bernd.id)

        # public information about the accounts who relates to Bernd
        self.assertEqual(response.data[0]["related_by"][0]["user"]["username"], self.user_beate.username)
        self.assertEqual(response.data[0]["related_by"][0]["user"]["id"], self.user_beate.id)

        # public information about the account Bernd relates to
        self.assertEqual(response.data[0]["related_to"], [])

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
        self.clear_up_users([self.user_beate, self.user_bernd])
