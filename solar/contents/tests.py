from django.contrib.auth.models import User
from django.test import TestCase

from accounts.models import Account
from contents.models import Statement


class TestStatement(TestCase):
    def setUp(self):
        self.user_bernd = User.objects.create_user(username="Bernd", email="Bernd@Brot.de", password="Brot")
        self.account_bernd: Account = Account.objects.create(user=self.user_bernd)
        self.statement_database: Statement = Statement.objects.create(author=self.account_bernd, content="I like Beate")

    def test_account_has_statement_from_database(self):
        statement: Statement = self.account_bernd.statement_set.first()
        self.assertEqual(statement, self.statement_database)

    def tearDown(self):
        self.user_bernd.delete()
        try:
            user_exists = User.objects.get(username=self.user_bernd.username)
        except Exception as exception:
            user_exists = None
        self.assertIsNone(user_exists)
        # check if bends account is deleted
        try:
            account_exists = Account.objects.get(user=self.user_bernd)
        except Exception as exception:
            account_exists = None
        self.assertIsNone(account_exists)
