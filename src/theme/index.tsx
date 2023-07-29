import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { PropsWithChildren } from "react";
export const AppThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#F4442E",
      },
      secondary: {
        main: "#FC9E4F",
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
      },
    },
  });
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};
