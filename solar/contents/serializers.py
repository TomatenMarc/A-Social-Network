from django.apps import apps
from rest_framework import serializers

from authentication.serializers import UserPublicSerializer
from .models import Statement, Hashtag, Reaction


class HashtagSerializer(serializers.ModelSerializer):
    """
    This serializer can be used to serialize hashtags.
    """

    class Meta:
        model = Hashtag
        fields = ("id", "tag",)


class TrendingHashtagSerializer(HashtagSerializer):
    count = serializers.SerializerMethodField('_count')

    def _count(self, obj: Hashtag):
        return self.context["counted"][obj.id]

    class Meta:
        model = Hashtag
        fields = HashtagSerializer.Meta.fields + ('count',)


class AccountSerializer(serializers.ModelSerializer):
    """
    This serializer serializes the accounts and their data.
    It can be used to serialize accounts.
    Todo: Replace the account mentioning with users to remove this dependencies.
    """
    user = UserPublicSerializer()

    class Meta:
        model = apps.get_model("accounts", "Account")
        fields = ('user', 'image',)


class SimpleStatementSerializer(serializers.ModelSerializer):
    """
    This serializer serializes the statements and their content.
    It can be used to serialize content of a statement.
    """
    author = AccountSerializer()
    tagged = serializers.ListField(source='get_hashtags', child=HashtagSerializer())
    mentioned = serializers.ListField(source='get_mentioning', child=AccountSerializer())

    class Meta:
        model = Statement
        fields = ('id', 'author', 'content', 'tagged', 'mentioned', 'created')


class ReactionSerializer(serializers.ModelSerializer):
    """
    This serializer is for reactions.
    It will return the serialized reaction and shows the id, vote and the child statement.
    """
    child = SimpleStatementSerializer()
    parent = SimpleStatementSerializer()

    class Meta:
        model = Reaction
        fields = ('id', 'vote', 'child', 'parent')


class StatementSerializer(SimpleStatementSerializer):
    """
    This is more then the simple statement serializer.
    With this serializer one can also get information regarding the connection to the parent.
    Todo: Is there a way to combine each statement with parent and child information and shorten the frontend?
    """
    relation_to_parent = serializers.ListField(source='get_reaction_to_parent', child=ReactionSerializer())

    class Meta:
        model = Statement
        fields = SimpleStatementSerializer.Meta.fields + ('relation_to_parent',)


class StatementObservationSerializer(StatementSerializer):
    """
    This serializer is for the statement observation.
    Therefore the reactions are extended in the fields.
    """
    reactions = serializers.ListField(source='get_reactions', child=ReactionSerializer())

    class Meta:
        model = Statement
        fields = StatementSerializer.Meta.fields + ('reactions',)
