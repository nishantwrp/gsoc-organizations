import React from "react"
import PropTypes from "prop-types"

import "./toolbar.css"

import Dimmer from "./dimmer"
import Logo from "../logo"
import Sidebar from "../sidebar"
import Search from "../search"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"

const Toolbar = ({ showSearch, searchState, filtersState }) => {
  const [isSidebarVisible, setSidebarVisibilty] = React.useState(false)

  const toggleSidebarVisibilty = () => {
    setSidebarVisibilty(!isSidebarVisible)
  }

  const searchStyle = () => {
    if (!showSearch) {
      return {
        display: "none",
      }
    }
    return {}
  }

  return (
    <div className="mobile-toolbar">
      <div className="mobile-toolbar-logo noselect">
        <center>
          <Link to="/">
            <Logo />
          </Link>
        </center>
      </div>
      <div className="mobile-toolbar-search" style={searchStyle()}>
        <center>
          <Search searchState={searchState} />
        </center>
      </div>
      <div
        className="mobile-toolbar-sidebar-toggle noselect"
        onClick={toggleSidebarVisibilty}
      >
        <center>
          <FontAwesomeIcon icon={faBars} />
        </center>
      </div>
      <Dimmer
        onClick={toggleSidebarVisibilty}
        isSidebarVisible={isSidebarVisible}
      />
      <Sidebar
        filtersState={filtersState}
        config={{
          mode: "mobile",
          visible: isSidebarVisible,
        }}
        showFilters={showSearch}
      />
    </div>
  )
}

Toolbar.propTypes = {
  showSearch: PropTypes.bool.isRequired,
  searchState: PropTypes.object,
  filtersState: PropTypes.object,
}

export default Toolbar
