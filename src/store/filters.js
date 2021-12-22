import { createSlice } from "@reduxjs/toolkit"

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    value: 0,
  },
  reducers: {
    incremented: state => {
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    },
  },
})

export const {
  reducer,
  actions: { incremented, decremented },
} = filtersSlice
