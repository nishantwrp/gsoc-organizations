import React from "react"
import PropTypes from "prop-types"

import "./layout.css"

import Sidebar from "../../components/sidebar"
import Search from "../../components/search"

const Layout = ({ children, showFiltersAndSearch }) => {
  const searchStyle = showFiltersAndSearch ? {} : { display: "none" }
  const contentStyle = showFiltersAndSearch ? { paddingTop: "60px" } : {}

  return (
    <div className="desktop-layout-flex">
      <div className="desktop-layout-flex-row">
        <div className="desktop-layout-sidebar">
          <Sidebar showFilters={showFiltersAndSearch} />
        </div>
        <div className="desktop-layout-flex-column">
          <center>
            <div className="desktop-layout-search" style={searchStyle}>
              <Search />
            </div>
          </center>
          <div className="desktop-layout-content" style={contentStyle}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showFiltersAndSearch: PropTypes.bool,
}

export default Layout
