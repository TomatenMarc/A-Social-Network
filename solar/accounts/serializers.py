from rest_framework import serializers

from accounts.models import Account
from authentication.serializers import UserPublicSerializer


class AccountSerializer(serializers.ModelSerializer):
    """
    This serializer serializes the accounts and their data.
    It can be used to serialize accounts.
    """
    user = UserPublicSerializer()

    class Meta:
        model = Account
        fields = ('user',)


class AccountPublicSerializer(serializers.ModelSerializer):
    """
    This serializer serializes the public data of accounts.
    It can be used to get all public data of the accounts.
    """
    # this is the parent account
    user = UserPublicSerializer()
    # these are the related (child) accounts
    related_to = serializers.ListField(source='get_related_to', child=AccountSerializer())
    related_by = serializers.ListField(source='get_related_by', child=AccountSerializer())

    class Meta:
        model = Account
        fields = ('user', 'related_to', 'related_by')
