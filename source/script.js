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
  getForecast(response.data.city);
}

function addApi(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function addCityName(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");

  addApi(citySearch.value);
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return day[date.getDay()];
}
function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `<div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDate(day.time)}</div>
          <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
          <div class="weather-forecast-temp">
            <div class="weather-forecast-tem">${Math.round(
              day.temperature.maximum
            )}&deg
            </div>
            <div class="weather-forecast-tem">${Math.round(
              day.temperature.minimum
            )}&deg
            </div>
          </div>
        </div>`;
    }
  });

  let weatherForecast = document.querySelector("#weather-forecast");
  weatherForecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement = addEventListener("submit", addCityName);
addApi("New York");
