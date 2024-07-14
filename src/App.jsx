import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Weather from "./components/Weather";
import Loader from "./components/Loader";
import bgImages from "./components/bgImages";
import Header from "./components/Header";
import { axiosWeather } from "./utils/ConfigAxios";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [cityName, setCityName] = useState('')
  const [citiesInfo, setCitiesInfo] = useState([])
  const [isShowModal, setIsShowModal] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false)

  const controller = new AbortController();

  // funcion para ocultar el modal
  const handleClickHiddenModal = () => {
    setIsShowModal(false)
  }

  // Función para manejar la obtención de la ubicación actual y la información del clima
  const fetchWeather = (lat, lon) => {
    const URLWeater = `data/2.5/weather?lat=${lat}&lon=${lon}`;
    axiosWeather.get(URLWeater)
      .then(({ data }) => setWeatherInfo(data))
      .catch((err) => console.error(err));
  };

  //función para manejar la obtencion de las ciudades
  const fetchCities = async (fun) => {
    setLoadingCities(true)
    const URLCity = `geo/1.0/direct?q=${cityName}&limit=5`;
    try {
      const { data } = await axiosWeather.get(URLCity, { signal: controller.signal, })
      setCitiesInfo(data)
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.log(error)
      };
    } finally {
      setLoadingCities(false)
    }
  }

  // Función de éxito para obtener la posición actual
  const success = (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    fetchWeather(lat, lon);
  };

  // ocultar el modal
  const hiddenModal = () => {
    setIsShowModal(false)
  }

  // Efecto para obtener la ubicación actual al montar el componente
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  // Efecto para obtener las ciudades por cambio de nombre
  useEffect(() => {
    if (cityName) {
      fetchCities()
    } else {
      setCitiesInfo([])
    }
  }, [cityName])


  return (
    <>
      <main
        className={`${weatherInfo ? bgImages[weatherInfo?.weather[0].icon] : "n9"
          } px-5 color bg-cover relative color min-h-screen text-white grid grid-cols-[1fr_minmax(auto,_400px)_1fr] 
          grid-rows-[1fr_auto_0.7fr] max-[640px]:grid-cols-[minmax(auto,_400px)] max-[640px]:items-center
          place-content-center max-[640px]:grid-rows-[auto_auto_1fr] font-principal-font`}
      >

        <h1 className="py-4 font-semibold text-xl">Weater App</h1>
        <Header
          cityName={cityName}
          setCityName={setCityName}
          citiesInfo={citiesInfo}
          fetchWeather={fetchWeather}
          setIsShowModal={setIsShowModal}
          isShowModal={isShowModal}
          loadingCities={loadingCities}
          hiddenModal={hiddenModal}
          controller={controller} />

        {weatherInfo ? <Weather weatherInfo={weatherInfo} /> : <Loader />}

        {isShowModal && <div onClick={handleClickHiddenModal} className='fixed top-0 left-0 right-0 bottom-0
         bg-slate-800/80 z-10'></div>}

      </main>
    </>
  );
}

export default App;
