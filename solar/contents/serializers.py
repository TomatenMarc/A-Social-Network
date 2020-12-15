from rest_framework import serializers

from .models import Statement


class StatementSerializer(serializers.ModelSerializer):
    """
    This serializer serializes the statements and their content.
    It can be used to serialize content of a statement.
    """

    class Meta:
        model = Statement
        fields = ('content',)
