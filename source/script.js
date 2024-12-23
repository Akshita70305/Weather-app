function updateWeather(response) {
  let tempElement = document.querySelector("#temp");
  let temperature = response.data.temperature.current;
  tempElement.innerHTML = Math.round(temperature);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let speedElement = document.querySelector("#speed");
  speedElement.innerHTML = `${response.data.wind.speed} km/h`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="image" />`;
}

function addApi(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function addCityName(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = citySearch.value;

  addApi(citySearch.value);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml += `<div class="weather-forecast-day">
          <div class="weather-forecast-date">${day}</div>
          <div class="weather-forecast-icon">🌥️</div>
          <div class="weather-forecast-temp">
            <div class="weather-forecast-tem">15&deg</div>
            <div class="weather-forecast-tem">9&deg</div>
          </div>
        </div>`;
  });

  let weatherForecast = document.querySelector("#weather-forecast");
  weatherForecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement = addEventListener("submit", addCityName);
addApi("New York");
displayForecast();
