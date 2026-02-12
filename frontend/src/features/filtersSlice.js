import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  category: null,
  type: null,
  location: null,
}

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    },

    resetFilters: () => {
      return initialState
    },
  },
})

export const { setFilters, resetFilters } = filtersSlice.actions
export default filtersSlice.reducer
