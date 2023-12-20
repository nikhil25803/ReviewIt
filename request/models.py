from django.db import models
from users.models import UserModel
from resume.models import ResumeModel

# Create your models here.
"""Request Model"""


class RequestModel(models.Model):
    requestid = models.CharField(max_length=50, editable=False, unique=True)
    resumeid = models.ForeignKey(
        ResumeModel, on_delete=models.CASCADE, related_name="request_for_resume"
    )
    requestfrom = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, related_name="request_from"
    )
    requestto = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, related_name="request_to"
    )
    requestmessage = models.CharField(max_length=5000, null=True)

    def __str__(self) -> str:
        return f"Request ID: {self.requestid}"
