var apiKey = "d492c4a56843f92b6801117f17c8a75a";
var searchButton = document.querySelector("#search-field-submit");
var searchInput = document.querySelector("#search-field-input");
var cityNameEle = document.querySelector("#city-name")
var temperatureEle = document.querySelector("#temperature");
var windEle = document.querySelector("#wind");
var humidityEle = document.querySelector("#humidity");
var pastSearchArea = document.querySelector("#past-search-area")

var currentDay = dayjs().format("MM/DD/YYYY");

var pastSearch = document.createElement("button");

async function getWeather(cityName) {
    var cityName = searchInput.value
    var request = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);

    cityNameEle.textContent = cityName + " (" + currentDay + ")";
    temperatureEle.textContent = "Temp: " + data.main.temp + "℉";
    windEle.textContent = "Wind: " + data.wind.speed + "MPH";
    humidityEle.textContent = "Humidity: " + data.main.humidity + "%";

    pastSearchArea.appendChild(pastSearch)
}

searchButton.addEventListener("click", getWeather);

