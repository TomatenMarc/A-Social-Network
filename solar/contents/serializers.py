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


class StatementSerializer(serializers.ModelSerializer):
    """
    This serializer serializes the statements and their content.
    It can be used to serialize content of a statement.
    """
    author = AccountSerializer()
    tagged = serializers.ListField(source='get_hashtags', child=HashtagSerializer())
    mentioned = serializers.ListField(source='get_mentioning', child=AccountSerializer())

    class Meta:
        model = Statement
        fields = ('id', 'author', 'content', 'tagged', 'mentioned',)


class ReactionSerializer(serializers.ModelSerializer):
    """
    This serializer is for reactions.
    It will return the serialized reaction and shows the id, vote and the child statement.
    """
    child = StatementSerializer()

    class Meta:
        model = Reaction
        fields = ('id', 'vote', 'child')


class StatementObservationSerializer(StatementSerializer):
    """
    This serializer is for the statement observation.
    Therefore the reactions are extended in the fields.
    """
    reactions = serializers.ListField(source='get_reactions', child=ReactionSerializer())

    class Meta:
        model = Statement
        fields = StatementSerializer.Meta.fields + ('reactions',)
