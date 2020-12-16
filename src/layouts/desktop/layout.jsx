import React from "react"
import PropTypes from "prop-types"

import "./layout.css"

import Sidebar from "../../components/sidebar"
import Search from "../../components/search"
import { Grid } from "semantic-ui-react"

const Layout = ({ children }) => {
  return (
    <Grid className="desktop-layout-grid">
      <Grid.Row className="desktop-layout-grid-row">
        <Grid.Column className="desktop-layout-grid-column" width={4}>
          <Sidebar />
        </Grid.Column>
        <Grid.Column className="desktop-layout-grid-column" width={12}>
          <center>
            <div className="desktop-layout-search">
              <Search />
            </div>
          </center>
          <div className="desktop-layout-content">{children}</div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
