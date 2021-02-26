from django.urls import path

from contents.views import ShowStatement, ShowStatementsWithHashtag

urlpatterns = [
    path('statements/get/<int:id>/', ShowStatement.as_view(), name="show_statement"),
    path('statements/with/hashtag/', ShowStatementsWithHashtag.as_view(), name="show_statement_with_hashtag")
]
