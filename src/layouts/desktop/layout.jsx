import React from "react"
import PropTypes from "prop-types"

import "./layout.css"

import Sidebar from "../../components/sidebar"
import Search from "../../components/search"
import ThemeToggle from "../../components/theme-toggle"
import { Grid } from "semantic-ui-react"

const Layout = ({ children, showFiltersAndSearch }) => {
  // If hidden, display: none. If visible, display: flex (to align items side-by-side)
  const searchContainerStyle = showFiltersAndSearch
    ? { display: "flex", alignItems: "center", gap: "10px" }
    : { display: "none" }

  const contentStyle = showFiltersAndSearch ? { paddingTop: "60px" } : {}

  return (
    <Grid className="desktop-layout-grid">
      <Grid.Row className="desktop-layout-grid-row">
        <Grid.Column className="desktop-layout-grid-column" width={4}>
          <Sidebar showFilters={showFiltersAndSearch} />
        </Grid.Column>
        <Grid.Column className="desktop-layout-grid-column" width={12}>
          <center>
            {/* 1. This container is now a Flexbox.
               2. It keeps the original width (70%) from layout.css but aligns items in a row.
            */}
            <div className="desktop-layout-search" style={searchContainerStyle}>
              {/* Search takes all available remaining width */}
              <div style={{ flex: 1 }}>
                <Search />
              </div>

              {/* Toggle Button sits to the right */}
              <ThemeToggle />
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
