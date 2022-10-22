import config from './config.js';
import { createTd } from './utils.js';

const displayWeather = (weatherData) => {
  console.log(weatherData);
  const fields = ['feels_like', 'temp', 'temp_min', 'temp_max', 'humidity'];
  const weatherDataRow = document.getElementById('weather-data');
  weatherDataRow.innerHTML = '';
  for (const key of fields) {
    weatherDataRow.append(createTd(String(weatherData.main[key])));
  }
  const weather = weatherData.weather[0];
  document.getElementById('weather-icon').src =
    config.openWeather.iconUrl.replace(
      config.openWeather.iconPlaceholder,
      weather.icon
    );

  document.getElementById('weather-desc').innerText = weather.main;
};

const fetchWeather = (communeName) => {
  return new Promise((resolve, reject) => {
    fetch(
      `${config.openWeather.baseUrl}/2.5/weather?q=${communeName},FR&units=metric&appid=${config.openWeather.apiKey}`
    )
      .then((res) => {
        if (!res.ok) reject(res);
        else return res.json();
      })
      .then((json) => resolve(json))
      .catch(reject);
  });
};

export { fetchWeather, displayWeather };
