
const url = "https://api.openweathermap.org/data/2.5/weather?q=Atlanta,US&appid=4009c74d236b511eec4482ecef547e48&units=imperial";


let WeatherIcon = document.querySelector('#weather-icon');
let CurrentTemp = document.querySelector('#temp-value');
let WindSpeedKm = document.querySelector('#wind-speed-value');
let WindChillDisplay = document.querySelector('#wind-chill-display');
let WeatherDesc = document.querySelector('#weather-desc');



async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      //console.log(data);

      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log();
  }
}

apiFetch();

function displayResults(weatherData) {

  {
    if (!weatherData.main || !weatherData.wind) {
      console.log("Error: missing 'main' or 'wind' property in weather data");
      return;
    }


  const windSpeedKm = weatherData.wind.speed * 1.609;
  
  CurrentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`; //* Retrieves current temperature data from the weather API

  const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  const desc = weatherData.weather[0].description;

  WeatherIcon.setAttribute('src', iconsrc);
  WeatherIcon.setAttribute('alt', desc);
  WeatherDesc.textContent = desc;

  WindSpeedKm.innerHTML = `${windSpeedKm.toFixed(2)}`;

  if (weatherData.wind.speed < 3 || weatherData.main.temp < 50) {
    WindChillDisplay.textContent = "N/A";
  } else {
    let windChill = 35.74 + 0.6215 * weatherData.main.temp - 35.75 * Math.pow(weatherData.wind.speed, 0.16) + 0.4275 * weatherData.main.temp * Math.pow(weatherData.wind.speed, 0.16);
    WindChillDisplay.textContent = windChill.toFixed(2) + "°F";
  }
}

}