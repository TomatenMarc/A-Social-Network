import logging
# Create your views here.
from typing import Optional, List

from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from contents.models import Statement, Hashtag
from contents.serializers import StatementObservationSerializer, StatementSerializer

logger = logging.getLogger(__name__)


class ShowStatement(APIView):
    """
    This view can be used to get an specific statement and all correlated data by the statements id.
    To get information about an statement one must provide an valid token for identification.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def get(request: Request, *args, **kwargs):
        """
        This method returns all information about an specific statement.
        :param request: Not used.
        :param args: Not used.
        :param kwargs: Additional information to get the id of the requested statement.
        :return:
        """
        statement: Statement = Statement.objects.filter(id=int(kwargs.get("id")))
        serializer: StatementObservationSerializer = StatementObservationSerializer(instance=statement, many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)


class ShowStatementsWithHashtag(APIView):
    """
    This view is representative for the hashtag view.
    It can be used to get all statements with containing an specific hashtag.
    To get the information one must have an valid token.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def get(request: Request):
        """
        This method returns all statements containing the given hashtag string.
        If there is no data or if there is no hashtag one get 200.
        If there is data one get data and 200.
        If the request is wrong one get 400.

        :param request: Request with the parameter q, which is the string representation of the hashtag.
        :return: 200 if there are statements with the hashtag or if there is no data, 400 if the request is invalid.
        """
        query: str = request.query_params.get('q', None)
        if not query:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        hashtag: Optional[Hashtag] = Hashtag.objects.filter(tag=query).first()
        if not hashtag:
            return Response(status=status.HTTP_200_OK)
        statement: List[Statement] = Statement.objects.filter(tagged=hashtag)
        serializer: StatementSerializer = StatementSerializer(instance=statement, many=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)
