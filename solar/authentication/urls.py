from django.conf.urls import url
from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    url(r'obtain/', obtain_auth_token, name='obtain'),
    url(r'register/', views.Register.as_view(), name='register'),
]
