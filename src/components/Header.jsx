import CitiesList from "./cities/CitiesList"
import React, { useRef } from 'react';


const Header = ({
  cityName,
  setCityName,
  citiesInfo,
  fetchWeather,
  setIsShowModal,
  isShowModal,
  loadingCities,
  hiddenModal,
  fetchCities
}) => {
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    setCityName(inputValue)
  }

  const showModal = () => {
    setIsShowModal(true)
  }

  // Manejador para el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formRef.current) {
      const elements = formRef.current.elements;
      for (let i = 0; i < elements.length; i++) {
        elements[i].blur();
      }
    }
    const city = e.target.cityName.value;
    setCityName(city)

    if (cityName) {
      const submitCity = () => {
        const { lat, lon } = citiesInfo[0]
        console.log(citiesInfo)
        fetchWeather(lat, lon)
      }
      fetchCities(submitCity)
    }
    hiddenModal()
  };

  return (
    <header className='z-20 min-[640px]:pt-4 grid grid-rows-[max-content]'>
      <div className="relative">
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="flex p-[2px] justify-center items-center bg-[#53a8ca] rounded-3xl h-10">
            <button className="w-9 flex justify-center"><i className="bx bx-search text-xl"></i></button>
            <input onFocus={showModal} value={cityName}
              onChange={handleInputChange} className="w-full h-full rounded-full text-xl grid text-white 
            placeholder-white bg-[#03cdff] px-2 outline-none" type="text" placeholder="search" id="cityName" />
          </div>
        </form>

        <CitiesList
          citiesInfo={citiesInfo}
          fetchWeather={fetchWeather}
          cityName={cityName}
          isShowModal={isShowModal}
          hiddenModal={hiddenModal}
          loadingCities={loadingCities} />
      </div>
    </header>
  )
}

export default Header
