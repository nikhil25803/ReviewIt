# Generated by Django 5.0 on 2023-12-22 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uid', models.CharField(editable=False, max_length=100, unique=True)),
                ('username', models.CharField(max_length=100, unique=True)),
                ('email', models.EmailField(editable=False, max_length=100, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('avatar', models.CharField(max_length=250, null=True)),
                ('bio', models.CharField(max_length=2100, null=True)),
                ('about', models.CharField(max_length=1000, null=True)),
                ('linkedin', models.CharField(max_length=100, null=True)),
                ('github', models.CharField(max_length=100, null=True)),
            ],
        ),
    ]
