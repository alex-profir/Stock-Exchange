import { Box, CircularProgress, Typography } from "@mui/material";
import { getDataSetsForWIKI, getTimeSeriesData } from "../services/timeSeries";
import { ChartDisplay } from "../components/ChartDisplay";
import { AsyncAutocomplete } from "../components/AsyncAutocomplete";
import { useFetchData } from "../hooks/useFetchData";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Dataset } from "../models/Datasets";

async function sortedDatasets() {
  const datasets = await getDataSetsForWIKI();
  return datasets.sort((a, b) => a.dataset_code.localeCompare(b.database_code));
}

export function StockExchange() {
  const [selectedOption, setSelectedOption] = useLocalStorage<
    Dataset | undefined
  >("selectedOption");

  const {
    data: timeSeries,
    isLoading,
    error,
  } = useFetchData(async () => {
    if (selectedOption) {
      return getTimeSeriesData(selectedOption.dataset_code, {
        order: "asc",
        database_code: "WIKI",
      });
    }
    return;
  }, [selectedOption]);

  if (!timeSeries && selectedOption) {
    return <CircularProgress color="inherit" size={20} />;
  }

  return (
    <Box className="fullWidth">
      <AsyncAutocomplete
        label="Company"
        sx={{
          width: 300,
        }}
        disabled={isLoading}
        onChange={(_, value) => {
          setSelectedOption(value);
        }}
        value={selectedOption}
        fetcher={sortedDatasets}
        equalityCheck={(a, b) => a.id === b.id}
        renderItem={(dataset) => dataset.dataset_code}
      />
      {selectedOption ? (
        <Box my={2}>
          {error ? (
            <Box>
              <Typography>
                Oops, there are some issues processing this dataset
              </Typography>
            </Box>
          ) : (
            <ChartDisplay dataset={timeSeries.dataset_data} />
          )}
        </Box>
      ) : (
        <Box>
          <Typography>Select a company to display the chart</Typography>
        </Box>
      )}
    </Box>
  );
}
