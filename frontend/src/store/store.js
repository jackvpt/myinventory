import { configureStore } from "@reduxjs/toolkit"
import selectedItemReducer from "../features/selectedItemSlice"

export const store = configureStore({
  reducer: {
    selectedItem: selectedItemReducer,
  },
})
