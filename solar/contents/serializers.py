from django.apps import apps
from rest_framework import serializers

from authentication.serializers import UserPublicSerializer
from .models import Statement, Hashtag


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
        fields = ('user',)


class StatementSerializer(serializers.ModelSerializer):
    """
    This serializer serializes the statements and their content.
    It can be used to serialize content of a statement.
    """

    tagged = serializers.ListField(source='get_hashtags', child=HashtagSerializer())
    mentioned = serializers.ListField(source='get_mentioning', child=AccountSerializer())

    class Meta:
        model = Statement
        fields = ('id', 'content', 'tagged', 'mentioned',)
