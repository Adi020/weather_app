import { useEffect } from 'react';
import { getWeatherInfo } from './services';
import { useApi } from './hooks/useApi';
import { Header, Weather, Footer, Loader } from './components';
import { bgImages } from './utils/bgImages';
import ModalLayout from './components/ModalLayout';

function App() {
  const {
    data: weatherInfo,
    fetch: weatherFetch,
    loading: weatherLoading,
  } = useApi(getWeatherInfo);

  const success: PositionCallback = (position) => {
    const { latitude: lat, longitude: lon } = position.coords;
    weatherFetch({ lat, lon });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  return (
    <div
      className={`${weatherInfo ? bgImages[weatherInfo?.weather[0].icon] : 'n3'} text-white 
      px-3 bg-cover flex flex-col justify-between min-h-screen overflow-hidden`}
    >
      <Header weatherFetch={weatherFetch} />
      <Weather weatherInfo={weatherInfo} />
      {weatherLoading
        ? null
        : !weatherInfo && (
            <ModalLayout modalClass="weather__modal">
              <Loader />
            </ModalLayout>
          )}
      <Footer />
    </div>
  );
}

export default App;
