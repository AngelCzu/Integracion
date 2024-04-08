//PARTE DE LAS VALIDACIONES
document.getElementById("valSKU").style.display = "none";
document.getElementById("valPrecio").style.display = "none";
document.getElementById("valStock").style.display = "none";
document.getElementById("valNombre").style.display = "none";
document.getElementById("valDescripcion").style.display = "none";
document.getElementById("valImagen").style.display = "none";
document.getElementById("valCategoria").style.display = "none";

function validarFormulario(){
    var skuInput = document.getElementById("txtSku");
    var precioInput = document.getElementById("txtPrecio");
    var stockInput = document.getElementById("txtStock");


    let nombre  = document.getElementById("txtNombre").value;
    let descripcion  = document.getElementById("txtDescripcion").value;
    let imagen  = document.getElementById("txtImagen").value;

    let categoriaInput  = document.getElementById("cmbCategoria");
    let categoria  = categoriaInput.selectedIndex;

    var sku = skuInput.value.trim();
    var precio = precioInput.value.trim();
    var stock = stockInput.value.trim();

    //SKU
        if (sku.length == 0) {
            document.getElementById("valSKU").style.display = "inline";
            document.getElementById("txtSku").classList.add("is-invalid");
        }else{
            document.getElementById("txtSku").classList.remove("is-invalid");
            document.getElementById("txtSku").classList.add("is-valid");
            document.getElementById("valSKU").style.display = "none";
        }
        if (/^\d+$/.test(sku)) {
            document.getElementById("txtSku").classList.remove("is-invalid");
            document.getElementById("txtSku").classList.add("is-valid");
            document.getElementById("valSKU").style.display = "none";
            return;
        }else{
            document.getElementById("txtSku").classList.remove("is-valid");
            document.getElementById("valSKU").style.display = "inline";
            document.getElementById("txtSku").classList.add("is-invalid");
        }
        skuInput.value = skuInput.value.replace(/\D/g, '');
        
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
        } else {
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
    //IMAGEN
    if (imagen.length == 0 && imagen.length == '') {
        document.getElementById("valImagen").style.display = "inline";
        document.getElementById("txtImagen").classList.add("is-invalid");
    }else{
        document.getElementById("txtImagen").classList.remove("is-invalid");
        document.getElementById("txtImagen").classList.add("is-valid");
        document.getElementById("valImagen").style.display = "none";
    }
    if (document.getElementById("txtImagen").value == '') {
        document.getElementById("txtImagen").classList.add("is-invalid");
        document.getElementById("valImagen").style.display = "inline";
    }else{
        document.getElementById("txtImagen").classList.remove("is-invalid");
        document.getElementById("txtImagen").classList.add("is-valid");
        document.getElementById("valImagen").style.display = "none";
    }
    //CATEGORIA
    if (categoria  == 0) {
        document.getElementById("valCategoria").style.display = "inline";
        document.getElementById("cmbCategoria").classList.add("is-invalid");
    }else{
        document.getElementById("cmbCategoria").classList.remove("is-invalid");
        document.getElementById("cmbCategoria").classList.add("is-valid");
        document.getElementById("valCategoria").style.display = "none";
    }
}