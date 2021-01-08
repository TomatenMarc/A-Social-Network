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
    It can be used to get public information about accounts from the perspective of the calling account.
    To get this information the calling account must use its token.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request, *args, **kwargs):
        """
        This method is used to get all public information regarding a specific account.
        :param request: Not used.
        :param args: Not used.
        :param kwargs: Should have the id of the requested account (see view.py)
        :return:
        """
        calling_account: Account = Account.objects.filter(user=request.user).first()
        account: Account = Account.objects.filter(user=int(kwargs.get("id")))
        serializer: AccountPublicSerializer = AccountPublicSerializer(instance=account,
                                                                      many=True,
                                                                      context={"calling_account": calling_account})
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


class OwnAccountFollow(APIView):
    """
    This view is for adding a follow relation from the calling account to the targeted one.
    To access this view the requesting account has to use its token.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)

    def post(self, request: Request, *args, **kwargs):
        own_account: Account = Account.objects.filter(user=request.user).first()
        foreign_account: Account = Account.objects.filter(user=kwargs.get("id")).first()
        if not foreign_account:
            return Response(status=status.HTTP_409_CONFLICT)
        created: bool = own_account.add_relationship(foreign_account)
        if created:
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_409_CONFLICT)


class OwnAccountUnfollow(APIView):
    """
    This view is for deleting a follow relation from the calling account to the targeted one.
    To access this view the requesting account has to use its token.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)

    def post(self, request: Request, *args, **kwargs):
        own_account: Account = Account.objects.filter(user=request.user).first()
        foreign_account: Account = Account.objects.filter(user=kwargs.get("id")).first()
        if not foreign_account:
            return Response(status=status.HTTP_409_CONFLICT)
        deleted: bool = own_account.remove_relationship(foreign_account)
        if deleted:
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_409_CONFLICT)
