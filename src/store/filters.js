import { createSlice } from "@reduxjs/toolkit"
import {
  getSearchParam,
  removeSearchParam,
  setSearchParams,
} from "../utils/searchParams"
import { urlChanged } from "./actions"

const updateFiltersInUrl = filters => {
  if (Object.values(filters).filter(arr => arr.length !== 0).length === 0) {
    removeSearchParam("filters")
  } else {
    setSearchParams({
      filters: JSON.stringify(filters),
    })
  }
}

const filtersSlice = createSlice({
  name: "filters",
  initialState: () => {
    return (
      JSON.parse(getSearchParam("filters")) || {
        years: [],
        categories: [],
        technologies: [],
        topics: [],
        shortcuts: [],
      }
    )
  },
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
      const {
        years,
        categories,
        technologies,
        topics,
        shortcuts,
      } = action.payload
      state.years = years
      state.categories = categories
      state.technologies = technologies
      state.topics = topics
      state.shortcuts = shortcuts
      updateFiltersInUrl(state)
    },
    clearFilters: state => {
      state.years = []
      state.categories = []
      state.technologies = []
      state.topics = []
      state.shortcuts = []
      updateFiltersInUrl(state)
    },
  },
  extraReducers: builder => {
    builder.addCase(urlChanged, (state, action) => {
      const { filters } = action.payload
      return { ...filters }
    })
  },
})

export const getFilters = state => {
  return state.filters
}

export const {
  reducer,
  actions: { addFilter, removeFilter, setFilters, clearFilters },
} = filtersSlice
