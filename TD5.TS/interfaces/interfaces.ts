export interface IDepartment {
  nom: string;
  code: string;
  codeRegion: string;
}

export interface ICommune {
  code: string;
  codeDepartement: string;
  codeEpci: string;
  codeRegion: string;
  codesPostaux: Array<string>;
  nom: string;
  population: number;
  siren: string;
}

export interface IWeatherResponse {
  main: IWeather;
}

export interface IWeather {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_min: number;
  temp_max: number;
}
