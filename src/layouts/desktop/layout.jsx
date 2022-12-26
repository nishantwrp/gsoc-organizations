import React from "react"
import PropTypes from "prop-types"

import "./layout.css"

import Sidebar from "../../components/sidebar"
import Search from "../../components/search"
import { Grid } from "semantic-ui-react"

const Layout = ({ children, showFiltersAndSearch }) => {
  const searchStyle = showFiltersAndSearch ? {} : { display: "none" }
  const contentStyle = showFiltersAndSearch ? { paddingTop: "60px" } : {}

  return (
    <Grid className="desktop-layout-grid">
      <Grid.Row className="desktop-layout-grid-row">
        <Grid.Column className="desktop-layout-grid-column" width={4}>
          <Sidebar showFilters={showFiltersAndSearch} />
        </Grid.Column>
        <Grid.Column className="desktop-layout-grid-column" width={12}>
          <center>
            <div className="desktop-layout-search" style={searchStyle}>
              <Search />
            </div>
          </center>
          <div className="desktop-layout-content" style={contentStyle}>
            {children}
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  showFiltersAndSearch: PropTypes.bool,
}

export default Layout
