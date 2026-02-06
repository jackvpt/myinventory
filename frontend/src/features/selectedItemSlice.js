import { createSlice } from "@reduxjs/toolkit"

export const initialState = null

const selectedItemSlice = createSlice({
  name: "selectedItem",
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      return action.payload
    },
    clearSelectedItem: () => {
      return null
    },
  },
})

export const { setSelectedItem, clearSelectedItem } = selectedItemSlice.actions
export default selectedItemSlice.reducer
