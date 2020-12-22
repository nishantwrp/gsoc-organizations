import React from "react"
import PropTypes from "prop-types"
import { useBreakpoint } from "gatsby-plugin-breakpoints"

import "semantic-ui-css/semantic.css"
import "./layout.css"

import DesktopLayout from "./desktop/layout"
import MobileLayout from "./mobile/layout"

const Layout = ({ children, homePage, searchState, filtersState }) => {
  const breakpoints = useBreakpoint()

  if (!breakpoints.md) {
    return (
      <DesktopLayout
        filtersState={filtersState}
        searchState={searchState}
        homePage={homePage}
      >
        {children}
      </DesktopLayout>
    )
  } else {
    return (
      <MobileLayout
        filtersState={filtersState}
        searchState={searchState}
        homePage={homePage}
      >
        {children}
      </MobileLayout>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  homePage: PropTypes.bool.isRequired,
  searchState: PropTypes.object,
  filtersState: PropTypes.object,
}

export default Layout
