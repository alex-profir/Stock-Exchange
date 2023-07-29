import {
  Autocomplete,
  CircularProgress,
  TextField,
  AutocompleteProps,
} from "@mui/material";
import { useFetchData } from "../hooks/useFetchData";
import { useState } from "react";

export type AsyncAutocompleteProps<T> = Omit<
  AutocompleteProps<
    T,
    false, // multiple
    true, // disable clearable
    false // free solo
  >,
  "options" | "renderInput"
> & {
  label: string;
  fetcher: () => Promise<T[]>;
  equalityCheck: (a: T, b: T) => boolean;
  renderItem: (item: T) => string;
};
export function AsyncAutocomplete<T>({
  fetcher,
  label,
  equalityCheck,
  renderItem,
  ...autocompleteProps
}: AsyncAutocompleteProps<T>) {
  const {
    data: options,
    isLoading,
    error,
  } = useFetchData(fetcher, [], {
    initialData: [],
  });
  if (error) {
    // if we have an error, pass it upward
    throw error;
  }
  const [open, setOpen] = useState(false);
  return (
    <Autocomplete
      {...autocompleteProps}
      disableClearable
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={equalityCheck}
      getOptionLabel={renderItem}
      options={options}
      loading={isLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
