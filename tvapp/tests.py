from django.test import TestCase
from .models import *
from datetime import date

class ProductoTestCase(TestCase):
    def setUp(self):
        # Creamos una categoría de ejemplo
        self.categoria = Categoria.objects.create(
            nombre="Electrónicos"
        )
        # Creamos un Producto de ejemplo con los datos necesarios
        self.producto = Producto.objects.create(
            sku=1,
            precio=1000,
            stock=10,
            nombre="Teléfono",
            descripcion="Un teléfono inteligente",
            imagen="example.jpg",
            categoria_id=self.categoria,
            fechaAgregar=date.today()
        )

    #def test_str_method(self):
        # Verificamos el método __str__() de la clase Categoria
     #   self.assertEqual(str(self.categoria), "Codigo: 1 - Electrónicos")
        # Verificamos el método __str__() de la clase Producto
      #  expected_string = "Categoria: Electrónicos | Sku: 1 | Stock: 10 | Precio: 1000 | Nombre: Teléfono | Fecha: {fecha_actual}".format(
       #     fecha_actual=self.producto.fechaAgregar
        #)
        #self.assertTrue("Electrónicos" in str(self.producto), f"El nombre de la categoría no coincide. Se esperaba '{expected_string}', pero se obtuvo '{str(self.producto)}'")

    def test_producto_creation(self):
        # Verificamos que el producto se ha creado correctamente
        self.assertEqual(self.producto.nombre, "Teléfono")
        self.assertEqual(self.producto.precio, 1000)
        self.assertEqual(self.producto.stock, 10)

    #def test_producto_stock_update(self):
        # Actualizamos el stock del producto
     #   self.producto.stock = 15
      #  self.producto.save()
        # Verificamos que el stock se ha actualizado correctamente
       # self.assertEqual(self.producto.stock, 15)
