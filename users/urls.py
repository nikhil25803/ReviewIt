from django.urls import path
from . import views

urlpatterns = [
    path("", views.user_index, name="user-root"),
    path("auth/", views.UserAuthentication.as_view(), name="user-authentication"),
    path("profile", views.UserProfile.as_view(), name="user-profile"),
    path("feedback", views.submit_feedback, name="feedback"),
]
