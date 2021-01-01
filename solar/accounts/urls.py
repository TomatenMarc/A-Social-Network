from django.conf.urls import url

from accounts.views import PublicAccounts, OwnAccount

urlpatterns = [
    url(r'show/(?P<id>\d+)/$', PublicAccounts.as_view(), name='show'),
    url(r'own/$', OwnAccount.as_view(), name='own')
]
