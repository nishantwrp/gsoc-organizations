import React from "react"
import PropTypes from "prop-types"
import { useBreakpoint } from "gatsby-plugin-breakpoints"
import { useLocation } from "@reach/router"

import "semantic-ui-css/semantic.css"
import "./layout.css"

import DesktopLayout from "./desktop/layout"
import MobileLayout from "./mobile/layout"

const Layout = ({ children, searchState, filtersState }) => {
  const location = useLocation()
  const breakpoints = useBreakpoint()

  const showFiltersAndSearch = location.pathname === "/"

  if (!breakpoints.md) {
    return (
      <DesktopLayout
        showFiltersAndSearch={showFiltersAndSearch}
        filtersState={filtersState}
        searchState={searchState}
      >
        {children}
      </DesktopLayout>
    )
  } else {
    return (
      <MobileLayout
        showFiltersAndSearch={showFiltersAndSearch}
        filtersState={filtersState}
        searchState={searchState}
      >
        {children}
      </MobileLayout>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  searchState: PropTypes.object,
  filtersState: PropTypes.object,
}

export default Layout
