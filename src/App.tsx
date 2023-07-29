import "./App.css";
import { AppThemeProvider } from "./theme";
import { AppLayout } from "./layouts/AppLayout";
import { StockExchange } from "./pages/StockExchange";
import { useRequestInterceptors } from "./hooks/useRequestInterceptors";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ErrorPage } from "./pages/ErrorPage";

function App() {
  useRequestInterceptors();
  return (
    <AppThemeProvider>
      <ErrorBoundary fallback={<ErrorPage />}>
        <AppLayout>
          <StockExchange />
        </AppLayout>
      </ErrorBoundary>
    </AppThemeProvider>
  );
}

export default App;
