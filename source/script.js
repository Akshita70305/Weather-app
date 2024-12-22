function updateWeather(response) {
  let tempElement = document.querySelector("#temp");
  let temperature = response.data.temperature.current;
  tempElement.innerHTML = Math.round(temperature);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement = addEventListener("submit", addCityName);
