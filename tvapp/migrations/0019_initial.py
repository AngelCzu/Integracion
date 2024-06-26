# Generated by Django 5.0.4 on 2024-04-07 04:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('tvapp', '0018_remove_sala_categoriaid_remove_mensajechat_sala_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id_categoria', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='TipoUser',
            fields=[
                ('id_tipoUser', models.AutoField(primary_key=True, serialize=False)),
                ('rolUser', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('sku', models.IntegerField(primary_key=True, serialize=False)),
                ('precio', models.IntegerField()),
                ('stock', models.IntegerField()),
                ('nombre', models.CharField(max_length=80)),
                ('descripcion', models.CharField(max_length=200)),
                ('imagen', models.ImageField(upload_to='imagenesProducto')),
                ('fechaAgregar', models.DateField(auto_now_add=True)),
                ('categoria_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tvapp.categoria')),
            ],
        ),
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('nombreUsuario', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('correo', models.CharField(max_length=200)),
                ('password', models.CharField(max_length=200)),
                ('fechaCreacion', models.DateField(auto_now_add=True)),
                ('id_tipoUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tvapp.tipouser')),
            ],
        ),
    ]
