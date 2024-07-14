import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const axiosWeather = axios.create({
  baseURL: "https://api.openweathermap.org/",
  params: {
    appid: API_KEY,
  },
});