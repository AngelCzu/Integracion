# Generated by Django 5.0.4 on 2024-05-10 03:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tvapp', '0020_compra'),
    ]

    operations = [
        migrations.AddField(
            model_name='compra',
            name='cantidad',
            field=models.IntegerField(default=1),
        ),
    ]