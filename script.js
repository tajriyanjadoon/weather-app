let input = document.getElementById("city-input");
let button = document.getElementById("search-btn");
let weatherIcon = document.getElementsByClassName("weather-icon");
let temperature = document.getElementsByClassName("temperature");
let description = document.getElementsByClassName("description");
let humidity = document.getElementsByClassName("humidity-value");
let windSpeed = document.getElementsByClassName("wind-value");
let weatherInfo = document.getElementById("weather-info");
let errorLogo = document.querySelector(".error_logo img");


button.addEventListener("click", () => {
    checkWeather(input.value);

});

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkWeather(input.value);
    }
});



async function checkWeather(city) {
    const apiKey="7223ed37f75e5fe4d9dc18951cea8893";
const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(`${apiUrl}&appid=${apiKey}`);
    if (response.status == 404) {
       weatherInfo.style.display = "none";
        errorLogo.style.display = "flex";

    } 
    else {
        if(weatherInfo.style.display == "none" && errorLogo.style.display == "flex") {       
             errorLogo.style.display = "none";
            weatherInfo.style.display = "flex";
    }

        var data = await response.json();
        console.log(data);

        switch(data.weather[0].main) {
            case "Clear":
            weatherIcon[0].src = "./assets/sunny.png";
            break; 
            case "Mist":
            weatherIcon[0].src = "./assets/mist.png";
            break;     
            case "Rain":
            weatherIcon[0].src = "./assets/rain.png";
            break;
            case "Snow":
            weatherIcon[0].src = "./assets/snow.png";
            break;
            case "Clouds":
            weatherIcon[0].src = "./assets/cloud.png";
            break;
            default:
            weatherIcon[0].src = "./assets/rain.png";
            break;
        }
        temperature[0].innerHTML = Math.round(data.main.temp) + "°C";
        description[0].innerHTML = data.weather[0].description;
        humidity[0].innerHTML = data.main.humidity + "%";
        windSpeed[0].innerHTML = data.wind.speed + " km/h";
    }
}
