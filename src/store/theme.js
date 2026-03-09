import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  mode: "light", // Default to light
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: state => {
      state.mode = state.mode === "light" ? "dark" : "light"
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.mode)
      }
    },
    setTheme: (state, action) => {
      state.mode = action.payload
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export const selectTheme = state => state.theme.mode
export default themeSlice.reducer
