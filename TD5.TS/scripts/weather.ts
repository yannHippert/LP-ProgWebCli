import { ICommune, IWeather, IWeatherResponse } from '../interfaces/interfaces';
import config from './config';

const displayWeather = (weatherData: IWeather) => {};

//température, ressentie, minimale, maximale, temps, pourcentage d'humidité
const fetchWeather = (communeName: string) => {
  const fields = ['feels_like', 'temp', 'temp_min', 'temp_max', 'humidity'];
  const weatherDataRow = document.getElementById('weather-data');
  fetch(
    `${config.openWeather.baseUrl}/2.5/weather?q=${communeName},FR&units=metric&appid=${config.openWeather.apiKey}`
  )
    .then((res: any) => res.json())
    .then((json: IWeatherResponse) => {
      const weatherData = json.main;
      for (const key of fields) {
        const td = document.createElement('td') as HTMLTableCellElement;
        td.innerText = String(weatherData[key as keyof IWeather]);
        weatherDataRow?.append(td);
      }
    });
};

const handleLoad = async () => {
  const communeString = sessionStorage.getItem('commune');
  if (!communeString) return;
  const commune = JSON.parse(communeString) as ICommune;
  const h1 = document.getElementById('name');
  if (!h1) return;
  h1.innerHTML = commune.nom;
  fetchWeather(commune.nom);
};

window.addEventListener('load', handleLoad);
