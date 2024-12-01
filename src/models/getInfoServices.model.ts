import { UseApiCall } from './useApiModel';
import { Coord } from './WeatherModels';

export type GetInfo<T, P extends any[]> = (...params: P) => UseApiCall<T>;

export type WeatherParams = [Coord];
export type CitiesParams = [cityData?: string, Limit?: number];
