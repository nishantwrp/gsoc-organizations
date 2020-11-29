import React from "react"
import PropTypes from "prop-types"
import { useBreakpoint } from "gatsby-plugin-breakpoints"

import "semantic-ui-less/semantic.less"
import "./layout.css"

import Sidebar from "../components/sidebar"
import { Grid } from "semantic-ui-react"

const Layout = ({ children }) => {
  const breakpoints = useBreakpoint()

  if (!breakpoints.md) {
    return (
      <Grid
        style={{ marginLeft: "0px", marginTop: "0px", marginBottom: "0px" }}
      >
        <Grid.Row style={{ paddingBottom: "0px", paddingTop: "0px" }}>
          <Grid.Column
            width={4}
            style={{ paddingLeft: "0px", paddingBottom: "0px" }}
          >
            <Sidebar />
          </Grid.Column>
          <Grid.Column width={12}>{children}</Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return <></>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
