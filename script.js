const cityElement = document.querySelector(".city")
const iconElement = document.querySelector(".icon")
const descriptionElement= document.querySelector(".description")
const temperatureElement = document.querySelector(".temperature")
const humidityElement = document.querySelector(".humidity")
const windElement = document.querySelector(".wind")
const weatherElement = document.querySelector(".weather")
const searchInputText = document.getElementById("search-input")

const weather = {}
const apiKey =  "58782a0db956cc6008e9fce3c0fce3a4"

if('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(findUserLocation)
}

function findUserLocation(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeatherByLocation(latitude, longitude);  
}

function getWeatherByLocation(latitude, longitude){
  let userLocationApi = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&appid="+apiKey;
  fetch(userLocationApi)
      .then((response) => { 
          return response.json();
      })
      .then((data) => displayWeather(data));
}


function getWeather(city) {
  let byCityApi = "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+apiKey;
  fetch(byCityApi)
      .then((response) => {
          if (response.ok) {
            return response.json();
        }
        alert("Sorry, no weather is found");
      })
      .then((data) => displayWeather(data));
}

function displayWeather(data) {
        weather.name = data.name; 
        weather.icon = data.weather[0].icon;
        weather.description = data.weather[0].description
        weather.temp = data.main.temp;
        weather.humidity  = data.main.humidity;
        weather.speed = data.wind.speed;
        console.log(weather.name, weather.icon, weather.description, weather.temp, weather.humidity, weather.speed)

        cityElement.innerText = "Weather in "+weather.name;
        iconElement.src = "https://openweathermap.org/img/wn/"+weather.icon+".png";
        descriptionElement.innerText = weather.description;
        temperatureElement.innerText = weather.temp + "°C";
        humidityElement.innerText= "Humidity: " + weather.humidity + "%";
        windElement.innerText = "Wind speed: " + weather.speed + " km/h";
        weatherElement.classList.remove("loading");
        document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + weather.name + "')";
}

function searchCity() {
    const cityName = searchInputText.value.trim()
    getWeather(cityName)
}
    
const searchOnClick = document.querySelector(".search button")
const searchOnEnter = document.querySelector(".search-bar")

searchOnClick.addEventListener("click", (event) => searchCity());

searchOnEnter.addEventListener("keyup", (event) => {
  if (event.key == "Enter")  
    searchCity()
});
    
//getWeather("Coimbatore");
