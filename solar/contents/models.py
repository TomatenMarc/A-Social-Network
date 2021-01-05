import logging
import re
from typing import List, Tuple

from django.db import models

logger = logging.getLogger(__name__)


class Statement(models.Model):
    """
    This model represents an statement of an specific account.
    """
    author = models.ForeignKey('accounts.Account', on_delete=models.CASCADE)
    content = models.CharField(max_length=120, blank=False)
    created = models.DateTimeField(auto_now_add=True, db_index=True)
    # Add an hashtag between statements and hashtags  over the tagging model
    tagged = models.ManyToManyField('Hashtag',
                                    blank=True,
                                    through='HashtagTagging',
                                    symmetrical=False,
                                    related_name='tags',
                                    default=None)

    def __str__(self):
        return "{author} says: {content}".format(author=self.author.user.username, content=self.content)

    def save(self, *args, **kwargs) -> None:
        """
        This method adds hashtags relations after the statement is saved.
        Save is ran after update or create.

        :param args: Not used.
        :param kwargs: Not used.
        :return: None
        """
        super(Statement, self).save(*args, **kwargs)
        # resolve hashtags after saving the statement
        used_hashtags: List[str] = self.__extract_hashtags()
        for used_hashtag in used_hashtags:
            result: Tuple[Hashtag, bool] = Hashtag.objects.get_or_create(tag=used_hashtag)
            hashtag: Hashtag = result[0]
            self.add_hashtag(hashtag=hashtag)

    def __extract_hashtags(self) -> List[str]:
        """
        This method extracts the hashtag of the content.

        :return: List of all hashtags used in the content of the statement.
        """
        return re.findall(r"#(\w+)", self.content)

    def add_hashtag(self, hashtag: 'Hashtag'):
        """
        This method is for adding an hashtag to the corresponding statement.
        :param hashtag: The hashtag to be added.
        :return: True if the hashtag was created, false otherwise.
        """
        tagging, created = HashtagTagging.objects.get_or_create(statement=self, hashtag=hashtag)
        return created

    def get_hashtags(self) -> List['Hashtag']:
        """
        This method is to get all hashtags of the calling statement.

        :return: List of all hashtags of the calling statement.
        """
        return list(self.tagged.all())

    def remove_hashtag(self, hashtag: 'Hashtag'):
        """
        This method is used to delete an specific hashtag for the calling statement.

        :param hashtag: The hashtag to be deleted.
        :return: True if the hashtag was deleted, false else.
        """
        deleted: bool = HashtagTagging.objects.filter(
            statement=self,
            hashtag=hashtag
        ).delete()
        return deleted


class Hashtag(models.Model):
    """
    This model represents an hashtag which can be added to specific contents.
    """
    tag = models.CharField(max_length=30, blank=False)
    created = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return "#{tag}".format(tag=self.tag)


class Tagging(models.Model):
    """
    This model represents the relation between any type of content and an hashtag
    """
    # What is the corresponding statement?
    statement = models.ForeignKey(Statement, related_name='statement', on_delete=models.CASCADE)
    # When was this tagging created?
    created = models.DateTimeField(auto_now_add=True, db_index=True)
    # The default manager
    objects = models.Manager()

    class Meta:
        abstract = True


class HashtagTagging(Tagging):
    """
    This model is to represent the tagging of an statement with an hashtag.
    """
    # Which hashtag should be tagged?
    hashtag = models.ForeignKey(Hashtag, related_name='hashtag', on_delete=models.CASCADE)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return "{statement} tagged with {hashtag}".format(statement=self.statement, hashtag=self.hashtag)
