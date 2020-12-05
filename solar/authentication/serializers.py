import logging

from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

logger = logging.getLogger(__name__)


class UserDefaultSerializer(serializers.ModelSerializer):
    """
    This is the default serializer to get users and validate their data.
    """

    class Meta:
        model = User
        fields = ['username', 'password']


class UserRegisterSerializer(serializers.ModelSerializer):
    """
    This serializer is used for user registration and their validation.
    A user should have a unique valid and non-empty username, email and password.
    """
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(queryset=User.objects.all())
        ]
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password']
