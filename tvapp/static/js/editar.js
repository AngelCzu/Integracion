//PARTE DE LAS VALIDACIONES

function validarFormulario(){
    var precioInput = document.getElementById("txtPrecio");
    var stockInput = document.getElementById("txtStock");
    
    let nombre  = document.getElementById("txtNombre").value;
    let descripcion  = document.getElementById("txtDescripcion").value;

    var precio = precioInput.value.trim();
    var stock = stockInput.value.trim();
        
    //PRECIO

        if (precio.length == 0) {
            document.getElementById("valPrecio").style.display = "inline";
            document.getElementById("txtPrecio").classList.add("is-invalid");
            
        }else{
            document.getElementById("txtPrecio").classList.remove("is-invalid");
            document.getElementById("txtPrecio").classList.add("is-valid");
            document.getElementById("valPrecio").style.display = "none";
        }
        if (/^\d+$/.test(precio)) {
            document.getElementById("txtPrecio").classList.remove("is-invalid");
            document.getElementById("txtPrecio").classList.add("is-valid");
            document.getElementById("valPrecio").style.display = "none";
        }else{
            document.getElementById("txtPrecio").classList.remove("is-valid");
            document.getElementById("valPrecio").style.display = "inline";
            document.getElementById("txtPrecio").classList.add("is-invalid");
        }
        precioInput.value = precioInput.value.replace(/\D/g, '');

    //STOCK
    if (stock.length == 0) {
        document.getElementById("valStock").style.display = "inline";
        document.getElementById("txtStock").classList.add("is-invalid");
        
    }else{
        document.getElementById("txtStock").classList.remove("is-invalid");
        document.getElementById("txtStock").classList.add("is-valid");
        document.getElementById("valStock").style.display = "none";
    }
    if (/^\d+$/.test(stock)) {
        document.getElementById("txtStock").classList.remove("is-invalid");
        document.getElementById("txtStock").classList.add("is-valid");
        document.getElementById("valStock").style.display = "none";
    }else{
        document.getElementById("txtStock").classList.remove("is-valid");
        document.getElementById("valStock").style.display = "inline";
        document.getElementById("txtStock").classList.add("is-invalid");
    }
    stockInput.value = stockInput.value.replace(/\D/g, '');

    //NOMBRE
    if (nombre.length == 0) {
        document.getElementById("valNombre").style.display = "inline";
        document.getElementById("txtNombre").classList.add("is-invalid");
        
    }else{
        document.getElementById("txtNombre").classList.remove("is-invalid");
        document.getElementById("txtNombre").classList.add("is-valid");
        document.getElementById("valNombre").style.display = "none";
    }
    //DESCRIPCION
    if (descripcion.length == 0) {
        document.getElementById("valDescripcion").style.display = "inline";
        document.getElementById("txtDescripcion").classList.add("is-invalid");
    }else{
        document.getElementById("txtDescripcion").classList.remove("is-invalid");
        document.getElementById("txtDescripcion").classList.add("is-valid");
        document.getElementById("valDescripcion").style.display = "none";
    }
}