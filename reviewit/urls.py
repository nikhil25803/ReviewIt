from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("api/user/", include("users.urls")),
    path("api/requests/", include("requests.urls")),
]
