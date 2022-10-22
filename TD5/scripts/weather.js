import config from './config.js';

const displayWeather = (weatherData) => {};

//température, ressentie, minimale, maximale, temps, pourcentage d'humidité
const fetchWeather = (communeName) => {
  const fields = ['feels_like', 'temp', 'temp_min', 'temp_max', 'humidity'];
  const weatherDataRow = document.getElementById('weather-data');
  fetch(
    `${config.openWeather.baseUrl}/2.5/weather?q=${communeName},FR&units=metric&appid=${config.openWeather.apiKey}`
  )
    .then((res) => res.json())
    .then((json) => {
      const weatherData = json.main;
      for (const key of fields) {
        const td = document.createElement('td');
        td.innerText = String(weatherData[key]);
        weatherDataRow?.append(td);
      }
    });
};

const handleLoad = async () => {
  const communeName = localStorage.getItem('communeName');
  if (communeName !== undefined && communeName !== null) {
    document.getElementById('name').innerHTML = communeName;
    fetchWeather(communeName);
    return;
  }

  window.location.replace('./');

  /*
  const communeString = sessionStorage.getItem('commune');
  if (!communeString) return;
  const commune = JSON.parse(communeString);
  document.getElementById('name').innerHTML = commune.nom;
  fetchWeather(commune.nom);
  */
};

window.addEventListener('load', handleLoad);
