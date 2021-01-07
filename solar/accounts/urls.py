from django.conf.urls import url

from accounts.views import PublicAccounts, OwnAccount, OwnAccountFollow

urlpatterns = [
    url(r'show/(?P<id>\d+)/$', PublicAccounts.as_view(), name='show'),
    url(r'own/$', OwnAccount.as_view(), name='own'),
    url(r'follow/(?P<id>\d+)/$', OwnAccountFollow.as_view(), name='follow'),
]
