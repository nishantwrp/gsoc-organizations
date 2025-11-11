import { createSlice } from "@reduxjs/toolkit"
import {
  getSearchParam,
  removeSearchParam,
  setSearchParams,
} from "../utils/searchParams"
import { urlChanged } from "./actions"

const FILTERS = ["years", "categories", "technologies", "topics", "shortcuts"]

const updateFiltersInUrl = filters => {
  if (Object.values(filters).filter(arr => arr.length !== 0).length === 0) {
    removeSearchParam("filters")
  } else {
    setSearchParams({
      filters: JSON.stringify(filters),
    })
  }
}

const ensureAllFilters = o => {
  for (const filter of FILTERS) {
    o[filter] = o[filter] || []
  }
}

export const getFiltersFromSearchUrl = () => {
  const filters = JSON.parse(getSearchParam("filters")) || {}
  ensureAllFilters(filters)
  return filters
}

const filtersSlice = createSlice({
  name: "filters",
  initialState: () => ({
    ...getFiltersFromSearchUrl(),
    sortBy: getSearchParam("sort") || "",
  }),
  reducers: {
    addFilter: (state, action) => {
      const { name, val } = action.payload
      state[name] = [...state[name], val]
      updateFiltersInUrl(state)
    },
    removeFilter: (state, action) => {
      const { name, val } = action.payload
      state[name] = state[name].filter(v => v !== val)
      updateFiltersInUrl(state)
    },
    setFilters: (state, action) => {
      for (const filter of FILTERS) {
        state[filter] = action.payload[filter] || []
      }
      updateFiltersInUrl(state)
    },
    clearFilters: state => {
      for (const filter of FILTERS) {
        state[filter] = []
      }
      updateFiltersInUrl(state)
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
      if (action.payload) {
        setSearchParams({ sort: action.payload })
      } else {
        removeSearchParam("sort")
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(urlChanged, (state, action) => {
      const { filters } = action.payload
      ensureAllFilters(filters)
      const newSortBy = getSearchParam("sort") || ""

      for (const filter of FILTERS) {
        state[filter] = filters[filter] || []
      }
      state.sortBy = newSortBy
    })
  },
})

export const getFilters = state => {
  return state.filters
}

export const {
  reducer,
  actions: { addFilter, removeFilter, setFilters, clearFilters, setSortBy },
} = filtersSlice
