# Generated by Django 5.0 on 2023-12-23 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('requests', '0005_remove_requestmodel_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='requestmodel',
            name='resumelink',
            field=models.CharField(max_length=100),
        ),
    ]
