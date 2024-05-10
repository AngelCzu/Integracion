from django.db import models
from django.contrib.auth.models import User
from django import forms
from django.contrib import messages


# Create your models here.

class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)

    def __str__(self):
        txt = "Codigo: {0} - {1}"
        return txt.format(self.id_categoria,self.nombre)

class Producto(models.Model):
    sku = models.IntegerField(primary_key=True)
    precio = models.IntegerField()
    stock = models.IntegerField()
    nombre = models.CharField(max_length=80)
    descripcion = models.CharField(max_length=200)
    imagen = models.ImageField(upload_to="imagenesProducto")
    categoria_id = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    fechaAgregar = models.DateField(auto_now_add=True)

    def __str__(self):
        txt = "Categoria: {0} | Sku: {1} | Stock: {2} | Precio: {3} | Nombre: {4} | Fecha: {5}"
        return txt.format(self.categoria_id,self.sku,self.stock,self.precio,self.nombre,self.fechaAgregar)



#TABLAS DE LOS USUARIOS, NOMBRES ROLES, ETC.
class TipoUser(models.Model):
    id_tipoUser = models.AutoField(primary_key=True)
    rolUser = models.CharField(max_length=40)

    def __str__(self):
        txt = "Codigo: {0} - Rol: {1}"
        return txt.format(self.id_tipoUser,self.rolUser)

class Usuarios(models.Model):
    nombreUsuario = models.CharField(primary_key=True, max_length=20)
    correo = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    id_tipoUser = models.ForeignKey(TipoUser, on_delete=models.CASCADE)
    fechaCreacion = models.DateField(auto_now_add=True)

    def __str__(self):
        txt = "User: {0} | Usuario: {1} | Correo: {2} | Contraseña: {3} | Fecha: {4}"
        return txt.format(self.id_tipoUser,self.nombreUsuario,self.correo,self.password,self.fechaCreacion)

class Compra(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    fecha_compra = models.DateTimeField(auto_now_add=True)
    cantidad = models.IntegerField(default=1)  # Nuevo campo agregado

    def __str__(self):
        return f'Compra de {self.producto.nombre} por {self.usuario.username} el {self.fecha_compra}'

