import logging

from django.contrib.auth import login
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

logger = logging.getLogger(__name__)


class Register(APIView):
    """
    This APIView takes care of the registration of new users.
    It checks if the new user has entered all fields for registration.
    When a new user logs in, he is also directly logged in and receives a token.
    """

    @staticmethod
    def validate(data: dict):
        """
        This method validates the data provided for the new user.
        It validates if the username, email and the password is set and they are not empty.

        :param data: The data provided by the new user.
        :return: 400_BAD_REQUEST if the provided data is sparse or one of the values is empty.
                 200_OK otherwise.
        """
        fields = ["username", "email", "password"]
        for field in fields:
            if field not in data.keys():
                return Response(status=status.HTTP_400_BAD_REQUEST,
                                data={"error": "{} is missing!".format(field)})
            if not data[field]:
                return Response(status=status.HTTP_400_BAD_REQUEST,
                                data={"error": "{} is empty!".format(field)})
        return Response(status=status.HTTP_200_OK)

    def post(self, request):
        """
        This method handles the actual POST-request of the new user.
        First the data send is checked for mistakes, missing or empty values.
        Afterwards the User is created and logged in.

        :param request: The request of the new user containing all necessary information for an registration.
        :return: 400_BAD_REQUEST if the provided data is sparse or one of the values is empty.
                 409_CONFLICT if the user is allready in the system.
                 201_CREATE if the new user is created (Contains the token in the data-section).
        """
        data: dict = request.data

        valid: Response = self.validate(data)
        if valid.status_code != 200:
            return valid

        username = data["username"]
        email = data["email"]
        password = data["password"]
        try:
            user: User = User.objects.create_user(username=username, email=email, password=password)
            login(request, user)
        except IntegrityError as error:
            return Response(status=status.HTTP_409_CONFLICT, data={"error": str(error)})
        return Response(status=status.HTTP_201_CREATED, data={"token": str(Token.objects.create(user=user))})
