# Generated by Django 5.0.1 on 2024-01-28 15:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='conversation',
            name='is_activate',
            field=models.BooleanField(default=True, verbose_name='Is Activate'),
        ),
    ]
