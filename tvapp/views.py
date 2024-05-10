from django.shortcuts import get_object_or_404, redirect, render
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
import random
from django.db.models import Sum
from django.http import JsonResponse
from transbank.webpay.webpay_plus.transaction import Transaction

from django.contrib import messages


import requests
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
    cantidad_por_sku = Compra.objects.filter(usuario=request.user).values('producto__sku').annotate(cantidad=Sum('cantidad'))

    # Crear un diccionario con el SKU como clave y la cantidad como valor
    cantidad_sku_dict = {item['producto__sku']: item['cantidad'] for item in cantidad_por_sku}

    # Obtener todos los productos asociados a los SKUs obtenidos
    productos_usuario = Producto.objects.filter(sku__in=skus_productos)
    
    # Agregar la cantidad de productos a cada producto
    for producto in productos_usuario:
        producto.cantidad = cantidad_sku_dict.get(producto.sku, 0)

    # Sumar la cantidad total de productos
    compras_totales = sum(cantidad_sku_dict.values())

    # Calcular el precio total de los productos
    total_precio = sum(producto.precio * producto.cantidad for producto in productos_usuario)

    # Obtener las categorías de los productos comprados por el usuario
    categorias_carrito = [producto.categoria_id.id_categoria for producto in productos_usuario]

    # Obtener productos de las mismas categorías que el usuario ha comprado, excluyendo los productos que ya ha comprado
    productos_categoria_carrito = Producto.objects.filter(categoria_id__in=categorias_carrito).exclude(sku__in=skus_productos)

    # Obtener hasta 4 productos aleatorios de las categorías del carrito del usuario
    productos_aleatorios = random.sample(list(productos_categoria_carrito), min(4, len(productos_categoria_carrito)))

    return render(request, 'compras.html', {'productos_usuario': productos_usuario,
                                            'total': compras_totales,
                                            'total_precio': total_precio,
                                            'productos_aleatorios': productos_aleatorios})


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

@login_required    
def restar_producto(request, sku):
    if request.method == 'POST':
        producto = get_object_or_404(Producto, sku=sku)
        usuario = request.user
        compra_existente = Compra.objects.filter(usuario=usuario, producto=producto).first()
        if compra_existente:
            # Si el producto está en la lista de compras y la cantidad es mayor que 1, restar uno
            if compra_existente.cantidad > 1:
                compra_existente.cantidad -= 1
                compra_existente.save()
            else:
                # Si la cantidad es 1, eliminar la entrada de compra
                compra_existente.delete()
        else:
            # Si el producto no está en la lista de compras, mostrar un mensaje de error
            messages.error(request, 'El producto no está en la lista de compras.')
        
        # Redirigir de vuelta a la página de compras después de realizar la operación
        return redirect('/compras')

    else:
        messages.error(request, 'Error al procesar la compra.')
        return redirect('/compras')

@login_required
def comprar_producto_compras(request, sku):
    if request.method == 'POST':
        producto = get_object_or_404(Producto, sku=sku)
        usuario = request.user
        compra = Compra.objects.create(usuario=usuario, producto=producto)
        # Aquí puedes realizar cualquier otra lógica relacionada con la compra, como actualizar el stock del producto, enviar confirmaciones por correo electrónico, etc.
        
        return redirect('/compras')
    else:
        messages.error(request, 'Error al procesar la compra.')
        return redirect('/compras')

@csrf_exempt
def create(request):
    # Datos de la transacción
    buy_order = 'ordenCompra12345678'
    session_id = 'sesion1234557545'
    amount = request.POST.get('total_precio')
    return_url = 'http://www.tu-sitio.com/webpay/retorno'

    # Credenciales de Webpay Plus
    tbk_api_key_id = '597055555532'
    tbk_api_key_secret = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C'

    # URL del endpoint de Webpay Plus
    url = 'https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.0/transactions'

    # Crear objeto con los datos de la transacción
    data = {
        'buy_order': buy_order,
        'session_id': session_id,
        'amount': amount,
        'return_url': return_url
    }

    # Realizar solicitud POST a la API de Webpay Plus
    response = requests.post(url, headers={
        'Tbk-Api-Key-Id': tbk_api_key_id,
        'Tbk-Api-Key-Secret': tbk_api_key_secret,
        'Content-Type': 'application/json'
    }, json=data)

    # Verificar si la solicitud fue exitosa
    if response.status_code == 200:
        # Devolver la URL de pago
        return JsonResponse({
            'url': response.json()['url']
        })
    else:
        # Manejar el error
        return JsonResponse({'error': 'No se pudo crear la transacción'}, status=400)
