from rest_framework import serializers

from .models import Statement, Hashtag


class HashtagSerializer(serializers.ModelSerializer):
    """
    This serializer can be used to serialize hashtags.
    """

    class Meta:
        model = Hashtag
        fields = ("id", "tag",)


class StatementSerializer(serializers.ModelSerializer):
    """
    This serializer serializes the statements and their content.
    It can be used to serialize content of a statement.
    """

    tagged = serializers.ListField(source='get_hashtags', child=HashtagSerializer())

    class Meta:
        model = Statement
        fields = ('content', 'tagged',)
