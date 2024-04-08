let clima = {
    APIKey: "5bc36b2a3544e2ab6e518cbffbef8aac",
    //FUNCION PARA LLAMAR LOS DATOS DE LA API
    fetchWeather: function (ciudad) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        ciudad +
          "&units=metric&appid=" +
          this.APIKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("Ciudad no encontrada.");
            throw new Error("Ciudad no encontrada.");
          }
          return response.json();
        })
        .then((data) => this.mostrarClima(data));
    },
    mostrarClima: function (data) {
      const {name} = data;
      const {icon, description } = data.weather[0];
      const {temp, humidity} = data.main;
      const {speed} = data.wind;
        
      //IDS U CLASES DEL HTML PARA DPS MODIFICAR
      document.querySelector(".ciudad").innerText = "El clima en " + name;
      document.querySelector(".icono").src ="https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".descripcion").innerText = description;
      document.querySelector(".temperatura").innerText = temp + "°C";
      document.querySelector(".humedad").innerText ="Humedad: " + humidity + "%";
      document.querySelector(".viento").innerText = "Viento:" + speed + " km/h";
      document.querySelector(".clima").classList.remove("carga");
    },
    buscar: function () {
      this.fetchWeather(document.querySelector(".form-control").value);
    },
  };
  
  document.querySelector(".buscar button").addEventListener("click", function () {
    clima.buscar();
  });
  
  document.querySelector(".form-control").addEventListener("keyup", function (b) {
      if (b.key == "Enter") {
        clima.buscar();
      }
    });
  
clima.fetchWeather("...");
  