import { ChangeEvent, FocusEventHandler, FormEvent, useEffect, useRef, useState } from 'react';
import { getCitiesInfo } from '../services';
import { useApi } from '../hooks/useApi';
import { Modal } from './';
import CitiesList from './CitiesList';
import { City, FetchExtraCallback, WeatherParams, WeatherResponse } from '../models';
import useModalState from '../hooks/useModalState';

interface Props {
  weatherFetch: (
    ...props: FetchExtraCallback<WeatherResponse, WeatherParams>
  ) => (reason?: any) => void;
}

type HeaderForm = HTMLFormElement & { search: HTMLInputElement };
type InputEvent = ChangeEvent<HTMLInputElement>;

export const Header = ({ weatherFetch }: Props) => {
  const [cityValue, setCityValue] = useState('');
  const [[cities, loadingCities], [fetchCities, setCities]] = useApi(getCitiesInfo);
  const { closeModal, openModal } = useModalState();

  const inputRef = useRef<HTMLInputElement>(null);
  const headerModalClass = 'header__modal-active';

  const handleChangeInput = (e: InputEvent) => {
    const city = e.target.value;
    setCityValue(city);
    if (!city) {
      fetchCities()();
      setCities();
    }
  };

  const handleInputFocus: FocusEventHandler<HTMLInputElement> = () => {
    openModal(headerModalClass);
  };

  const handleClickCity = (city: City) => {
    weatherFetch({ lat: +city.lat, lon: +city.lon });
    closeModal();
  };

  const handleSubmit = (e: FormEvent<HeaderForm>): void => {
    e.preventDefault();
    const searchValue = e.currentTarget.search.value;
    fetchCities(searchValue, 5, (data) => {
      const [city] = data;
      weatherFetch({ lat: +city.lat, lon: +city.lon });
      setCities(data);
    });
    closeModal();
    inputRef.current?.blur();
  };

  useEffect(() => {
    if (cityValue) {
      fetchCities(cityValue, 10);
    }
  }, [cityValue]);

  return (
    <header className="font-semibold relative text-xl top-4 flex flex-col gap-2 justify-center items-center">
      <h1 className="min-[800px]:absolute min-[800px]:left-2 min-[800px]:top-1/2 min-[800px]:-translate-y-1/2">
        Weather App
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-primary h-10 p-[.1em] z-30 rounded-3xl flex flex-row-reverse w-[min(100%,_500px)] place-self-center"
      >
        <input
          id="search"
          className="bg-[#03cdff] px-[.5em] z-30 outline-none placeholder-white rounded-3xl w-full h-full"
          type="text"
          placeholder="Search"
          value={cityValue}
          onChange={handleChangeInput}
          onFocus={handleInputFocus}
          ref={inputRef}
          autoComplete="off"
        />
        <button disabled={loadingCities} className=" h-full aspect-square">
          <i className="bx bx-search-alt"></i>
        </button>
      </form>

      <Modal modalClass={headerModalClass}>
        {loadingCities ? (
          <CitiesList>loading...</CitiesList>
        ) : (
          <CitiesList cities={cities} cityClick={handleClickCity} />
        )}
      </Modal>
    </header>
  );
};
