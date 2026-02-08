import { BrowserRouter } from "react-router-dom"
import Router from "./router/Router"

// React Query hooks
import { useItems } from "./hooks/useItems"
import { useCategories } from "./hooks/useCategories"
import { useLocations } from "./hooks/useLocations"

// MUI imports
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
} from "@mui/material"
import { useTypes } from "./hooks/useTypes"
import { Provider } from "react-redux"
import { store } from "./store/store"

// === Creation of the dark theme ===
const darkTheme = createTheme({
  palette: {
    mode: "dark", // enable dark mode
   
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
  },
})

function App() {
  // Fetch core application data on app startup
  const items = useItems()
  const categories = useCategories()
  const types = useTypes()
  const locations = useLocations()

  // Show a global loading state until all required data is loaded
  if (
    items.isLoading ||
    categories.isLoading ||
    types.isLoading ||
    locations.isLoading
  ) {
    return <p>Loading application…</p>
  }

  // Handle a global error state
  if (
    items.isError ||
    categories.isError ||
    types.isError ||
    locations.isError
  ) {
    return (
      <p>
        Error loading data:{" "}
        {items.error?.message ||
          categories.error?.message ||
          types.error?.message ||
          locations.error?.message}
      </p>
    )
  }

  // Once data is ready, render the router
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />{" "}
        {/* Apply the background and text colors of the dark theme */}
        {/* Global style to hide number input spin buttons */}
        <GlobalStyles
          styles={{
            "input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button":
              {
                WebkitAppearance: "none",
                margin: 0,
              },
            "input[type=number]": {
              MozAppearance: "textfield",
            },
          }}
        />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}

export default App
