

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container")

//Variable que mantiene el estado visible del carrito
var carritoVisible = false;



const arrayTienda = [
    
        {id:1001 , nombre:"MACETERO AMSTERDAM" , precio:27000, cantidad:1, stock:10},
        {id:1002 , nombre:"MACETERO KENIA" , precio:17000, cantidad:1, stock:10},
        {id:1003 , nombre:"MACETERO KYOTO" , precio:14000, cantidad:1, stock:10},
        {id:1004 , nombre:"MACETERO MALMO" , precio:39000, cantidad:1, stock:10}, 
        {id:1005 , nombre:"MACETERO TOKIO" , precio:29000, cantidad:1, stock:10},
        {id:1006 , nombre:"MACETERO TÍBET ORO" , precio:40000, cantidad:1, stock:10},

        {id:2001 , nombre:"SUSTRARO HUERTO" , precio:6200, cantidad:1, stock:10},
        {id:2002 , nombre:"TIERRA ÁCIDA" , precio:6900, cantidad:1, stock:10},
        {id:2003 , nombre:"TIERRA BIOLÓGICA" , precio:5500, cantidad:1, stock:10},
        {id:2004 , nombre:"TIERRA DE HOJAS" , precio:4700, cantidad:1, stock:10},
        {id:2005 , nombre:"TIERRRA PARA MACETEROS" , precio:8900, cantidad:1, stock:10},
        {id:2006 , nombre:"TIERRA DE TRASPLANTE" , precio:6400, cantidad:1, stock:10},

        {id:3001 , nombre:"LILIUM GRANDES" , precio:19000, cantidad:1, stock:10},
        {id:3002 , nombre:"PINK ICE" , precio:70000, cantidad:1, stock:10},
        {id:3003 , nombre:"RAMO TONOS ALEGRES" , precio:35000, cantidad:1, stock:10},
        {id:3004 , nombre:"THE DREAMY" , precio:40000, cantidad:1, stock:10},
        {id:3005 , nombre:"THE TIFFANY" , precio:55000, cantidad:1, stock:10},
        {id:3006 , nombre:"ROSAS ROMÁNTICAS" , precio:40000, cantidad:1, stock:10},

        {id:4001 , nombre:"AVEDEL PARAÍSO" , precio:33000, cantidad:1, stock:10},
        {id:4002 , nombre:"CALATHEA MIDALLON" , precio:28000, cantidad:1, stock:10},
        {id:4003 , nombre:"DRACERA LIMON" , precio:57000, cantidad:1, stock:10},
        {id:4004 , nombre:"MONSTERA DELICIOSA" , precio:29000, cantidad:1, stock:10},
        {id:4005 , nombre:"PACHIRA" , precio:33000, cantidad:1, stock:10},
        {id:4006 , nombre:"PALMA KENTIA" , precio:49000, cantidad:1, stock:10}
      
];
//aca va el metodo para modificar el html cuando resto o sumo



function actualizarCantidadProductos() {
  
  var cantidadProductos = carrito.reduce(function(total, producto) {
    return (total - producto.cantidad >= 0) ? total - producto.cantidad : 0;
  }, 10);
  
  console.log("pruebaaaaaaa",cantidadProductos);
  document.getElementById('cantidadProductos').innerText = cantidadProductos;
}

document.addEventListener('DOMContentLoaded', function() {
  actualizarCantidadProductos();
});





//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();

    
}

function ready(){
    
    if (carrito != []) {
        carrito.forEach((product) => {
            agregarItemAlCarrito(product.nombre, product.precio, product.imagen);
            hacerVisibleCarrito();
        });
    }
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }
    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var btnAgregarCarrito = document.getElementsByClassName('btn-light');
    for(var i=0; i<btnAgregarCarrito.length;i++){
    var button = btnAgregarCarrito[i];
    button.addEventListener('click', agregarAlCarritoClicked);
    }
    

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked(){
    alert("Gracias por la compra");
    //Elimino todos los elmentos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    

    

    
    var button = event.target;
    var btnGroup = button.parentElement;
    var item = btnGroup.parentElement;
    var idAgregar = parseInt(item.getElementsByClassName('codigoProdu')[0].innerText);
    let filtro = arrayTienda.filter(e => e.id == [idAgregar]);
    for (const i of filtro) {
        var stock = i.stock
        var nombreAgregar = i.nombre;
        var precioAgregar = i.precio
        var cantidadAgregar = i.cantidad
        var imagenAgregar = i.imagen
        
    }
    let storage = localStorage.getItem("carrito");
    let obj = JSON.parse(storage)
    

    if (obj === null) {
        arrayTemporal = [];
        localStorage.setItem("carrito", JSON.stringify(arrayTemporal));
        let storageNuevo = localStorage.getItem("carrito");
        let objNuevo = JSON.parse(storageNuevo)
        objNuevo.push({id:idAgregar , nombre:nombreAgregar, precio: precioAgregar, cantidad: cantidadAgregar, imagen:imagenAgregar, stock: stock})

        localStorage.setItem("carrito", JSON.stringify(objNuevo));

        console.log("Storage", objNuevo);
        agregarItemAlCarrito(nombreAgregar, precioAgregar, imagenAgregar);
        hacerVisibleCarrito();
    } else{
      let filtroSotrage = obj.filter(e => e.id == [idAgregar]);
      for (const i of filtroSotrage) {
        var nombreStorge = i.nombre;

      } 
      if (nombreAgregar == nombreStorge) {
        alert("El item ya se encuentra en el carrito");
      }else{
        let storage = localStorage.getItem("carrito");
        let obj = JSON.parse(storage)
        obj.push({id:idAgregar , nombre:nombreAgregar, precio: precioAgregar, cantidad: cantidadAgregar, imagen:imagenAgregar, stock: stock})

        localStorage.setItem("carrito", JSON.stringify(obj));

        console.log("Storage", obj);
        agregarItemAlCarrito(nombreAgregar, precioAgregar, imagenAgregar);
        hacerVisibleCarrito(); 
        console.log('listo');
      }
        
    }
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito(){
    
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    
}


//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
    
    
}
//Aumento en uno la cantidad del elemento seleccionado
/*function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}*/

function actualizarLocalStorageCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  // Aumentar en uno la cantidad del elemento seleccionado
  function sumarCantidad(event) {
    let storage = localStorage.getItem("carrito");
    let obj = JSON.parse(storage)

    for (const i of obj) {
      var stock = i.stock;
      var cantidad = i.cantidad;
      var idAgregar = i.id;
      var precioAgregar = i.precio;
      var imagenAgregar = i.imagen;
    }

    if (stock >= cantidad) {
      var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
    


    // Obtener el nombre del producto
    var nombreProducto = selector.parentElement.getElementsByClassName('carrito-item-titulo')[0].innerText;
    var cantidadProductos = carrito.reduce(function(total, producto) {
        return (total - producto.cantidad >= 0) ? total - producto.cantidad : 0;
    }, 10);
    // Verificar si el producto ya existe en el carrito
    var productoExistente = carrito.find(function (producto) {
      return producto.nombre === nombreProducto;
    });
  
    if (productoExistente) {
      // El producto ya existe en el carrito, actualizar la cantidad
      
        productoExistente.cantidad = cantidadActual;
        productoExistente.stock = cantidadProductos;
      
      
    } else {
      // El producto no existe en el carrito, agregarlo
      var nuevoProducto = {
        id:idAgregar,
          nombre: nombreProducto,
          precio: precioAgregar,
          cantidad: cantidadActual,
          imagen:imagenAgregar,
          stock: stock
      };
      carrito.push(nuevoProducto);
    }

    var productoExistenteIndex = carrito.findIndex(function (producto) {
        return producto.nombre === nombreProducto;
      });
    
      if (productoExistenteIndex !== -1) {
        // El producto ya existe en el carrito, actualizar la cantidad
        carrito[productoExistenteIndex].cantidad = cantidadActual;
      } else {
        // El producto no existe en el carrito, agregarlo
        var nuevoProducto = {
          id:idAgregar,
          nombre: nombreProducto,
          precio: precioAgregar,
          cantidad: cantidadActual,
          imagen:imagenAgregar,
          stock: stock
        };
        carrito.push(nuevoProducto);
      }
    
      // Eliminar entradas anteriores del producto con una cantidad diferente
      carrito = carrito.filter(function (producto) {
        return producto.nombre !== nombreProducto || producto.cantidad === cantidadActual;
      });

      
  
    // Actualizar el carrito en el localStorage
    actualizarLocalStorageCarrito();
    }else{
      alert('stock agotado')
    }
  }
  
  // Restar en uno la cantidad del elemento seleccionado
  function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = parseInt(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    cantidadActual--;
    if (cantidadActual >= 1) {
      selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
      actualizarTotalCarrito();
  
      // Obtener el nombre del producto
      var nombreProducto = selector.parentElement.getElementsByClassName('carrito-item-titulo')[0].innerText;
  
      // Verificar si el producto ya existe en el carrito
      var productoExistente = carrito.find(function (producto) {
        return producto.nombre === nombreProducto;
      });
  
      if (productoExistente) {
        // El producto ya existe en el carrito, actualizar la cantidad
        productoExistente.cantidad = cantidadActual;
      }

      var productoExistenteIndex = carrito.findIndex(function (producto) {
        return producto.nombre === nombreProducto;
      });
    
      if (productoExistenteIndex !== -1) {
        // El producto ya existe en el carrito, actualizar la cantidad
        carrito[productoExistenteIndex].cantidad = cantidadActual;
      }
    
      // Eliminar entradas anteriores del producto con una cantidad diferente
      carrito = carrito.filter(function (producto) {
        return producto.nombre !== nombreProducto || producto.cantidad === cantidadActual;
      });
  
      // Actualizar el carrito en el localStorage
      actualizarLocalStorageCarrito();
    }
  }








  
//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    let carritoAntiguo = JSON.parse(localStorage.getItem("carrito"));
    let arrayTemp = [];
    var buttonClicked = event.target;
    var nombre = buttonClicked.parentElement;
    var nombreNuevo = nombre.getElementsByClassName('carrito-item-titulo')[0].innerText.toString();
    let filtro = arrayTienda.filter(e => e.nombre == [nombreNuevo]);
    for (const i of filtro) {
        var idBusqueda = i.id;
        
    }
    
    for (const i of carritoAntiguo) {
        if(i.id != idBusqueda){
            arrayTemp.push(i);
        }
    }
    console.log(arrayTemp);
    buttonClicked.parentElement.parentElement.remove();
    

    localStorage.setItem("carrito",JSON.stringify(arrayTemp));
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.



//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}

