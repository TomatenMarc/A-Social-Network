from typing import List

from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.test import APITestCase, APIClient

from accounts.models import Account
from contents.models import Statement, Hashtag, Reaction


class TestStatement(TestCase):
    def setUp(self):
        self.user_bernd = User.objects.create_user(username="Bernd", email="Bernd@Brot.de", password="Brot")
        self.account_bernd: Account = Account.objects.create(user=self.user_bernd)

        self.user_beate = User.objects.create_user(username="Beate", email="Rote@Beate.de", password="Beate")
        self.account_beate: Account = Account.objects.create(user=self.user_beate)

        self.statement: Statement = Statement.objects.create(author=self.account_bernd, content="I like Beate")
        self.statement_with_hashtags_and_mentioning: Statement = Statement.objects.create(author=self.account_bernd,
                                                                                          content="I like #eating the #/&%! whopper #Burger_King2020 with @Beate @NoOne")
        self.hashtag: Hashtag = Hashtag.objects.create(tag="Burger_King2020")

    def test_statement_can_mention_account(self):
        created = self.statement.add_mentioning(self.account_beate)
        self.assertTrue(created)
        mentions = self.statement.get_mentioning()
        self.assertNotEqual(mentions, [])
        self.assertEqual(mentions[0], self.account_beate)
        deleted = self.statement.remove_mentioning(self.account_beate)
        self.assertTrue(deleted)
        mentions = self.statement.get_mentioning()
        self.assertEqual(mentions, [])

    def test_account_has_statement_from_database(self):
        statements: List[Statement] = self.account_bernd.get_statements()
        self.assertNotEqual(statements, [])
        self.assertEqual(statements[1], self.statement)

    def test_account_can_add_statement(self):
        self.account_bernd.add_statement("I <3 burgers")
        self.assertEqual(len(self.account_bernd.get_statements()), 3)
        self.assertEqual(self.account_bernd.get_statements()[0].content, "I <3 burgers")

    def test_statement_resolves_hashtags(self):
        hashtags = self.statement_with_hashtags_and_mentioning.get_hashtags()
        self.assertEqual(len(hashtags), 2)
        self.assertEqual(hashtags[0].tag, "eating")
        self.assertEqual(hashtags[1].tag, "Burger_King2020")

    def test_statement_resolves_mentions(self):
        mentions = self.statement_with_hashtags_and_mentioning.get_mentioning()
        self.assertNotEqual(mentions, [])
        self.assertEqual(len(mentions), 1)
        self.assertEqual(mentions[0], self.account_beate)

    def test_statement_can_add_hashtag(self):
        created = self.statement.add_hashtag(self.hashtag)
        self.assertTrue(created)

        hashtags = self.statement.get_hashtags()
        self.assertNotEqual(hashtags, [])
        self.assertEqual(self.hashtag, hashtags[0])

        deleted = self.statement.remove_hashtag(self.hashtag)
        self.assertTrue(deleted)

        hashtags = self.statement.get_hashtags()
        self.assertEqual(hashtags, [])

    def test_statement_can_add_reaction(self):
        created = self.statement.add_reaction(self.statement_with_hashtags_and_mentioning, 1)
        self.assertTrue(created)
        reactions: List[Reaction] = self.statement.get_reactions()
        self.assertEqual(len(reactions), 1)
        reaction: Reaction = reactions[0]
        self.assertEqual(reaction.get_vote_display(), "like")
        self.assertEqual(reaction.child, self.statement_with_hashtags_and_mentioning)
        deleted = self.statement_with_hashtags_and_mentioning.remove_as_reaction()
        self.assertTrue(deleted)

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
        try:
            hashtag_exists = Statement.objects.get(user=self.hashtag)
        except Exception as exception:
            hashtag_exists = None
        self.assertIsNone(hashtag_exists)


class TestGetStatement(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_bernd = User.objects.create_user(username="Bernd", email="Bernd@Brot.de", password="Brot")
        self.account_bernd: Account = Account.objects.create(user=self.user_bernd)
        self.token_bernd = Token.objects.create(user=self.user_bernd)
        self.statement_1: Statement = Statement.objects.create(author=self.account_bernd, content="I like @Bernd #Foo")
        self.statement_2: Statement = Statement.objects.create(author=self.account_bernd, content="I like Beate")

    def test_statement_provides_data(self):
        self.statement_1.add_reaction(self.statement_2, 2)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + str(self.token_bernd))
        response: Response = self.client.get(path="/contents/statements/get/{id}/".format(id=self.statement_1.id))
        self.assertEqual(response.data[0]["id"], self.statement_1.id)
        self.assertEqual(len(response.data[0]["mentioned"]), 1)
        self.assertEqual(len(response.data[0]["tagged"]), 1)
        self.assertEqual(len(response.data[0]["reactions"]), 1)
        reaction = response.data[0]["reactions"][0]
        self.assertEqual(reaction["vote"], 2)
        self.assertEqual(reaction["child"]["id"], self.statement_2.id)
        self.assertEqual(self.statement_2.get_parent(), self.statement_1)
        self.assertIsNone(self.statement_1.get_parent())
        self.assertEqual(self.statement_2.get_reaction_to_parent()[0].vote, 2)

    def test_statements_with_hashtags_can_be_provided(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + str(self.token_bernd))
        response: Response = self.client.get(path="/contents/statements/with/hashtag/?q=Foo")
        self.assertTrue(len(response.data) != 0)

        self.assertEqual(response.data[0]["id"], self.statement_1.id)
