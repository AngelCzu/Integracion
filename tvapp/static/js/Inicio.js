

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



  

/*FUNCION DEL RELOJ*/
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