import React from "react"
import PropTypes from "prop-types"

import "./layout.css"

import Toolbar from "../../components/mobile/toolbar"

const Layout = ({ children, homePage, searchState, filtersState }) => {
  return (
    <div className="mobile-layout">
      <Toolbar
        filtersState={filtersState}
        searchState={searchState}
        showSearch={homePage}
      />
      <div className="mobile-layout-content">{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  homePage: PropTypes.bool.isRequired,
  searchState: PropTypes.object,
  filtersState: PropTypes.object,
}

export default Layout
