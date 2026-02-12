import { configureStore } from "@reduxjs/toolkit"
import selectedItemReducer from "../features/selectedItemSlice"
import filtersItemReducer from "../features/filtersSlice"


export const store = configureStore({
  reducer: {
    selectedItem: selectedItemReducer,
    filters: filtersItemReducer,
  },
  
  // To avoid Serialization errors with Date objects in selectedItem
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["selectedItem/setSelectedItem"],
        ignoredPaths: ["selectedItem.createdAt", "selectedItem.updatedAt"],
      },
    }),
  })
  
