# Create your views here.
import logging

from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import Account
from accounts.serializers import AccountPublicSerializer, AccountOwnSerializer

logger = logging.getLogger(__name__)


class PublicAccounts(APIView):
    """
    This view is used to represent the accounts.
    It can be used to get public information about accounts.
    """

    def get(self, request: Request, *args, **kwargs):
        """
        This method is used to get all public information regarding a specific account.
        :param request: Not used.
        :param args: Not used.
        :param kwargs: Should have the id of the requested account (see view.py)
        :return:
        """
        account: Account = Account.objects.filter(user=int(kwargs.get("id")))
        serializer: AccountPublicSerializer = AccountPublicSerializer(instance=account, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class OwnAccount(APIView):
    """
    This view is used to represent the private account of an user.
    To access the information one have to use its token.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request):
        """
        This method is used to get the own account data.
        :param request: To access the user from its token.
        :return: Data regarding the own account.
        """
        account: Account = Account.objects.filter(user=request.user)
        serializer: AccountOwnSerializer = AccountOwnSerializer(instance=account, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
