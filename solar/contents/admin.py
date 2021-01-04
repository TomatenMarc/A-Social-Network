from django.contrib import admin

from contents.models import Statement, StatementTagging, Hashtag


class StatementHashtagInline(admin.StackedInline):
    """
    This is the stackable representation of the tagging of an statement with an hashtag.
    """
    model = StatementTagging
    fk_name = 'statement'
    extra = 0


class StatementAdmin(admin.ModelAdmin):
    """
    This ist the admin for the statements.
    It will add the tagging of statements with hashtags to the admin interface.
    """
    inlines = [StatementHashtagInline]


admin.site.register(Hashtag)
admin.site.register(StatementTagging)
admin.site.register(Statement, StatementAdmin)
