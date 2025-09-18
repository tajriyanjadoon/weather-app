let input = document.getElementById("city-input");
let button = document.getElementById("search-btn");
let weatherIcon = document.getElementsByClassName("weather-icon");
let temperature = document.getElementsByClassName("temperature");
let description = document.getElementsByClassName("description");
let humidity = document.getElementsByClassName("humidity-value");
let windSpeed = document.getElementsByClassName("wind-value");
let weatherInfo = document.getElementById("weather-info");
let errorBox = document.querySelector(".error_logo");
let errorLogo = document.querySelector(".error_logo img");
let errorText = document.querySelector(".error_logo p");
let cityName = document.querySelector(".cityname");


button.addEventListener("click", () => {
  checkWeather(input.value);
});

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkWeather(input.value);
  }
});

async function checkWeather(city) {
  const apiKey = "7223ed37f75e5fe4d9dc18951cea8893";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);

  if (response.status == 404) {
    weatherInfo.style.display = "none";
    errorBox.style.display = "flex";   // show wrapper
    errorText.style.display = "block"; // show "city not found"
  } else {

    
    errorBox.style.display = "none";   // hide error
    errorText.style.display = "none";
    weatherInfo.style.display = "flex";

    var data = await response.json();
    console.log(data);

    switch (data.weather[0].main) {
      case "Clear":
        weatherIcon[0].src = "assets/sunny.png";
        break;
      case "Mist":
        weatherIcon[0].src = "assets/mist.png";
        break;
      case "Rain":
        weatherIcon[0].src = "assets/rain.png";
        break;
      case "Snow":
        weatherIcon[0].src = "assets/snow.png";
        break;
      case "Clouds":
        weatherIcon[0].src = "assets/cloud.png";
        break;
      default:
        weatherIcon[0].src = "assets/rain.png";
        break;
    }
    temperature[0].innerHTML = Math.round(data.main.temp) + " <sup>°C</sup>";
    description[0].innerHTML = data.weather[0].description;
    humidity[0].innerHTML = data.main.humidity + " <sup>%</sup>";
    windSpeed[0].innerHTML = data.wind.speed + " <sup>km/h</sup>";


    input.value = "";
     
  }
}
