# Generated by Django 4.2.3 on 2023-07-14 22:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('popTopic', '0010_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='processed',
            field=models.BooleanField(default=False),
        ),
    ]
