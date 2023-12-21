from django.db import models
from datetime import date


class RequestModel(models.Model):
    requestid = models.CharField(max_length=100, unique=True, editable=False)
    userid = models.CharField(max_length=100)
    resumelink = models.CharField(max_length=100, unique=True)
    email = models.EmailField()
    description = models.CharField(max_length=1000)
    requestedat = models.DateField(default=date.today)
    responded = models.BooleanField(default=False, null=True)

    def __str__(self) -> str:
        return f"Request ID: {self.requestid}"


class ResponseModel(models.Model):
    responseid = models.CharField(max_length=50, unique=True, editable=False)
    requestid = models.CharField(max_length=50, unique=True, editable=False)
    fromuserid = models.CharField(max_length=50, editable=False)
    responsemessage = models.CharField(max_length=5000)

    def __str__(self) -> str:
        return f"Response ID: {self.responseid}"
