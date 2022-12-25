import { createSlice } from "@reduxjs/toolkit"
import { getSearchParam } from "../utils/searchParams"

const searchSlice = createSlice({
  name: "search",
  initialState: () => {
    return {
      value: getSearchParam("search") || ""
    }
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
