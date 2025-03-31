import React from "react"
import PropTypes from "prop-types"

import "./layout.css"

import Sidebar from "../../components/sidebar"
import Search from "../../components/search"
import { Grid } from "semantic-ui-react"
import ScrollToTop from "../../components/scrollToTop"

const Layout = ({ children, showFiltersAndSearch }) => {
  const searchStyle = showFiltersAndSearch ? {} : { display: "none" }
  const contentStyle = showFiltersAndSearch ? { paddingTop: "60px" } : {}

  const scrollToTop = () => {
    window.scrollTo({ top: 0 })
  }
  return (
    <Grid className="desktop-layout-grid">
      {/* <div onClick={scrollToTop} className="gotoTopButton">
        &#8593;
      </div> */}
      <ScrollToTop />
      <Grid.Row className="desktop-layout-grid-row">
        <Grid.Column className="desktop-layout-grid-column" width={4}>
          <Sidebar
            scrollToTop={scrollToTop}
            showFilters={showFiltersAndSearch}
          />
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
