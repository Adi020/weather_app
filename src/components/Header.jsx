import CitiesList from "./cities/CitiesList"

const Header = ({
  handleSubmit,
  cityName,
  setCityName,
  citiesInfo,
  fetchWeather,
  setIsShowModal,
  isShowModal,
  loadingCities
}) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value
    setCityName(inputValue)
  }

  const showModal = () => {
    setIsShowModal(true)
  }

  const hiddenModal = () => {
    setIsShowModal(false)
  }

  return (
    <header className='z-20 min-[640px]:pt-4 grid grid-rows-[max-content]'>
      <div className="relative">
        <form onSubmit={handleSubmit}>
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