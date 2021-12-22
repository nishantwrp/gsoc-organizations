import React from "react"
import PropTypes from "prop-types"
import { useLocation } from "@reach/router"

import "./layout.css"

import Toolbar from "../../components/mobile/toolbar"

const Layout = ({
  children,
  showFiltersAndSearch,
  searchState,
  filtersState,
}) => {
  return (
    <div className="mobile-layout">
      <Toolbar
        filtersState={filtersState}
        searchState={searchState}
        showSearch={showFiltersAndSearch}
      />
      <div className="mobile-layout-content">{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showFiltersAndSearch: PropTypes.bool,
  searchState: PropTypes.object,
  filtersState: PropTypes.object,
}

export default Layout
