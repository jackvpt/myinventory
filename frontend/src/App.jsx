import { BrowserRouter } from "react-router-dom"
import Router from "./router/Router"

// React Query hooks
import { useItems } from "./hooks/useItems"
import { useCategories } from "./hooks/useCategories"
import { useLocations } from "./hooks/useLocations"

function App() {
  // Fetch core application data on app startup
  const items = useItems()
  const categories = useCategories()
  const locations = useLocations()

  // Show a global loading state until all required data is loaded
  if (items.isLoading || categories.isLoading || locations.isLoading) {
    return <p>Loading application…</p>
  }

  // Handle a global error state
  if (items.isError || categories.isError || locations.isError) {
    return (
      <p>
        Error loading data:
        {items.error?.message || categories.error?.message}
      </p>
    )
  }

  // Once data is ready, render the router
  return (
    <BrowserRouter>
      {/* Main router handling all application routes */}
      <Router />
    </BrowserRouter>
  )
}

export default App
