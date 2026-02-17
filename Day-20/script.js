const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const weatherResult = document.getElementById("weatherResult");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {

    const city = document.getElementById("cityInput").value;

    if(city === "") {
        alert("Please enter city name");
        return;
    }

    showLoading();

    try {

        // Step 1: Get latitude and longitude from city name
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const geoData = await geoResponse.json();

        if(!geoData.results) {
            alert("City not found");
            hideLoading();
            return;
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;
        const name = geoData.results[0].name;

        // Step 2: Get weather data
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m`
        );

        const weatherData = await weatherResponse.json();

        // Display data
        cityName.textContent = name;
        temperature.textContent = weatherData.current_weather.temperature;
        windSpeed.textContent = weatherData.current_weather.windspeed;
        humidity.textContent = weatherData.hourly.relativehumidity_2m[0];

        weatherResult.classList.remove("hidden");

    }
    catch(error) {
        alert("Error fetching weather data");
    }

    hideLoading();
}

function showLoading() {
    loading.classList.remove("hidden");
    weatherResult.classList.add("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}
