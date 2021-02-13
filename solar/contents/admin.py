from django.contrib import admin

from contents.models import Statement, HashtagTagging, Hashtag, AccountTagging, Reaction


class StatementHashtagInline(admin.StackedInline):
    """
    This is the stackable representation of the tagging of an statement with an hashtag.
    """
    model = HashtagTagging
    fk_name = 'statement'
    extra = 0


class StatementAccountInline(admin.StackedInline):
    """
    This is the stackable representation of the mentioning of an account within an statement.
    """
    model = AccountTagging
    fk_name = 'statement'
    extra = 0


class StatementReactionInline(admin.StackedInline):
    """
    This is the stackable representation of the reaction relation between statements.
    """
    model = Reaction
    fk_name = 'parent'
    extra = 0


class StatementAdmin(admin.ModelAdmin):
    """
    This ist the admin for the statements.
    It will add the tagging of statements with hashtags to the admin interface.
    """
    inlines = [StatementHashtagInline, StatementAccountInline, StatementReactionInline]


admin.site.register(Hashtag)
admin.site.register(HashtagTagging)
admin.site.register(AccountTagging)
admin.site.register(Reaction)
admin.site.register(Statement, StatementAdmin)
