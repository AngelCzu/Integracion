from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.Categoria)
admin.site.register(models.Producto)
admin.site.register(models.TipoUser)
admin.site.register(models.Usuarios)
admin.site.register(models.Compra)
