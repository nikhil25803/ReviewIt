from django.urls import path
from . import views

urlpatterns = [
    path("", views.requests_index, name="request-index"),
    path("new", views.RequestPostView.as_view(), name="new-request"),
]
