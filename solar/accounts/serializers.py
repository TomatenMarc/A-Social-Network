from rest_framework import serializers

from accounts.models import Account
from authentication.serializers import UserPublicSerializer


class AccountSerializer(serializers.ModelSerializer):
    """
    This serializer serializes the accounts and their data.
    """
    user = UserPublicSerializer()

    class Meta:
        model = Account
        fields = ('user', 'related_to')
        depth = 1
