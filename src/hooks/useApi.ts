import { useCallback, useEffect, useState } from 'react';
import { CallbackFetch, FetchExtraCallback, GetInfo } from '../models';

type Data<T> = T | null;
type CustomError = Error | null;
type IsLoad = boolean;

type UseApiResult<T, P extends any[]> = [
  [data: Data<T>, loading: IsLoad, error: CustomError],
  [
    fetch: (...props: FetchExtraCallback<T, P>) => (reason?: any) => void,
    setDataState: (param?: Data<T>) => void
  ]
];

type UseApiOptions<T, P> = {
  defaultValue?: T;
  params?: P;
};

export const useApi = <T, P extends any[]>(
  fnPromise: GetInfo<T, P>,
  options?: UseApiOptions<T, P>
): UseApiResult<T, P> => {
  const dataDefaultValue = options?.defaultValue || null;
  const [data, setData] = useState<Data<T>>(dataDefaultValue as T);
  const [loading, setLoading] = useState<IsLoad>(false);
  const [error, setError] = useState<CustomError>(null);
  const [_, setFetchPromises] = useState<AbortController[]>([]);

  const setDataState = (newData: Data<T> = dataDefaultValue): void => {
    setData(newData);
  };

  const fetch = useCallback(
    (...props: FetchExtraCallback<T, P>) => {
      let callback: CallbackFetch<T>;
      if (props.length > fnPromise.length) {
        callback = props.splice(props.length - 1)[0];
      }
      const { call, controller } = fnPromise(...(props as P));
      setLoading(true);
      setFetchPromises((controllers) => {
        if (controllers.length) controllers[0].abort();
        return [controller];
      });
      call
        .then((response) => {
          if (callback) return callback(response.data);
          setData(response.data);
        })
        .catch((err) => setError(err as Error))
        .finally(() => {
          setLoading(false);
          setFetchPromises((controllers) =>
            controllers.filter((control) => control !== controller)
          );
        });

      return () => controller.abort();
    },
    [fnPromise]
  );

  useEffect(() => {
    if (options?.params) {
      fetch(...options.params);
    }
  }, [fetch, options?.params]);
  return [
    [data, loading, error],
    [fetch, setDataState],
  ];
};
