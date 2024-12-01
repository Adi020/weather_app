import { AxiosResponse } from 'axios';

export interface UseApiCall<T> {
  call: Promise<AxiosResponse<T>>;
  controller: AbortController;
}

export type CallbackFetch<T> = (data: T) => void;
export type FetchExtraCallback<T, P extends any[]> = [...P, callback?: CallbackFetch<T>] | P;
