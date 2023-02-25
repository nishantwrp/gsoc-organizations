import { createSlice } from "@reduxjs/toolkit"

export function addOrgToShortlist(orgname) {
  if (typeof window !== "undefined") {
    var curr_orgs = localStorage.getItem("gsoc_orgs")
    if (curr_orgs === null) {
      curr_orgs = []
    } else {
      curr_orgs = JSON.parse(curr_orgs)
    }

    if (curr_orgs.indexOf(orgname) != -1) return
    localStorage.setItem("gsoc_orgs", JSON.stringify([...curr_orgs, orgname]))
  }
  return
}

export function removeAll() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("gsoc_orgs")
  }
  return
}

export function removeOrgToShortlist(orgname) {
  if (typeof window !== "undefined") {
    var curr_orgs = localStorage.getItem("gsoc_orgs")
    if (curr_orgs === null) {
      curr_orgs = []
    } else {
      curr_orgs = JSON.parse(curr_orgs)
    }
    if (curr_orgs.indexOf(orgname) == -1) return
    else curr_orgs = curr_orgs.filter(a => a != orgname)
    localStorage.setItem("gsoc_orgs", JSON.stringify(curr_orgs))
  }
  return
}
const bookmarkSlice = createSlice({
  name: "bookmarkedOrgsCount",
  initialState: () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("gsoc_orgs")) {
        return JSON.parse(localStorage.getItem("gsoc_orgs")).length
      }
    }
    return 0
  },
  reducers: {
    addCount: (state, action) => {
      state = state + 1
      return state
    },
    removeCount: (state, action) => {
      state = state - 1
      return state
    },
    clearCount: state => {
      state = 0
      return state
    },
  },
})

export const getBookmarkedOrgsCount = state => {
  return state.bookmark
}

export const {
  reducer,
  actions: { addCount, removeCount, clearCount },
} = bookmarkSlice
