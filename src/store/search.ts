import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  getSearchParam,
  removeSearchParam,
  setSearchParams,
} from "../utils/searchParams"
import { urlChanged } from "./actions"

//Defince the shape of the search state
interface SearchState {
  value: string
}
// Utility function to update the search query in the URL
const updateSearchInUrl = (query: string): void => {
  if (query) {
    setSearchParams({
      search: query,
    })
  } else {
    removeSearchParam("search")
  }
}

//Initialize state for the search slice
const initialState: SearchState = {
  value: getSearchParam("search") || "",
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    //Reducer to set the seacrh value in the state
    setSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload
      updateSearchInUrl(action.payload)
    },
  },
  extraReducers: builder => {
    //Handle URL changes
    builder.addCase(
      urlChanged,
      (state, action: PayloadAction<{ search: string }>) => {
        const { search } = action.payload
        return {
          value: search,
        }
      }
    )
  },
})
// Selector to get the search value from the state
export const getSearch = (state: { search: SearchState }): string => {
  return state.search.value
}

export const {
  reducer,
  actions: { setSearch },
} = searchSlice
