import { City as CityType } from '../models';

interface Props {
  city: CityType;
}

export const City = ({ city }: Props) => {
  return (
    <div className="grid grid-cols-[1fr,_5em] cursor-pointer p-[.2em] hover:bg-[#03cdff] items-center">
      <span className="row-span-2">
        {city.name}, {city.state}
      </span>
      <span className="truncate text-[.7em]">{`Lat: ${city.lat}`}</span>
      <span className="col-start-2 text-[.7em] truncate">{`Lon: ${city.lon}`}</span>
    </div>
  );
};
