import { useLayoutEffect } from "react";
import { nasdaqApi } from "../services";

export function useRequestInterceptors() {
  useLayoutEffect(() => {
    const accesTokenInterceptor = nasdaqApi.interceptors.request.use(
      async (request) => {
        const apiKey = import.meta.env.VITE_NASDAQ_API_KEY;
        if (apiKey) {
          request.params["api_key"] = apiKey;
        }
        return request;
      }
    );
    return () => {
      nasdaqApi.interceptors.request.eject(accesTokenInterceptor);
    };
  }, []);
}
