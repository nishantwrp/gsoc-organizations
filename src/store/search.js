import { createSlice } from "@reduxjs/toolkit"
import {
  getSearchParam,
  removeSearchParam,
  setSearchParams,
} from "../utils/searchParams"
import { urlChanged } from "./actions"

const updateSearchInUrl = query => {
  if (query) {
    setSearchParams({
      search: query,
    })
  } else {
    removeSearchParam("search")
  }
}

const searchSlice = createSlice({
  name: "search",
  initialState: () => {
    return {
      value: getSearchParam("search") || "",
    }
  },
  reducers: {
    setSearch: (state, action) => {
      state.value = action.payload
      updateSearchInUrl(action.payload)
    },
  },
  extraReducers: builder => {
    builder.addCase(urlChanged, (state, action) => {
      const { search } = action.payload
      return {
        value: search,
      }
    })
  },
})

export const getSearch = state => {
  return state.search.value
}

export const {
  reducer,
  actions: { setSearch },
} = searchSlice
