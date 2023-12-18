from django.db import models


# Create your models here.
class UserModel(models.Model):
    uid = models.CharField(max_length=25, unique=True, editable=False)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=50, unique=True)
    name = models.CharField(max_length=50)
    bio = models.CharField(max_length=50, null=True)
    about = models.CharField(max_length=500, null=True)
    linkedin = models.CharField(max_length=50, null=True)
    github = models.CharField(max_length=50, null=True)
    resume_1 = models.CharField(max_length=50, null=True)
    resume_2 = models.CharField(max_length=50, null=True)
    resume_3 = models.CharField(max_length=50, null=True)

    def __str__(self) -> str:
        return f"{self.name}: {self.username}"
