from django.db import models


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
                                    through='StatementTagging',
                                    symmetrical=False,
                                    related_name='tags',
                                    default=None)

    def __str__(self):
        return "{author} says: {content}".format(author=self.author.user.username, content=self.content)


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
    # What is the corresponding hashtag?
    hashtag = models.ForeignKey(Hashtag, related_name='hashtag', on_delete=models.CASCADE)
    # When was this tagging created?
    created = models.DateTimeField(auto_now_add=True, db_index=True)
    # The default manager
    objects = models.Manager()

    class Meta:
        abstract = True


class StatementTagging(Tagging):
    """
    This model is to represent the tagging of an statement with an hashtag.
    """
    # Which statements should be tagged?
    statement = models.ForeignKey(Statement, related_name='statement', on_delete=models.CASCADE)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return "{statement} tagged with {hashtag}".format(statement=self.statement, hashtag=self.hashtag)
