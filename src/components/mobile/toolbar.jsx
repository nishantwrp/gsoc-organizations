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

const Toolbar = ({ showSearch }) => {
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

  const getLogo = () => {
    return showSearch ? (
      <Logo />
    ) : (
      <Link to="/">
        <Logo />
      </Link>
    )
  }

  return (
    <div className="mobile-toolbar">
      <div className="mobile-toolbar-logo noselect">
        <center>{getLogo()}</center>
      </div>
      <div className="mobile-toolbar-search" style={searchStyle()}>
        <center>
          <Search />
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
}

export default Toolbar
