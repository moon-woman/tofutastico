# Generated by Django 5.0.4 on 2024-06-07 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_alter_post_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='ingredients',
            field=models.TextField(blank=True),
        ),
    ]
