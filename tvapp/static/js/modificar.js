const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      product = body.querySelector("#dropdown"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

      document.getElementById("icon_sol").style.display = "none";

toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click" , () =>{
    sidebar.classList.remove("close");
})

product.addEventListener("click" , () =>{
    sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        document.getElementById("icon_luna").style.display = "none";
        document.getElementById("icon_sol").style.display = "inline";
        
        modeText.innerText = "Light mode";
        
        
        

    }else{
        modeText.innerText = "Dark mode";
        document.getElementById("icon_luna").style.display = "inline";
        document.getElementById("icon_sol").style.display = "none";
        
    }
});





const hora = document.getElementById('hora');
const AMPM = document.getElementById('AMPM')
const fecha = document.getElementById('fecha');
const diasSemana = [
    "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes","Sabado"
]
const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "September", "Octubre", "Noviembre", 
    "Diciembre"
];

const reloj = setInterval(() => {

    const local = new Date();
    
    let dia = local.getDate(),
        diaSemana = local.getDay(),
        mes = local.getMonth(),
        anio = local.getFullYear(),
        horas = local.getHours(),
        ampm = local.getHours();


        /*Formato para AM o PM*/
        if (horas >= 12) {
            horas = horas - 12;
            ampm = 'PM';
        }else{
            ampm = 'AM';
        }

        hora.innerHTML = local.toLocaleTimeString() + ` ${ampm}`;
        fecha.innerHTML = `${diasSemana[diaSemana]}, ${dia} de ${meses[mes]}  de ${anio}`;

}, 1);




document.getElementById("valBusqudaSKU").style.display = "none";
function validarSKU() {
    
    let busquedaSKU = document.getElementById("inputBuscarSKU").value;

    if (busquedaSKU.length == 0) {
        document.getElementById("inputBuscarSKU").classList.add("is-invalid");
        document.getElementById("valBusqudaSKU").style.display = "inline";
    }else{
        document.getElementById("inputBuscarSKU").classList.remove("is-invalid");
        document.getElementById("inputBuscarSKU").classList.add("is-valid");
        document.getElementById("valBusqudaSKU").style.display = "none";
    }
}

document.getElementById("valNombre").style.display = "none";
document.getElementById("valPrecio").style.display = "none";

function validarFormulario(){
    let nombreProd = document.getElementById("txtNombreAgregar").value;
    let precio = document.getElementById("txtPrecioAgregar").value;
    
    if (nombreProd.length == 0) {
        document.getElementById("txtNombreAgregar").classList.add("is-invalid");
        document.getElementById("valNombre").style.display = "inline";
    }else{
        document.getElementById("txtNombreAgregar").classList.remove("is-invalid");
        document.getElementById("txtNombreAgregar").classList.add("is-valid");
        document.getElementById("valNombre").style.display = "none";
    }

    if (precio.length == 0) {
        document.getElementById("txtPrecioAgregar").classList.add("is-invalid");
        document.getElementById("valPrecio").style.display = "inline";
    }else{
        document.getElementById("txtPrecioAgregar").classList.remove("is-invalid");
        document.getElementById("txtPrecioAgregar").classList.add("is-valid");
        document.getElementById("valPrecio").style.display = "none";
    }
}