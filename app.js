const cityElement = document.querySelector(".city")
const iconElement = document.querySelector(".icon")
const descriptionElement= document.querySelector(".description")
const temperatureElement = document.querySelector(".temperature")
const humidityElement = document.querySelector(".humidity")
const windElement = document.querySelector(".wind")
const weatherElement = document.querySelector(".weather")
const searchInputText = document.getElementById("search-input")




let weather = {
    "apiKey": "58782a0db956cc6008e9fce3c0fce3a4",
    getWeather: function(city) {
        fetch("http://api.openweathermap.org/data/2.5/weather?q="
        +city
        +"&units=metric&appid="+
        this.apiKey
        ).then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed)
        cityElement.innerText = "Weather in "+name;
        iconElement.src = "https://openweathermap.org/img/wn/" + icon + ".png";
        descriptionElement.innerText = description;
        temperatureElement.innerText = temp + "°C";
        humidityElement.innerHTML = "Humidity: " + humidity + "%";
        windElement.innerText = "Wind speed: " + speed + " km/h";
        weatherElement.classList.remove("loading");
        document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.getWeather(searchInputText.value.trim());
      },
    };
    

const searchOnClick = document.querySelector(".search button")
const searchOnEnter = document.querySelector(".search-bar")

    searchOnClick.addEventListener("click", function () {
      weather.search();
    });
    
    searchOnEnter.addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
          weather.search();
        }
      });
    
    weather.getWeather("Coimbatore");