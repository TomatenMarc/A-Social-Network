from django.contrib import admin

from .models import Account, Relationship


class RelationshipInline(admin.StackedInline):
    """
    This is the stackable inline representation of the relationships.
    It will use the from_account as an foreign key.
    It will not display any more then relationships then necessary (extra = 0)
    """
    model = Relationship
    fk_name = 'from_account'
    extra = 0


class AccountAdmin(admin.ModelAdmin):
    """
    This is the admin for the accounts.
    This will add the relationships of an account to admin interface.
    """
    inlines = [RelationshipInline]


admin.site.register(Account, AccountAdmin)
admin.site.register(Relationship)
