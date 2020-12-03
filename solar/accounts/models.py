import logging

from django.contrib.auth.models import User
from django.db import models

logger = logging.getLogger(__name__)


class Account(models.Model):
    """
    This model is for handling user accounts.
    Therefore all data regarding an user is stored in this model.
    The account is separated from the user since the default user model is used.
    """
    # Link the account to an user
    user: User = models.OneToOneField(to=User, on_delete=models.CASCADE, primary_key=True)
    # Add an relationship between accounts over the relationship model
    relates_to = models.ManyToManyField('self',
                                        blank=True,
                                        through='Relationship',
                                        symmetrical=False,
                                        related_name='related_to',
                                        default=None)
    # The default manager
    objects = models.Manager()

    def __str__(self):
        return "{username}".format(username=self.user.username)

    def add_relationship(self, account: 'Account') -> bool:
        """
        This method adds an relationship for an instance.

        :param account: Who should be added to an relation with the instance.
        :return: True if the relationship was created, false otherwise.
        """
        relationship, created = Relationship.objects.get_or_create(
            from_account=self,
            to_account=account)
        return created

    def remove_relationship(self, account: 'Account'):
        """
        This method deletes the relationship to an other Account.

        :param account: The user with whom the relationship is to be terminated.
        :return: True if the relationship was deleted, false otherwise.
        """
        deleted: bool = Relationship.objects.filter(
            from_account=self,
            to_account=account).delete()
        return deleted


class Relationship(models.Model):
    """
    This model handles relations between users.
    By using this model it is possible to create more detailed relationships.
    """
    # Who wants to have an relation?
    from_account = models.ForeignKey(Account, related_name='from_account', on_delete=models.CASCADE)
    # To whom should a relationship be established?
    to_account = models.ForeignKey(Account, related_name='to_account', on_delete=models.CASCADE)
    # When was this relation created?
    created = models.DateTimeField(auto_now_add=True, db_index=True)
    # The default manager
    objects = models.Manager()

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return "{from_user} related to {to_user}".format(from_user=self.from_account, to_user=self.to_account)
