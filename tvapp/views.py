from datetime import timezone
import os
import time
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings 

from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt



def inicio(request):
    return render(request, 'inicio.html')

def login_registro(request):
    context = {}  # Define el contexto vacío al principio.

    if request.method == 'POST':
        if 'txtUsuIng' in request.POST and 'txtPasswordIng' in request.POST:
            usuario = request.POST.get('txtUsuIng')
            clave = request.POST.get('txtPasswordIng')
            user = authenticate(request, username=usuario, password=clave)
            if user is not None:
                login(request, user)
                # Usuario autenticado con éxito, puedes redirigirlo al inicio u otra página.
                return redirect('/inicio')
            else:
                # Usuario no válido, muestra un mensaje de error en el contexto.
                context['error'] = 'Credenciales inválidas. Intente nuevamente.'

        elif 'txtNomUsuReg' in request.POST and 'txtCorreoReg' in request.POST and 'txtPasswordReg' in request.POST:
            nombre_usuario = request.POST.get('txtNomUsuReg')
            correo = request.POST.get('txtCorreoReg')
            contraseña = request.POST.get('txtPasswordReg')

            # Crea un nuevo usuario
            user = User.objects.create_user(username=nombre_usuario, email=correo, password=contraseña)
            login(request, user)
            
            # Usuario registrado con éxito, puedes redirigirlo al inicio u otra página.
            return redirect('/inicio')
    #Renderiza la plantilla con el contexto, ya sea que el usuario se autentique o no.
    return render(request, 'login.html', context)

    

def cargarTienda(request):
    return render(request,"tienda.html")

def cargarstore(request):
    prod_maceteros = Producto.objects.filter(categoria_id=1)

    # Obtener productos de la categoría Tierra de Hojas
    prod_tierra = Producto.objects.filter(categoria_id=2)

    # Obtener productos de la categoría Flores
    prod_flores = Producto.objects.filter(categoria_id=3)

    # Obtener productos de la categoría Arbustos
    prod_arbustos = Producto.objects.filter(categoria_id=4)

    # Renderizar la plantilla HTML y pasar los productos filtrados como contexto
    return render(request, 'productos.html', {
        'prod_maceteros': prod_maceteros,
        'prod_tierra': prod_tierra,
        'prod_flores': prod_flores,
        'prod_arbustos': prod_arbustos,
    })



def cargarInicio(request):
    productos = Producto.objects.all()
    producto_perros = Producto.objects.filter(categoria_id=1)
    producto_gatos = Producto.objects.filter(categoria_id=2)
    return render(request,"inicio.html",{"prod" : productos, "prod_dogs":producto_perros, "prod_cats":producto_gatos})


def cargarNosotros(request):
    return render(request,"nosotros.html")

#AQUI CARGAN LOS PRODUCTOS Y CATEGORIAS PARA QUE SALGAN EN LOS FORMS


def cargarAdmin(request):
    categorias = Categoria.objects.all()
    productos = Producto.objects.all()  
    return render(request,"admins.html", {"cate":categorias, "prod":productos})

#AGREGAR PRODUCTOS
def agregarProducto(request):
    v_sku = request.POST['txtSku']
    v_precio = request.POST['txtPrecio']
    v_nombre = request.POST['txtNombre']
    v_imagen = request.FILES['txtImagen']
    v_descripcion = request.POST['txtDescripcion']
    v_stock = request.POST['txtStock']
    v_categoria = Categoria.objects.get(id_categoria = request.POST['cmbCategoria'])

    Producto.objects.create(
        sku = v_sku,
        precio = v_precio,
        nombre = v_nombre,
        imagen = v_imagen,
        descripcion = v_descripcion,
        stock = v_stock,
        categoria_id = v_categoria
    )

    return redirect('/admins')

#CARGA DE PRODUCTOS Y CATEGORIAS EN LA VISTA DE MODIFICAR UN PRODUCTO EN EL LADO DEL ADMIN
#CARGA DE PRODUCTOS, CATEGORIA Y DATOS HACIA MODIFICAR.
def cargarEditarProducto(request, sku):
    producto = Producto.objects.get(sku = sku)
    categorias = Categoria.objects.all()
    return render(request,"editarProd.html",{"cate":categorias, "prod":producto})

#MODIFICAR PRODUCTO
def editarProd(request):
    v_sku = request.POST['txtSku']
    productoBD = Producto.objects.get(sku = v_sku)
    v_precio = request.POST['txtPrecio']
    v_nombre = request.POST['txtNombre']
    v_descripcion = request.POST['txtDescripcion']
    v_stock = request.POST['txtStock']
    v_categoria = Categoria.objects.get(id_categoria = request.POST['cmbCategoria'])

    try:
        v_imagen = request.FILES['txtImagen']   
        ruta_img = os.path.join(settings.MEDIA_ROOT,str(productoBD.imagen))
        os.remove(ruta_img)

    except:
        v_imagen = productoBD.imagen

    productoBD.nombre = v_nombre
    productoBD.precio = v_precio
    productoBD.imagen = v_imagen
    productoBD.descripcion = v_descripcion
    productoBD.stock = v_stock
    productoBD.categoria_id = v_categoria

    productoBD.save()

    return redirect('/admins')

#ELIMINAR PRODUCTOS
def eliminarProducto(request, sku):

    producto = Producto.objects.get(sku = sku)
    ruta_img = os.path.join(settings.MEDIA_ROOT,str(producto.imagen))
    os.remove(ruta_img)
    producto.delete()

    return redirect('/admins')


def logout_view(request):
    if request.method == 'POST':
        # Si se envía una solicitud POST con el nombre 'logout', entonces realiza el logout.
        logout(request)
        return redirect('inicio')   
    
'''@login_required
def menu(request):
    request.session["usuario"]=request.user.username
    usuario = request.session["usuario"]
    context = {'usuario': usuario}
    return render(request, 'inicio.html',context)'''



