import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  getSearchParam,
  removeSearchParam,
  setSearchParams,
} from "../utils/searchParams"
import { urlChanged } from "./actions"
// Define the filter types
type FilterName =
  | "years"
  | "categories"
  | "technologies"
  | "topics"
  | "shortcuts"
type FiltersState = Record<FilterName, string[]>

//constatnts
const FILTERS: FilterName[] = [
  "years",
  "categories",
  "technologies",
  "topics",
  "shortcuts",
]

const updateFiltersInUrl = (filters: FiltersState): void => {
  if (Object.values(filters).filter(arr => arr.length !== 0).length === 0) {
    removeSearchParam("filters")
  } else {
    setSearchParams({
      filters: JSON.stringify(filters),
    })
  }
}

const ensureAllFilters = (o: FiltersState): void => {
  for (const filter of FILTERS) {
    o[filter] = o[filter] || []
  }
}

export const getFiltersFromSearchUrl = (): FiltersState => {
  const filters = JSON.parse(getSearchParam("filters") || "{}") as FiltersState
  ensureAllFilters(filters)
  return filters
}

const initialState: FiltersState = getFiltersFromSearchUrl()

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addFilter: (
      state,
      action: PayloadAction<{ name: FilterName; val: string }>
    ) => {
      const { name, val } = action.payload
      state[name] = [...state[name], val]
      updateFiltersInUrl(state)
    },
    removeFilter: (
      state,
      action: PayloadAction<{ name: FilterName; val: string }>
    ) => {
      const { name, val } = action.payload
      state[name] = state[name].filter(v => v !== val)
      updateFiltersInUrl(state)
    },
    setFilters: (state, action: PayloadAction<FiltersState>) => {
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
  },
  extraReducers: builder => {
    builder.addCase(
      urlChanged,
      (state, action: PayloadAction<{ filters: FiltersState }>) => {
        const { filters } = action.payload
        ensureAllFilters(filters)
        return { ...filters }
      }
    )
  },
})

export const getFilters = (state: { filters: FiltersState }): FiltersState => {
  return state.filters
}

export const {
  reducer,
  actions: { addFilter, removeFilter, setFilters, clearFilters },
} = filtersSlice
