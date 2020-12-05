from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response

from authentication import Operations
from authentication.serializers import UserRegisterSerializer


def validate_request_data_for(operation: Operations, request: Request) -> Response:
    """
    This method validates the a request regarding user its user information.

    :param operation: Which operation was used? This influences which serializer is used and which fields are checked.
    :param request: The request regarding an user.
    :return:    400_BAD_REQUEST if the provided data is sparse or one of the values is empty or there are duplicated values.
                201_CREATE if the new user is created.
                200_OK if the user is valid.
    """
    serializer = UserRegisterSerializer(data=request.data)

    if operation is Operations.REGISTER:
        serializer = UserRegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        if operation is Operations.REGISTER:
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
