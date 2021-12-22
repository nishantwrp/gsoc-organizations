import React from "react"
import PropTypes from "prop-types"

import "./layout.css"

import Toolbar from "../../components/mobile/toolbar"

const Layout = ({ children, showFiltersAndSearch, filtersState }) => {
  return (
    <div className="mobile-layout">
      <Toolbar filtersState={filtersState} showSearch={showFiltersAndSearch} />
      <div className="mobile-layout-content">{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showFiltersAndSearch: PropTypes.bool,
  filtersState: PropTypes.object,
}

export default Layout
