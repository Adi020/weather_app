import { CitiesParams, CitiesResponse, GetInfo, WeatherParams, WeatherResponse } from '../models';
import { axiosWeather, loadAbort } from '../utils';

export const getWeatherInfo: GetInfo<WeatherResponse, WeatherParams> = (param) => {
  const { lat, lon } = param;
  const controller = loadAbort();

  return {
    call: axiosWeather.get<WeatherResponse>(`data/2.5/weather?lat=${lat}&lon=${lon}`, {
      signal: controller.signal,
    }),
    controller,
  };
};

export const getCitiesInfo: GetInfo<CitiesResponse, CitiesParams> = (cityData, limit) => {
  const controller = loadAbort();
  return {
    call: axiosWeather.get<CitiesResponse>(`geo/1.0/direct?q=${cityData}&limit=${limit}`, {
      signal: controller.signal,
    }),
    controller,
  };
};
