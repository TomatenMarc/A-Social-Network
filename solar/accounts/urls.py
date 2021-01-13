from django.urls import path

from accounts.views import PublicAccounts, OwnAccount, OwnAccountFollow, OwnAccountUnfollow, AllPublicAccounts, \
    AllFollowerAccounts, AllFollowingAccounts

urlpatterns = [
    path('show/<int:id>/', PublicAccounts.as_view(), name='show'),
    path('show/all/', AllPublicAccounts.as_view(), name='showALl'),
    path('show/follower/', AllFollowerAccounts.as_view(), name='showFollowers'),
    path('show/following/', AllFollowingAccounts.as_view(), name='showFollowers'),
    path('own/', OwnAccount.as_view(), name='own'),
    path('follow/<int:id>/', OwnAccountFollow.as_view(), name='follow'),
    path('unfollow/<int:id>/', OwnAccountUnfollow.as_view(), name='unfollow'),
]
