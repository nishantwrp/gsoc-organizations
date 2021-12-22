import React from "react"
import PropTypes from "prop-types"

import "./layout.css"

import Sidebar from "../../components/sidebar"
import Search from "../../components/search"
import { Grid } from "semantic-ui-react"

const Layout = ({ children, showFiltersAndSearch, filtersState }) => {
  const searchStyle = () => {
    if (!showFiltersAndSearch) {
      return {
        display: "none",
      }
    }
    return {}
  }

  const contentStyle = () => {
    if (showFiltersAndSearch) {
      return {
        paddingTop: "60px",
      }
    }
    return {}
  }

  return (
    <Grid className="desktop-layout-grid">
      <Grid.Row className="desktop-layout-grid-row">
        <Grid.Column className="desktop-layout-grid-column" width={4}>
          <Sidebar
            filtersState={filtersState}
            showFilters={showFiltersAndSearch}
          />
        </Grid.Column>
        <Grid.Column className="desktop-layout-grid-column" width={12}>
          <center>
            <div className="desktop-layout-search" style={searchStyle()}>
              <Search />
            </div>
          </center>
          <div className="desktop-layout-content" style={contentStyle()}>
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
  filtersState: PropTypes.object,
}

export default Layout
