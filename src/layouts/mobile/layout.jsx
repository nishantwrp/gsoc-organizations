import React from "react"
import PropTypes from "prop-types"

import "./layout.css"

import Toolbar from "../../components/mobile/toolbar"

const Layout = ({ children, homePage }) => {
  return (
    <div className="mobile-layout">
      <Toolbar showSearch={homePage} />
      <div className="mobile-layout-content">{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  homePage: PropTypes.bool.isRequired,
}

export default Layout
