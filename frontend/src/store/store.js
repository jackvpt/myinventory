import { configureStore } from "@reduxjs/toolkit"
import selectedItemReducer from "../features/selectedItemSlice"

export const store = configureStore({
  reducer: {
    selectedItem: selectedItemReducer,
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
