import config from './config.js';
import { createTd } from './utils.js';

const displayWeather = (weatherData) => {
  const fields = ['feels_like', 'temp', 'temp_min', 'temp_max', 'humidity'];
  $('#weather-data').html('');
  for (const key of fields) {
    $('#weather-data').append(createTd(String(weatherData.main[key])));
  }
  const weather = weatherData.weather[0];
  $('#weather-icon').attr(
    'src',
    config.openWeather.iconUrl.replace(
      config.openWeather.iconPlaceholder,
      weather.icon
    )
  );
  $('#weather-desc').html(weather.main);
};

const fetchWeather = (communeName, callback, error) => {
  $.getJSON(
    `${config.openWeather.baseUrl}/2.5/weather?q=${communeName},FR&units=metric&appid=${config.openWeather.apiKey}`,
    callback
  ).fail(error);
};

export { fetchWeather, displayWeather };
