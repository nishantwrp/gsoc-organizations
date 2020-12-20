import React from "react"
import PropTypes from "prop-types"
import { useBreakpoint } from "gatsby-plugin-breakpoints"

import "semantic-ui-css/semantic.css"
import "./layout.css"

import DesktopLayout from "./desktop/layout"
import MobileLayout from "./mobile/layout"

const Layout = ({ children, homePage }) => {
  const breakpoints = useBreakpoint()

  if (!breakpoints.md) {
    return <DesktopLayout homePage={homePage}>{children}</DesktopLayout>
  } else {
    return <MobileLayout homePage={homePage}>{children}</MobileLayout>
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  homePage: PropTypes.bool.isRequired,
}

export default Layout
