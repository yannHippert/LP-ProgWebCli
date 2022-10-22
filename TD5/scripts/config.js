const GOUV_BASE_URL = 'https://geo.api.gouv.fr';

const GOUV_CONFIG = {
  baseUrl: GOUV_BASE_URL,
};

const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data';
const OPENWEATHER_ICON_PLACEHOLDER = '%icon%';
const OPENWEATHER_ICON_URL = `http://openweathermap.org/img/wn/${OPENWEATHER_ICON_PLACEHOLDER}@2x.png`;
const OPENWEATHER_API_KEY = '8e57d5c373c11bb9b0b87b14a6c751ca';

const OPENWEATHER_CONFIG = {
  baseUrl: OPENWEATHER_BASE_URL,
  apiKey: OPENWEATHER_API_KEY,
  iconUrl: OPENWEATHER_ICON_URL,
  iconPlaceholder: OPENWEATHER_ICON_PLACEHOLDER,
};

const config = {
  gouv: GOUV_CONFIG,
  openWeather: OPENWEATHER_CONFIG,
};

export default config;
