import { displayError } from './utils.js';
import { displayWeather, fetchWeather } from './weather.js';

const initListeners = () => {
  document
    .getElementById('back-button')
    .addEventListener('click', () => window.location.replace('./'));
};

const handleLoad = async () => {
  // const communeString = localStorage.getItem('commune');
  // if (!communeString) window.location.replace('./');
  // const commune = JSON.parse(communeString);
  // const communeName = commune.nom;

  const communeName = localStorage.getItem('communeName');
  if (communeName === undefined || communeName === null)
    window.location.replace('./');

  document.getElementById('name').innerHTML = communeName;
  fetchWeather(communeName).then(displayWeather).catch(displayError);
  initListeners();
};

window.addEventListener('load', handleLoad);
