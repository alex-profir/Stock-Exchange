import {
  CartesianGrid,
  Line,
  LineChart,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { TimeSeriesDataset, TimesSeriesResponse } from "../models/TimeSeries";
import { useMemo } from "react";
import { useTheme } from "@mui/material";

export type ChartDisplayProps = {
  dataset: TimesSeriesResponse["dataset_data"];
};

const TooltipText = ({
  active,
  payload,
}: TooltipProps<string | number, string>) => {
  if (active && payload && payload.length) {
    const values = payload[0].payload as TimeSeriesDataset;

    if (!values) {
      throw new Error("Tooltip doesn't have values!");
    }

    const displayDate = new Date(values?.Date).toLocaleDateString("en-gb", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <div className="custom-tooltip">
        <p className="label">{`${values.Close} USD  ${displayDate}`}</p>
        {/* <p className="intro">{getIntroOfPage(label)}</p> */}
      </div>
    );
  }
};

export function ChartDisplay({ dataset }: ChartDisplayProps) {
  const theme = useTheme();
  const MappedData = useMemo(() => {
    const ParsedData = dataset.data.map((element) => {
      const objectRepresenation = Object.fromEntries(
        element.map((dataPoint, index) => [
          dataset.column_names[index],
          dataPoint,
        ])
      ) as TimeSeriesDataset;
      return objectRepresenation;
    });
    return ParsedData;
  }, [dataset]);

  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <LineChart data={MappedData}>
        <Line
          dot={false}
          type="linear"
          dataKey="Close"
          stroke={theme.palette.primary.main}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis dataKey="Close" />
        <Tooltip content={TooltipText} />
      </LineChart>
    </ResponsiveContainer>
  );
}
