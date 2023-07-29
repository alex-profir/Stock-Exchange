import { nasdaqApi, wrapAxiosCall } from ".";
import { Dataset } from "../models/Datasets";
import { TimesSeriesResponse } from "../models/TimeSeries";

export type TimeSeriesParams = {
  database_code: string;
  dataset_code?: string;
  limit?: number;
  column_index?: number;
  start_date?: string;
  end_date?: string;
  order?: "asc" | "desc";
  collapse?: "none" | "daily" | "weekly" | "monthly" | "quarterly" | "annual";
};

// TODO handle multiple datasets
const defaultDataset = "WIKI";
const defaultOptions: TimeSeriesParams = { database_code: defaultDataset };

export function getTimeSeriesData(
  dataset: string,
  options: TimeSeriesParams = defaultOptions
) {
  return wrapAxiosCall<TimesSeriesResponse>(
    nasdaqApi.get(`/datasets/${options.database_code}/${dataset}/data.json`, {
      params: options,
    })
  );
}

export async function getDataSetsForWIKI(
  options: TimeSeriesParams = defaultOptions
) {
  const { datasets } = await wrapAxiosCall<{
    datasets: Dataset[];
  }>(
    nasdaqApi.get("/datasets.json", {
      params: options,
    })
  );
  return datasets;
}
