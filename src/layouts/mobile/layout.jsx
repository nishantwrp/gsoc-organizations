import React from "react"
import PropTypes from "prop-types"

import "./layout.css"

import Toolbar from "../../components/mobile/toolbar"

const Layout = ({ children, homePage, searchState }) => {
  return (
    <div className="mobile-layout">
      <Toolbar searchState={searchState} showSearch={homePage} />
      <div className="mobile-layout-content">{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  homePage: PropTypes.bool.isRequired,
  searchState: PropTypes.object,
}

export default Layout
