import React from "react"
import PropTypes from "prop-types"
import { useBreakpoint } from "gatsby-plugin-breakpoints"
import { useLocation } from "@reach/router"

import "semantic-ui-css/semantic.css"
import "./layout.css"

import DesktopLayout from "./desktop/layout"
import MobileLayout from "./mobile/layout"

const Layout = ({ children, resultsCount }) => {
  const location = useLocation()
  const breakpoints = useBreakpoint()

  const showFiltersAndSearch = location.pathname === "/"

  if (!breakpoints.md) {
    return (
      <DesktopLayout
        showFiltersAndSearch={showFiltersAndSearch}
        resultsCount={resultsCount}
      >
        {children}
      </DesktopLayout>
    )
  } else {
    return (
      <MobileLayout
        showFiltersAndSearch={showFiltersAndSearch}
        resultsCount={resultsCount}
      >
        {children}
      </MobileLayout>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  resultsCount: PropTypes.number,
}

export default Layout
