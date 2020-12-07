import logging

from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import Account
from authentication import Operations
from authentication.validation import validate_request_data_for

logger = logging.getLogger(__name__)


class Register(APIView):
    """
    This APIView takes care of the registration of new users.
    It checks if the new user has entered all fields for registration.
    When a new user logs in, he is also directly logged in and receives a token.
    """

    @staticmethod
    def validate(request: Request) -> Response:
        """
        This method validates the data provided for the new user.
        It validates if the username, email and the password is set and they are not empty.

        :param request: The request which should be validated.
        :return: 400_BAD_REQUEST if the provided data is sparse or one of the values is empty.
                 201_CREATED otherwise.
        """
        return validate_request_data_for(Operations.REGISTER, request)

    def post(self, request: Request) -> Response:
        """
        This method handles the actual POST-request of the new user.
        First the data send is checked for mistakes, missing or empty values.
        Afterwards the User is created and logged in.

        :param request: The request of the new user containing all necessary information for an registration.
        :return: 400_BAD_REQUEST if the provided data is sparse or one of the values is empty or the user existing.
                 201_CREATE if the new user is created (Contains the token in the data-section).
        """
        data: dict = request.data

        valid: Response = self.validate(request)
        if valid.status_code != 201:
            return valid

        username: str = data["username"]
        user: User = User.objects.filter(username=username).first()
        account: Account = Account.objects.create(user=user)
        login(request, account.user)
        return Response(status=valid.status_code, data={"token": Token.objects.create(user=account.user).__str__()})


class Login(APIView):
    """
    This APIView takes care of the login of a requesting users.
    It checks if the user has entered all fields for login.
    When a user logs in, he receives a token.
    """

    @staticmethod
    def validate(request: Request) -> Response:
        """
        This method validates the data provided for the requesting user.
        It validates if the username and the password is set and they are not empty.

        :param request: The data provided by the requesting user.
        :return: 400_BAD_REQUEST if the provided data is sparse or one of the values is empty.
                 200_OK otherwise.
        """
        return validate_request_data_for(Operations.LOGIN, request)

    def post(self, request):
        """
        This method handles the actual POST-request of the requesting user.
        First the data send is checked for mistakes, missing or empty values.
        Afterwards the User is authenticated and logged in.
        
        :param request: The request of the user containing all necessary information for an login.
        :return: 400_BAD_REQUEST if the provided data is sparse or one of the values is empty or wrong.
                 200_OK if the user is authenticated (Contains the token in the data-section).
        """
        data: dict = request.data

        valid: Response = self.validate(request)
        if valid.status_code != 200:
            return valid

        username: str = data["username"]
        user: User = User.objects.filter(username=username).first()
        token, operation_was_create = Token.objects.get_or_create(user=user)

        if not operation_was_create:
            # refresh the token if there was a previous token detected
            token.delete()
            token = Token.objects.create(user=user)
        login(request, user)

        return Response(status=status.HTTP_200_OK, data={"token": token.key.__str__()})


class Logout(APIView):
    """
    This APIView takes care of the logout of a requesting users.
    It checks if the user has entered all fields for logout.
    When a user logs out, his token will be destroyed.
    """

    @staticmethod
    def validate(data: dict) -> Response:
        """
        This method validates the data provided for the requesting user.
        It validates if the username and the password is set and they are not empty.

        :param data: The data provided by the new user.
        :return: 400_BAD_REQUEST if the provided data is sparse or one of the values is empty.
                 200_OK otherwise.
        """
        fields = ["username", "password"]
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
        This method handles the actual POST-request of the requesting user.
        First the data send is checked for mistakes, missing or empty values.
        Afterwards the User is authenticated and logged out.

        :param request: The request of the user containing all necessary information for an logout.
        :return: 400_BAD_REQUEST if the provided data is sparse or one of the values is empty or wrong.
                 200_OK if the user is authenticated (will destroy the users token).
        """
        data: dict = request.data

        valid: Response = self.validate(data)
        if valid.status_code != 200:
            return valid

        username: str = data["username"]
        password: str = data["password"]

        user: User = authenticate(username=username, password=password)

        if not user:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"error": "Username or password invalid!"})

        try:
            token = Token.objects.get(user=user)
            if token:
                # if there is a token delete it and logout the users
                # by deleting the token it is mode sure that the client cant use an expired token
                token.delete()
        except Exception:
            logout(request)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"error": "User is not logged in!"})
        logout(request)
        return Response(status=status.HTTP_200_OK)
