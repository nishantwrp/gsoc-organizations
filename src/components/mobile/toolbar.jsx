import React from "react"

import "./toolbar.css"

import Dimmer from "./dimmer"
import Logo from "../logo"
import Sidebar from "../sidebar"
import Search from "../search"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const Toolbar = () => {
  const [isSidebarVisible, setSidebarVisibilty] = React.useState(false)

  const toggleSidebarVisibilty = () => {
    setSidebarVisibilty(!isSidebarVisible)
  }

  return (
    <div className="mobile-toolbar">
      <div className="mobile-toolbar-logo noselect">
        <center>
          <Logo />
        </center>
      </div>
      <div className="mobile-toolbar-search">
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
      />
    </div>
  )
}

export default Toolbar
