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
    

    path('productos', views.cargarstore, name='productos_por_categoria'),
    path('nosotros',views.cargarNosotros),
    path('comprar/<int:sku>/', views.comprar_producto, name='comprar_producto'),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
