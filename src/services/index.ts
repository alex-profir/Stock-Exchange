import axios, { AxiosResponse } from "axios";

export const nasdaqApi = axios.create({
  baseURL: "https://www.quandl.com/api/v3/",
});

export async function wrapAxiosCall<T>(promise: Promise<AxiosResponse<T>>) {
  const response = await promise;
  return response.data as T;
}
