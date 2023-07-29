import axios, { AxiosResponse } from "axios";

export const nasdaqApi = axios.create({
  baseURL: import.meta.env.VITE_NASDAQ_API_URL,
});

export async function wrapAxiosCall<T>(promise: Promise<AxiosResponse<T>>) {
  const response = await promise;
  return response.data as T;
}
