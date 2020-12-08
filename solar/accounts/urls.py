from django.conf.urls import url

from accounts.views import Accounts

urlpatterns = [
    url(r'show/(?P<id>\d+)/$', Accounts.as_view(), name='show')
]
