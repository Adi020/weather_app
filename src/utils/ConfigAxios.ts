import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const baseURL = "https://api.openweathermap.org/";

export const axiosWeather = axios.create({
  baseURL,
  params: {
    appid: API_KEY,
  },
});
