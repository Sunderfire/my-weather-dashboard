var apiKey = "d492c4a56843f92b6801117f17c8a75a";
var searchButton = document.querySelector("#search-field-submit");
var searchInput = document.querySelector("#search-field-input");
var cityNameEle = document.querySelector("#city-name")
var temperatureEle = document.querySelector("#temperature");
var windEle = document.querySelector("#wind");
var humidityEle = document.querySelector("#humidity");
var pastSearchArea = document.querySelector("#past-search-area");
var pastSearch = document.createElement("button");
var fiveDayForecast = document.querySelector("#five-day-forecast");
var currentDay = dayjs().format("MM/DD/YYYY");

//Captitalize function
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Generate Past Search Buttons
function generatePastSearchButton(cityName) {
    var pastSearch = document.createElement("button");
    pastSearch.type = "button";
    pastSearch.className = "btn btn-primary m-1";
    pastSearch.textContent = cityName;
    pastSearch.addEventListener("click", function() {
        getSavedWeather(cityName);
    });
    pastSearchArea.appendChild(pastSearch);
}

//Get Weather Function
async function getWeather(cityName) {
    var cityName = searchInput.value.trim();
    cityName = capitalizeFirstLetter(cityName);
    var request = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);

    var iconCode = data.weather[0].icon;
    var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    var iconImg = document.createElement("img");
    iconImg.src = iconURL;
    cityNameEle.innerHTML = "";
    cityNameEle.innerHTML = cityName + " (" + currentDay + ")";
    cityNameEle.appendChild(iconImg);
    

    temperatureEle.textContent = "Temp: " + data.main.temp + "℉";
    windEle.textContent = "Wind: " + data.wind.speed + "MPH";
    humidityEle.textContent = "Humidity: " + data.main.humidity + "%";
    
    localStorage.setItem("savedCityName", cityName);
    var storedCityName = localStorage.getItem("savedCityName");

    var existingButtons = pastSearchArea.querySelectorAll("button");
    var buttonExists = Array.from(existingButtons).some(function (button) {
        return button.textContent === storedCityName;
    });

    if (!buttonExists) {
        generatePastSearchButton(storedCityName);
    }

    getFiveDayForecast(cityName)
}

//Get Five Day Forecast Function
async function getFiveDayForecast() {
    var cityName = searchInput.value.trim();
    cityName = capitalizeFirstLetter(cityName);
    var request = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);

    data.list.forEach(forecast => {
        var forecastDateTime = forecast.dt_txt;
        var forecastTime = forecastDateTime.split(' ')[1];
        var displayedDate = forecast.dt_txt.split(' ')[0];
        
        
        if (forecastTime === '12:00:00') {
            var forcastCard = document.createElement("card")
            var forecastHTML = `
                <h3>${displayedDate}</h3>
                <p>Temp: ${forecast.main.temp}</p>
                <p>Wind: ${forecast.wind.speed}</p>
                <p>Humidity: ${forecast.main.humidity}%</P>
                `;
            forcastCard.innerHTML = forecastHTML;
            fiveDayForecast.appendChild(forcastCard);
        }
    });
}


async function getSavedWeather(cityName) {
    var request = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);

    cityNameEle.textContent = cityName + " (" + currentDay + ")";
    temperatureEle.textContent = "Temp: " + data.main.temp + "℉";
    windEle.textContent = "Wind: " + data.wind.speed + "MPH";
    humidityEle.textContent = "Humidity: " + data.main.humidity + "%";
}



searchButton.addEventListener("click", getWeather);


/*var temperature = forecast.main.temp;
        var windSpeed = forecast.wind.speed;
        var humidity = forecast.main.humidity;*/