from django.db import models
from users.models import UserModel


"""Class Resume Model"""


class ResumeModel(models.Model):
    resumeid = models.CharField(max_length=50, unique=True, editable=False)
    resumename = models.CharField(max_length=100, null=True)
    resumelink = models.CharField(max_length=250, unique=True, editable=False)
    userid = models.ForeignKey(UserModel, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"UserId: {self.userid} | ResumeId {self.resumeid}"
