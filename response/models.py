from django.db import models
from users.models import UserModel
from resume.models import ResumeModel

# Create your models here.
"""Response Model"""


class ResponseModel(models.Model):
    responseid = models.CharField(max_length=50, unique=True, editable=False)
    resumeid = models.ForeignKey(
        ResumeModel, on_delete=models.CASCADE, related_name="response_for_resume"
    )
    responsefrom = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, related_name="response_from"
    )
    responseto = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, related_name="response_to"
    )
    responsemessage = models.CharField(max_length=5000)

    def __str__(self) -> str:
        return f"Response ID: {self.responseid}"
