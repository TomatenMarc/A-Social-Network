from django.conf.urls import url
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    url(r'obtain/', obtain_auth_token, name='obtain'),
]
