import React from "react"
import { Provider } from "react-redux"
import ThemeProvider from "./src/components/theme-provider"
import store from "./src/store"

export default ({ element }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{element}</ThemeProvider>
    </Provider>
  )
}
