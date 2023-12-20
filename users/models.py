from django.db import models


"""User Model"""


class UserModel(models.Model):
    uid = models.CharField(max_length=50, unique=True, editable=False)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=50, unique=True, editable=False)
    name = models.CharField(max_length=50)
    avatar = models.CharField(max_length=250, null=True)
    bio = models.CharField(max_length=250, null=True)
    about = models.CharField(max_length=1000, null=True)
    linkedin = models.CharField(max_length=50, null=True)
    github = models.CharField(max_length=50, null=True)

    def __str__(self) -> str:
        return f"{self.name}: {self.username}"
