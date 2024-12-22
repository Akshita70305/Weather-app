function addCityName(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = citySearch.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement = addEventListener("submit", addCityName);
