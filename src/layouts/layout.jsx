import React from "react"
import PropTypes from "prop-types"
import { useBreakpoint } from "gatsby-plugin-breakpoints"
import Logo from "../components/logo"
import "semantic-ui-less/semantic.less"
import "./layout.css"

import Sidebar from "../components/sidebar"
import MobileHeader from "../components/mobileheader"
import { Grid } from "semantic-ui-react"
import { Button } from "semantic-ui-react"

const Layout = ({ children }) => {
  const breakpoints = useBreakpoint()

  if (!breakpoints.md) {
    return (
      <Grid className="desktop-layout-grid">
        <Grid.Row className="desktop-layout-grid-row">
          <Grid.Column className="desktop-layout-grid-column" width={4}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column width={12}>{children}</Grid.Column>
        </Grid.Row>
      </Grid>
    )
  } else {
    return (
      <Grid className="desktop-layout-grid">
        <Grid.Row className="desktop-layout-grid-row">
          <MobileHeader />
        </Grid.Row>
        {/* <Grid.Row className="desktop-layout-grid-row">
          <Grid.Column width={12}>{children}</Grid.Column>
        </Grid.Row> */}
      </Grid>
    )
  }
  return <></>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
