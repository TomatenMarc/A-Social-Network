from django.db import models


class Statement(models.Model):
    """
    This model represents an statement of an specific account.
    """
    author = models.ForeignKey('accounts.Account', on_delete=models.CASCADE)
    content = models.CharField(max_length=120, blank=False)
    created = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return "{author} says: {content}".format(author=self.author.user.username, content=self.content)
