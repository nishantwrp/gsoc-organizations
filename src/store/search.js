import { createSlice } from "@reduxjs/toolkit"

const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: "",
  },
  reducers: {
    setSearch: (state, action) => {
      state.value = action.payload
    },
  },
})

export const getSearch = state => {
  return state.search.value
}

export const {
  reducer,
  actions: { setSearch },
} = searchSlice
