# Generated by Django 5.0 on 2023-12-23 08:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('requests', '0003_requestmodel_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='requestmodel',
            name='description',
            field=models.CharField(max_length=2500, null=True),
        ),
    ]