from typing import List

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
        statements: List[Statement] = self.account_bernd.get_statements()
        self.assertNotEqual(statements, [])
        self.assertEqual(statements[0], self.statement_database)

    def test_account_can_add_statement(self):
        self.account_bernd.add_statement("I <3 burgers")
        self.assertEqual(len(self.account_bernd.get_statements()), 2)
        self.assertEqual(self.account_bernd.get_statements()[1].content, "I <3 burgers")

    def tearDown(self):
        self.user_bernd.delete()
        try:
            user_exists = User.objects.get(username=self.user_bernd.username)
        except Exception as exception:
            user_exists = None
        self.assertIsNone(user_exists)
        # check if bernds account is deleted
        try:
            account_exists = Account.objects.get(user=self.user_bernd)
        except Exception as exception:
            account_exists = None
        self.assertIsNone(account_exists)
        # check if bernds statements are deleted
        try:
            statements_exists = Statement.objects.get(user=self.user_bernd)
        except Exception as exception:
            statements_exists = None
        self.assertIsNone(statements_exists)
