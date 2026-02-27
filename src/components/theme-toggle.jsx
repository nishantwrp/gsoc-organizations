import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Icon } from "semantic-ui-react"
import { toggleTheme, selectTheme } from "../store/theme"

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  // Define styles based on the current theme
  const buttonStyle = {
    marginLeft: "10px",
    marginRight: "15px",
    borderRadius: "12px", // Square with rounded corners
    transition: "background-color 0.3s, color 0.3s",

    // Logic: If Dark Mode, make button Light Gray (pop out). If Light Mode, keep standard.
    backgroundColor: theme === "dark" ? "#e0e0e0" : "transparent",
    color: theme === "dark" ? "#333333" : "var(--text-color)",
    border: theme === "light" ? "1px solid var(--border-color)" : "none",
  }

  return (
    <Button
      icon
      basic={theme === "light"} // Only use basic outline in light mode
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle Dark Mode"
      style={buttonStyle}
    >
      <Icon name={theme === "light" ? "moon" : "sun"} />
    </Button>
  )
}

export default ThemeToggle
