from django.urls import path

from accounts.views import PublicAccounts, OwnAccount, OwnAccountFollow, OwnAccountUnfollow, AllPublicAccounts, \
    OwnAccountUpdate

urlpatterns = [
    path('show/<int:id>/', PublicAccounts.as_view(), name='show'),
    path('show/all/', AllPublicAccounts.as_view(), name='showAll'),
    path('show/own/', OwnAccount.as_view(), name='own'),
    path('update/', OwnAccountUpdate.as_view(), name='update'),
    path('follow/<int:id>/', OwnAccountFollow.as_view(), name='follow'),
    path('unfollow/<int:id>/', OwnAccountUnfollow.as_view(), name='unfollow'),
]
