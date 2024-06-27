// const cityInput = document.querySelector(".city-input");
// const searchButton = document.querySelector(".search-btn");
// const locationButton = document.querySelector(".location-btn");
// const currentWeatherDiv = document.querySelector(".current-weather");
// const weatherCardsDiv = document.querySelector(".weather-cards");

// const API_KEY = "f4c33311f34cc3fd933734cfb6894a6c";

// const createWeatherCard = (cityName, weatherItem, index) => {
//     if (index === 0) {
//         return `<div class="weather-data">
//        <div class="current-weather">
//          <div class="details">
//            <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
//            <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
//            <h4>Wind: ${weatherItem.wind.speed} m/s</h4>
//            <h4>Humidity: ${weatherItem.main.humidity}%</h4>
//          </div>
//          <div class="icon">
//            <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
//            <h4>${weatherItem.weather[0].description}</h4>
//          </div>
//        </div>`;
//     } else {
//         return `<li class="card">
//         <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
//         <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
//         <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
//         <h4>Wind: ${weatherItem.wind.speed} m/s</h4>
//         <h4>Humidity: ${weatherItem.main.humidity}%</h4>
//         </li>`;
//     }
// };

// const getWeatherDetails = (cityName, lat, lon) => {
//     const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

//     fetch(WEATHER_API_URL)
//         .then((res) => res.json())
//         .then((data) => {
//             const uniqueForecastDays = [];

//             const fiveDaysForecast = data.list.filter((forecast) => {
//                 const forecastDate = new Date(forecast.dt_txt).getDate();
//                 if (!uniqueForecastDays.includes(forecastDate)) {
//                     return uniqueForecastDays.push(forecastDate);
//                 }
//             });

//             cityInput.value = "";
//             currentWeatherDiv.innerHTML = "";
//             weatherCardsDiv.innerHTML = "";

//             fiveDaysForecast.forEach((weatherItem, index) => {
//                 if (index === 0) {
//                     currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
//                 } else {
//                     weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
//                 }
//             });
//         })
//         .catch(() => {
//             alert("An error occurred while fetching the weather forecast");
//         });
// };

// const getCityCoordinates = () => {
//     const cityName = cityInput.value.trim();
//     if (!cityName) return;
//     const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`;

//     fetch(GEOCODING_API_URL)
//         .then((res) => res.json())
//         .then((data) => {
//             if (!data.length) return alert(`No coordinates found for ${cityName}`);
//             const { name, lat, lon } = data[0];
//             getWeatherDetails(name, lat, lon);
//         })
//         .catch(() => {
//             alert("An error occurred while fetching the coordinates");
//         });
// };

// getUserCoordinates = () => {
//     navigator.geolocation.getCurrentPosition(
//         (position) => {
//             const { latitude, longitude } = position.coords;
//             const RESVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
//             fetch(RESVERSE_GEOCODING_URL)
//                 .then((res) => res.json())
//                 .then((data) => {
//                     const { name } = data[0];
//                     getWeatherDetails(name, latitude, longitude);
//                 })
//                 .catch(() => {
//                     alert("An error occurred while fetching the city");
//                 });
//         },
//         (error) => {
//             if (error.code === error.PERMISSION_DENIED) {
//                 alert("Geolocation request denied. Please reset location permission to grant access.");
//             }
//         }
//     );
// };

// locationButton.addEventListener("click", getUserCoordinates);
// searchButton.addEventListener("click", getCityCoordinates);
// cityInput.addEventListener("keyup", (e) => e.key === "Enter" && getCityCoordinates());





// -------------------------------------------------------------------------

const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "f4c33311f34cc3fd933734cfb6894a6c"; // API key for OpenWeatherMap API

const createWeatherCard = (cityName, weatherItem, index) => {
    if (index === 0) { // HTML for the main weather card
        return `<div class="details">
                    <h6>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h6>
                    <h6>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </div>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt="weather-icon">
                    <h6>${weatherItem.weather[0].description}</h6>
                </div>`;
    } else { // HTML for the other five day forecast card
        return `<li class="card">
                    <h6>(${weatherItem.dt_txt.split(" ")[0]})</h6>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt="weather-icon">
                    <h6>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h6>
                    <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
                    <h6>Humidity: ${weatherItem.main.humidity}%</h6>
                </li>`;
    }
}

const getWeatherDetails = (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL)
        .then(response => response.json())
        .then(data => {
            // Filter the forecasts to get only one forecast per day
            const uniqueForecastDays = [];
            const fiveDaysForecast = data.list.filter(forecast => {
                const forecastDate = new Date(forecast.dt_txt).getDate();
                if (!uniqueForecastDays.includes(forecastDate)) {
                    uniqueForecastDays.push(forecastDate);
                    return true;
                }
                return false;
            });

            // Clearing previous weather data
            cityInput.value = "";
            currentWeatherDiv.innerHTML = "";
            weatherCardsDiv.innerHTML = "";

            // Creating weather cards and adding them to the DOM
            fiveDaysForecast.forEach((weatherItem, index) => {
                const html = createWeatherCard(cityName, weatherItem, index);
                if (index === 0) {
                    currentWeatherDiv.insertAdjacentHTML("beforeend", html);
                } else {
                    weatherCardsDiv.insertAdjacentHTML("beforeend", html);
                }
            });
        })
        .catch(error => {
            console.error("An error occurred while fetching the weather forecast:", error);
            alert("An error occurred while fetching the weather forecast!");
        });
}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    // Get entered city coordinates (latitude, longitude, and name) from the API response
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            if (!data.length) return alert(`No coordinates found for ${cityName}`);
            const { lat, lon, name } = data[0];
            getWeatherDetails(name, lat, lon);
        })
        .catch(error => {
            console.error("An error occurred while fetching the coordinates:", error);
            alert("An error occurred while fetching the coordinates!");
        });
}

const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords; // Get coordinates of user location
            // Get city name from coordinates using reverse geocoding API
            const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
            fetch(API_URL)
                .then(response => response.json())
                .then(data => {
                    const { name } = data[0];
                    getWeatherDetails(name, latitude, longitude);
                })
                .catch(error => {
                    console.error("An error occurred while fetching the city name:", error);
                    alert("An error occurred while fetching the city name!");
                });
        },
        error => { // Show alert if user denied the location permission
            if (error.code === error.PERMISSION_DENIED) {
                alert("Geolocation request denied. Please reset location permission to grant access again.");
            } else {
                alert("Geolocation request error. Please reset location permission.");
            }
        });
}

locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => {
    if (e.key === "Enter") getCityCoordinates();
});
