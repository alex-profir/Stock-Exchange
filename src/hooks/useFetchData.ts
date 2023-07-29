import { isFunction } from "../utils";
import { useEffectAsync } from "./useEffectAsync";
import { useMountedRef } from "./useMountedRef";
import { usePartialState } from "./usePartialState";

export type UseFetchDataConfig<TData, TError = unknown> = {
  enabled?: boolean;
  initialData?: TData | (() => TData);
  onSuccess?: (data: TData | undefined) => void;
  onError?: (err: TError, data?: TData) => void;
};

const defaultConfig: UseFetchDataConfig<any> = {
  enabled: true,
};

export function useFetchData<TData = unknown, TError = unknown>(
  fetcher: () => Promise<TData | undefined>,
  deps: any[] = [],
  config: UseFetchDataConfig<TData, TError> = defaultConfig
) {
  config = {
    ...defaultConfig,
    ...config,
  };

  type FetchState = {
    data: TData;
    error: TError | undefined;
    isLoading: boolean;
  };

  const [state, setState] = usePartialState<FetchState>({
    data: config.initialData
      ? isFunction(config.initialData)
        ? config.initialData()
        : config.initialData
      : undefined!,
    error: undefined,
    isLoading: false,
  });

  function setData(data: TData) {
    setState({ data });
  }

  const mountedRef = useMountedRef();
  const refetch = async () => {
    if (!mountedRef.current || state.isLoading) {
      return;
    }
    setState({ isLoading: true, error: undefined });
    let data: TData | undefined = state.data;
    let error = state.error;
    try {
      data = await fetcher();
      if (mountedRef.current) {
        config.onSuccess && config.onSuccess(data);
      }
    } catch (e: any) {
      if (mountedRef.current) {
        config.onError && config.onError(e, data);
        error = e;
      }
    } finally {
      if (mountedRef.current) {
        setState({ isLoading: false, data, error });
      }
    }
    return data;
  };

  useEffectAsync(async () => {
    if (config.enabled) {
      await refetch();
    }
  }, [...deps, config.enabled]);

  return {
    refetch,
    ...state,
    setData,
  };
}
