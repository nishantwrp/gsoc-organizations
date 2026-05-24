import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectTheme, setTheme } from "../store/theme"

const ThemeProvider = ({ children }) => {
  const theme = useSelector(selectTheme)
  const dispatch = useDispatch()

  useEffect(() => {
    // Check local storage on initial load
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      dispatch(setTheme(savedTheme))
    }
  }, [dispatch])

  useEffect(() => {
    // Update the body attribute when theme changes
    document.body.setAttribute("data-theme", theme)
  }, [theme])

  return <>{children}</>
}

export default ThemeProvider
