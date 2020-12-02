import React from "react"
import PropTypes from "prop-types"

import "semantic-ui-less/semantic.less"
import "./layout.css"

import Sidebar from "../../components/sidebar"
import { Grid } from "semantic-ui-react"

const Layout = ({ children }) => {
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
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
