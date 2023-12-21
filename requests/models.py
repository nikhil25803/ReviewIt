from django.db import models
from django.utils import timezone


class RequestModel(models.Model):
    requestid = models.CharField(max_length=100, unique=True, editable=False)
    userid = models.CharField(max_length=100)
    resumelink = models.CharField(max_length=100, unique=True)
    email = models.EmailField()
    description = models.CharField(max_length=1000)
    requestedat = models.DateField(default=timezone.now)

    def __str__(self) -> str:
        return f"Request ID: {self.requestid}"
