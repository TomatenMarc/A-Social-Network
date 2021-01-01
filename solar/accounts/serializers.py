from rest_framework import serializers

from accounts.models import Account
from authentication.serializers import UserPublicSerializer, UserOwnSerializer
from contents.serializers import StatementSerializer


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
    # these are all statements of the account
    statements = serializers.ListField(source='get_statements', child=StatementSerializer())

    class Meta:
        model = Account
        fields = ('user', 'image', 'biography', 'related_to', 'statements')


class AccountOwnSerializer(AccountPublicSerializer):
    """
    This serializer is for the representation of an own account.
    It shows more information to the user then the public serializer.
    """
    # this is the parent account, it overwrites the field of AccountPublicSerializer
    user = UserOwnSerializer()
    # to see how follows the own account
    related_by = serializers.ListField(source='get_related_by', child=AccountSerializer())

    class Meta:
        model = Account
        fields = ('user', 'image', 'biography', 'related_by', 'related_to', 'statements')
