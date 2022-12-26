import React, { useCallback, useState, memo } from "react"
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
  const [isSidebarVisible, setSidebarVisibilty] = useState(false)
  const searchStyle = showSearch ? {} : { display: "none" }

  const toggleSidebarVisibilty = useCallback(() => {
    setSidebarVisibilty(isVisible => !isVisible)
  }, [])

  return (
    <div className="mobile-toolbar">
      <div className="mobile-toolbar-logo noselect">
        <center>
          {showSearch ? (
            <Logo />
          ) : (
            <Link to="/">
              <Logo />
            </Link>
          )}
        </center>
      </div>
      <div className="mobile-toolbar-search" style={searchStyle}>
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

export default memo(Toolbar)
