import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  id: null,
}

const selectedItemSlice = createSlice({
  name: "selectedItem",
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.id = action.payload.id
    },
    clearSelectedItem: (state) => {
      state.id = null
    },
  },
})

export const { setSelectedItem, clearSelectedItem } = selectedItemSlice.actions
export default selectedItemSlice.reducer
