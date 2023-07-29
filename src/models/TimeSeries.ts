export type TimesSeriesResponse = {
  dataset_data: {
    collapse?: string | null;
    column_index?: string | null;
    //
    column_names: Array<string>;
    data: Array<Array<string | number>>;
    end_date: string;
    frequency: "daily";

    limit?: number | null;
    order?: number | null;

    start_date: string;

    transform?: string | null;
  };
};

export type TimeSeriesDataset = {
  Date: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
  "Ex-Dividend": number;
  "Split Ratio": number;
  "Adj. Open": number;
  "Adj. High": number;
  "Adj. Low": number;
  "Adj. Close": number;
  "Adj. Volume": number;
};
