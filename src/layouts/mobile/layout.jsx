import React from "react"
import PropTypes from "prop-types"

import "./layout.css"

import Toolbar from "../../components/mobile/toolbar"

const Layout = ({ children, showFiltersAndSearch, resultsCount }) => {
  return (
    <div className="mobile-layout">
      {showFiltersAndSearch && (
        <Toolbar
          showSearch={showFiltersAndSearch}
          resultsCount={resultsCount}
        />
      )}
      <div
        className="mobile-layout-content"
        style={showFiltersAndSearch ? {} : { paddingTop: "0px" }}
      >
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showFiltersAndSearch: PropTypes.bool,
  resultsCount: PropTypes.number,
}

export default Layout
