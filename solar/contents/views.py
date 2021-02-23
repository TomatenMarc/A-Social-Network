import logging

# Create your views here.
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from contents.models import Statement
from contents.serializers import StatementObservationSerializer

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
