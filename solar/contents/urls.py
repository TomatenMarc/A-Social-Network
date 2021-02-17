from django.urls import path

from contents.views import ShowStatement

urlpatterns = [
    path('statements/get/<int:id>/', ShowStatement.as_view(), name="show_statement")
]
