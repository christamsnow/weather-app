//day and time
let currentDay = document.querySelector("#current-day");
let currentTime = document.querySelector("#current-time");

let now = new Date();
let days = [
  "Sunday ",
  "Monday ",
  "Tuesday ",
  "Wednesday ",
  "Thursday ",
  "Friday ",
  "Saturday ",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
function fixMinutes(params) {
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
}
fixMinutes();
let time = `${hours}:${minutes}`;

currentDay.innerHTML = day;
currentTime.innerHTML = time;

//city search
function searchCity(searchedCity) {
  let apiKey = "6ad2af0e6e1670b40ddda4b103040cf3";
  let city = searchedCity;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function changeCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input");
  let mainCity = document.querySelector("#main-city");
  let searchedCity = inputCity.value;
  mainCity.innerHTML = searchedCity;

  searchCity(inputCity.value);
}
let button = document.querySelector("button");
button.addEventListener("click", changeCity);

//GPS weather button
function showWeather(response) {
  console.log(response.data);

  let mainCity = document.querySelector("#main-city");
  let mainTemp = document.querySelector("#main-temp");
  let humidity = document.querySelector("#humidity");
  let description = document.querySelector("#description");
  let wind = document.querySelector("#wind");

  fahrenheitTemperature = response.data.main.temp;

  mainCity.innerHTML = `${response.data.name}`;
  mainTemp.innerHTML = `${Math.round(fahrenheitTemperature)}˚`;
  humidity.innerHTML = `${response.data.main.humidity}`;
  description.innerHTML = `${response.data.weather[0].description}`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
}

function retrievePosition(position) {
  let apiKey = "6ad2af0e6e1670b40ddda4b103040cf3";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function accessUrl() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let gpsButton = document.querySelector(".gps-button");
gpsButton.addEventListener("click", accessUrl);

//fahrenheit and celcius switch
function changeToFahrenheit(event) {
  event.preventDefault();
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  mainTemp.innerHTML = `${Math.round(fahrenheitTemperature)}˚`;
}
function changeToCelcius(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celcius.classList.add("active");
  let celsiusTemperature = `${Math.round(
    ((fahrenheitTemperature - 32) * 5) / 9
  )}˚`;
  mainTemp.innerHTML = celsiusTemperature;
}

let mainTemp = document.querySelector("#main-temp");
let fahrenheitTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", changeToCelcius);

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("Philadelphia");
