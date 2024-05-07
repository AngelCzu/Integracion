from django.shortcuts import get_object_or_404, redirect, render
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Count

from django.contrib import messages





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

    

def cargarstore(request):
    if request.user.is_authenticated:
        usuario_actual = request.user
    else:
        usuario_actual = None
    prod_maceteros = Producto.objects.filter(categoria_id=1)

    # Obtener productos de la categoría Tierra de Hojas
    prod_tierra = Producto.objects.filter(categoria_id=2)

    # Obtener productos de la categoría Flores
    prod_flores = Producto.objects.filter(categoria_id=3)

    # Obtener productos de la categoría Arbustos
    prod_arbustos = Producto.objects.filter(categoria_id=4)
    cantidad_compras = Compra.objects.filter(usuario=usuario_actual).count()

    # Renderizar la plantilla HTML y pasar los productos filtrados como contexto
    return render(request, 'productos.html', {
        'prod_maceteros': prod_maceteros,
        'prod_tierra': prod_tierra,
        'prod_flores': prod_flores,
        'prod_arbustos': prod_arbustos,
        'cantidad_compras': cantidad_compras, 
    })


@login_required
def comprar_producto(request, sku):
    if request.method == 'POST':
        producto = get_object_or_404(Producto, sku=sku)
        usuario = request.user
        compra = Compra.objects.create(usuario=usuario, producto=producto)
        # Aquí puedes realizar cualquier otra lógica relacionada con la compra, como actualizar el stock del producto, enviar confirmaciones por correo electrónico, etc.
        
        return redirect('/productos')
    else:
        messages.error(request, 'Error al procesar la compra.')
        return redirect('/productos')


def cargarInicio(request):
    return render(request,"inicio.html")


def cargarNosotros(request):
    return render(request,"nosotros.html")




def logout_view(request):
    if request.method == 'POST':
        # Si se envía una solicitud POST con el nombre 'logout', entonces realiza el logout.
        logout(request)
        return redirect('inicio')   


@login_required
def compras(request):
    # Obtener todas las compras del usuario actual
    compras_usuario = Compra.objects.filter(usuario=request.user)

    # Obtener los SKU de todos los productos comprados por el usuario
    skus_productos = [compra.producto.sku for compra in compras_usuario]

    # Obtener la cantidad de productos por SKU
    cantidad_por_sku = Compra.objects.filter(usuario=request.user).values('producto__sku').annotate(cantidad=Count('producto__sku'))

    # Crear un diccionario con el SKU como clave y la cantidad como valor
    cantidad_sku_dict = {item['producto__sku']: item['cantidad'] for item in cantidad_por_sku}

    # Obtener todos los productos asociados a los SKUs obtenidos
    productos_usuario = Producto.objects.filter(sku__in=skus_productos)

    # Agregar la cantidad de productos a cada producto
    for producto in productos_usuario:
        producto.cantidad = cantidad_sku_dict.get(producto.sku, 0)

    return render(request, 'compras.html', {'productos_usuario': productos_usuario})

@login_required
def sumar_producto(request, sku):
    if request.method == 'POST':
        producto = get_object_or_404(Producto, sku=sku)
        usuario = request.user
        compra = Compra.objects.create(usuario=usuario, producto=producto)
        # Aquí puedes realizar cualquier otra lógica relacionada con la compra, como actualizar el stock del producto, enviar confirmaciones por correo electrónico, etc.
        
        return redirect('/compras')
    else:
        messages.error(request, 'Error al procesar la compra.')
        return redirect('/compras')