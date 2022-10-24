import { displayError } from './utils.js';
import { displayWeather, fetchWeather } from './weather.js';

const initListeners = () => {
  $('#back-button').click(function () {
    window.location.replace('./');
  });
};

const handleLoad = async () => {
  const communeName = localStorage.getItem('communeName');
  if (communeName === undefined || communeName === null)
    window.location.replace('./');

  $('#name').html(communeName);
  fetchWeather(communeName, displayWeather, displayError);
  initListeners();
};

$(document).ready(handleLoad);
