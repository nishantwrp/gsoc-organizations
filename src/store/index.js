import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"

import { reducer as filtersReducer } from "./filters"
import { reducer as searchReducer } from "./search"
import themeReducer from "./theme"

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    search: searchReducer,
    theme: themeReducer,
  },
})

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector
export default store
