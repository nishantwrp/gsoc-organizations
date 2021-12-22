import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"

import { reducer as filtersReducer } from "./filters"

const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
})

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector
export default store
