from django.urls import path
from django.contrib.auth.views import LogoutView
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', views.inicio), 
    path('login_registro', views.login_registro, name='login_registro'),
    path('inicio', views.inicio, name='inicio'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('tienda',views.cargarTienda),

    path('productos',views.cargarstore),
    
    path('nosotros',views.cargarNosotros),


    #carga de la pagna
    path('admins',views.cargarAdmin),
    #Funcion
    path('agregarProductoForm', views.agregarProducto),

    #carga de la pagna
    path('editarProd/<sku>',views.cargarEditarProducto),
    #funcion
    path('editarProdform',views.editarProd),

    #funcion
    path('eliminarProd/<sku>',views.eliminarProducto),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
