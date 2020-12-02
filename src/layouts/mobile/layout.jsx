import React from "react"
import PropTypes from "prop-types"

import "semantic-ui-less/semantic.less"

import Toolbar from "../../components/mobile/toolbar"

const Layout = ({ children }) => {
  return (
    <div className="mobile-layout">
      <Toolbar />
      <div className="mobile-layout-content">{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
