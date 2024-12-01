import { useState } from 'react';
import { WeatherResponse } from '../models';
import { kelvinToCelcius, kelvinToFahrenheit } from '../utils';
import './css/Weather.css';

interface Props {
  weatherInfo: WeatherResponse | null;
}

export const Weather = ({ weatherInfo }: Props) => {
  if (!weatherInfo) return null;

  const [isCelcius, setisCelcius] = useState<Boolean>(false);
  const handleChangeCelcius = () => {
    setisCelcius(!isCelcius);
  };
  return (
    <section className="flex justify-center ">
      <article className="w-[min(100%,_500px)] flex flex-col gap-[1.5em] text-[1.2rem]">
        <div
          className="after:content-['']  p-[.5em] grid  grid-cols-[1fr,_1fr] grid-rows-[auto,_auto,_auto,_auto] z-10 after:-z-[1] before:-z-[1]  weather__container relative after:bg-primary
         after:w-full after:h-2/3 after:absolute after:rounded-3xl after:top-0 after:left-0
         before:content-[''] before:bg-primary before:absolute before:w-full before:h-2/3 before:rounded-b-3xl before:bottom-0 before:left-0 before:border-b-[.3em] before:border-midnight"
        >
          <h2 className="pl-[.5em] font-bold row-start-4 capitalize col-start-1 text-[1.25em] place-content-end">
            {weatherInfo.name}, {weatherInfo.sys.country}
          </h2>

          <h3 className="pr-[.5em] capitalize row-start-4 col-start-2 text-[1em] place-content-end text-end">
            {weatherInfo.weather[0].description}
          </h3>

          <span className="col-start-1 text-[3em]">
            {isCelcius
              ? kelvinToCelcius(weatherInfo.main.temp)
              : kelvinToFahrenheit(weatherInfo.main.temp)}
          </span>

          <div className={`absolute -top-[5.5em] -right-[2em] `}>
            <img
              className="h-[17em] "
              src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@4x.png`}
              alt="current weather image"
            />
          </div>

          <div className="col-span-2 row-start-3 flex justify-evenly flex-wrap gap-[1rem] ">
            <span>Lat: {weatherInfo.coord.lat}</span>
            <span>Lon: {weatherInfo.coord.lon}</span>
          </div>

          <ul className="col-start-1 row-start-2">
            <li className="weather__info">
              <i className="bx bx-wind"></i>
              <span>{weatherInfo.wind.speed}m/s</span>
            </li>
            <li className="weather__info">
              <i className="bx bx-cloud-drizzle"></i>
              <span>{weatherInfo.main.humidity}%</span>
            </li>
            <li className="weather__info">
              <i className="bx bx-trending-down bx-flip-horizontal"></i>
              <span>{weatherInfo.main.pressure}hPa</span>
            </li>
          </ul>
        </div>

        <button
          className="px-[2.5em] mx-auto weather__btn font-semibold py-[.3em] max-w-[250px] rounded-3xl bg-midnight-blue"
          onClick={handleChangeCelcius}
        >
          Change to F / C
        </button>
      </article>
    </section>
  );
};
