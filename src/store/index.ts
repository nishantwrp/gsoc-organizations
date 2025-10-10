import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"

import { reducer as filtersReducer } from "./filters"
import { reducer as searchReducer } from "./search"

// Define the root state type by combining the state of all reducers
export type RootState = ReturnType<typeof store.getState>

// Define the type for the dispatch function
export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    search: searchReducer,
  },
})

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
