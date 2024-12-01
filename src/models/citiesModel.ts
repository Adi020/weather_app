export interface LocalNames {
  pl: String;
}

export interface City {
  country: String;
  lat: Number;
  lon: Number;
  name: String;
  state: String;
  local_names: LocalNames;
}

export type CitiesResponse = City[];
