import LoaderWeather from "../LoaderWeather"

const City = ({ city, fetchWeather, hiddenModal }) => {

  const handleClickCity = () => {
    const lat = city.lat
    const lon = city.lon
    fetchWeather(lat, lon)
    hiddenModal()
  }

  return (
    <article onClick={handleClickCity} className="bg-[#05283d] gap-2 hover:bg-[#0e334d] p-1 rounded-md border-gray-600 border cursor-pointer
    grid grid-cols-[1fr_1fr]">
      <h2 className="font-bold col-span-2 place-content-center line-through text-lg">{city.name}, {city.state}, {city.country}</h2>
      <div className="flex gap-2 overflow-hidden">
        <span className="font-bold">Lat:</span>
        <span className="truncate">{city.lat}</span>
      </div>
      <div className="flex gap-2 overflow-hidden">
        <span className="font-bold">Lon:</span>
        <span className="truncate">{city.lon}</span>
      </div>
    </article>
  )
}

export default City
