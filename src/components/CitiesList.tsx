import { ReactNode } from 'react';
import { CitiesResponse, City as CityType } from '../models';
import { City } from './';

interface Props {
  cities?: CitiesResponse | null;
  children?: ReactNode;
  cityClick?: (city: CityType) => void;
}

const CitiesList = ({ cities, children, cityClick }: Props) => {
  if ((!cities?.length && !children) || !cityClick) return null;

  return (
    <ul>
      {cities?.map((city) => (
        <li onClick={() => cityClick(city)}>
          <City key={`${city.lat}`} city={city} />
        </li>
      ))}
      {children}
    </ul>
  );
};

export default CitiesList;
