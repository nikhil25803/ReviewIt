from django.db import models
from datetime import date

"""Request Model"""


class RequestModel(models.Model):
    requestid = models.CharField(max_length=100, unique=True, editable=False)
    userid = models.CharField(max_length=100)
    resumelink = models.CharField(max_length=100, unique=True)
    email = models.EmailField()
    name = models.CharField(max_length=50, null=True)
    avatar = models.CharField(
        max_length=250,
        default="https://lh3.googleusercontent.com/a/ACg8ocJ-WWqNiQv0BppwWISN_SyIT6Xk3pPNVefijlfE7Hbc=s96-c",
    )
    description = models.CharField(max_length=2500)
    requestedat = models.DateField(default=date.today)
    responded = models.BooleanField(default=False, null=True)

    def __str__(self) -> str:
        return f"Request ID: {self.requestid}"


"""Response Model"""


class ResponseModel(models.Model):
    responseid = models.CharField(max_length=50, unique=True, editable=False)
    requestid = models.CharField(max_length=50, unique=True, editable=False)
    fromuserid = models.CharField(max_length=50, editable=False)
    responsemessage = models.CharField(max_length=5000)

    def __str__(self) -> str:
        return f"Response ID: {self.responseid}"
