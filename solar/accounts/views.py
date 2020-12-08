# Create your views here.
import logging

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import Account
from accounts.serializers import AccountSerializer

logger = logging.getLogger(__name__)


class Accounts(APIView):
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
        serializer: AccountSerializer = AccountSerializer(instance=account, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
