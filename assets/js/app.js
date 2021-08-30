//======== API KEY ========//
const KEY = "533f520d1a4f07b5c254f1d428cfe0f0";

//======== Html elements ========//
const searchInput = document.getElementById("search-input");
const btnSearch = document.getElementById("btn-search");
const tempField = document.getElementById("temp-field");
const tempRange = document.getElementById("temp-range");
const cityName = document.getElementById("city-name");
const descFiled = document.getElementById("desc-field");
const weatherSt = document.getElementById("weather-status");
const errorFiled = document.getElementById("error-message-filed");
const errorMsg = document.getElementById("error-message");
const icon = document.getElementById("icon");

//======== Handlers ========//
btnSearch.addEventListener("click", function (e) {
  e.preventDefault();
  if (!searchInput.value.trim()) return;
  displayWeather(searchInput.value);
});

searchInput.addEventListener("keypress", function (e) {
  if (!searchInput.value.trim()) return;
  if (e.charCode === 13) {
    displayWeather(searchInput.value);
  }
});

//======== Functions ========//
const displayWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  if (data.cod === "404") {
    errorMsg.innerText = `${
      data.message[0].toUpperCase() + data.message.slice(1)
    } 😥`;
    searchInput.value = "";
    errorFiled.classList.remove("hidden");
    return;
  }

  tempField.innerText = `${Math.round(data.main.temp - 274.15)}°C`;
  cityName.innerText = `${data.name}, ${data.sys.country}`;

  tempRange.innerText = `${Math.round(
    data.main.temp_min - 274.15
  )}°C / ${Math.round(data.main.temp_max - 274.15)}°C`;
  descFiled.innerText = data.weather[0].main;

  if (data.weather[0].main == "Rain") {
    document.body.style.backgroundImage = "url('assets/images/rain.jpg')";
    icon.setAttribute("src", "assets/images/icons/rain.png");
  } else if (data.weather[0].main == "Clear") {
    document.body.style.backgroundImage = "url('assets/images/clear.jpg')";
    icon.setAttribute("src", "assets/images/icons/sun.png");
  } else if (data.weather[0].main == "Clouds") {
    document.body.style.backgroundImage = "url('assets/images/cloud.jpg')";
    icon.setAttribute("src", "assets/images/icons/cloud.png");
  } else if (data.weather[0].main == "Snow") {
    document.body.style.backgroundImage = "url('assets/images/snow.jpg')";
    icon.setAttribute("src", "assets/images/icons/snow.png");
  } else if (data.weather[0].main == "Strom") {
    document.body.style.backgroundImage = "url('assets/images/storm.jpg')";
    icon.setAttribute("src", "assets/images/icons/storm.png");
  } else if (data.weather[0].main == "Haze") {
    document.body.style.backgroundImage = "url('assets/images/haze.jpg')";
    icon.setAttribute("src", "assets/images/icons/haze.png");
  } else if (data.weather[0].main == "Drizzle") {
    document.body.style.backgroundImage = "url('assets/images/drizzle.jpg')";
    icon.setAttribute("src", "assets/images/icons/.png");
  }
  searchInput.value = "";
  weatherSt.classList.remove("hidden");
};
