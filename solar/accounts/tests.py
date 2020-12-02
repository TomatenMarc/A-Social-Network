from django.contrib.auth.models import User
from django.test import TestCase

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
        self.assertFalse(self.account_bernd.relationships.all().exists())
        self.assertFalse(self.account_beate.relationships.all().exists())

        self.account_beate.add_relationship(self.account_bernd)
        # Beate should have an relationship to Bernd
        beates_relations = self.account_beate.relationships.all()
        self.assertEqual(beates_relations[0], self.account_bernd)
        # But Bernd should not have an relationship to Beate
        self.assertFalse(self.account_bernd.relationships.all().exists())
