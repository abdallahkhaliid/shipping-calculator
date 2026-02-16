// src/App.tsx
import { lazy, Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CircularProgress, Box } from "@mui/material";
import { theme } from "./theme";
import { QuoteProvider } from "./context/QuoteProvider";

const MainLayout = lazy(() => import("./components/MainLayout"));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QuoteProvider>
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                bgcolor: "background.default",
              }}
            >
              <CircularProgress size={60} />
            </Box>
          }
        >
          <MainLayout />
        </Suspense>
      </QuoteProvider>
    </ThemeProvider>
  );
}

export default App;
