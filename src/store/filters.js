import { createSlice } from "@reduxjs/toolkit"

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    years: [],
    categories: [],
    technologies: [],
    topics: [],
  },
  reducers: {
    addFilter: (state, action) => {
      const { name, val } = action.payload
      state[name] = [...state[name], val]
    },
    removeFilter: (state, action) => {
      const { name, val } = action.payload
      state[name] = state[name].filter(v => v !== val)
    },
    setFilters: (state, action) => {
      const { years, categories, technologies, topics } = action.payload
      state.years = years
      state.categories = categories
      state.technologies = technologies
      state.topics = topics
    },
    clearFilters: state => {
      state.years = []
      state.categories = []
      state.technologies = []
      state.topics = []
    },
  },
})

export const getFilters = state => {
  return state.filters
}

export const {
  reducer,
  actions: { addFilter, removeFilter, setFilters, clearFilters },
} = filtersSlice
