import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Icon } from "semantic-ui-react"
import { toggleTheme, selectTheme } from "../store/theme"

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  return (
    <Button
      icon
      circular
      basic
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle Dark Mode"
      style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
    >
      <Icon name={theme === "light" ? "moon" : "sun"} />
    </Button>
  )
}

export default ThemeToggle
