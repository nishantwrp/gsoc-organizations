import React from "react"
import PropTypes from "prop-types"
import { useBreakpoint } from "gatsby-plugin-breakpoints"

import "semantic-ui-less/semantic.less"
import "./layout.css"

import DesktopLayout from "./desktop/layout"
import MobileLayout from "./mobile/layout"

const Layout = ({ children }) => {
  const breakpoints = useBreakpoint()

  if (!breakpoints.md) {
    return <DesktopLayout>{children}</DesktopLayout>
  } else {
    return <MobileLayout>{children}</MobileLayout>
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
