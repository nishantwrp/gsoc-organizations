import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"

import { reducer as filtersReducer } from "./filters"
import { reducer as searchReducer } from "./search"

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    search: searchReducer,
  },
})

export function addOrgToShortlist(orgname) {
  if (typeof window !== "undefined") {
    var curr_orgs = localStorage.getItem("gsoc_orgs")
    if (curr_orgs === null) {
      curr_orgs = []
    } else {
      curr_orgs = JSON.parse(curr_orgs)
    }
    console.log("first")
    console.log(curr_orgs)
    const indx = curr_orgs.indexOf(orgname)

    if (indx >= 0) {
      return
    }

    curr_orgs.push(orgname)
    localStorage.setItem("gsoc_orgs", JSON.stringify(curr_orgs))

    const orgs = JSON.parse(localStorage.getItem("gsoc_orgs"))
    console.log("second")
    console.log(orgs)
  }
  return
}

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector
export default store
