import React from "react"

import "./toolbar.css"

import Dimmer from "./dimmer"
import Logo from "../logo"
import Sidebar from "../sidebar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const Toolbar = () => {
  const [isSidebarVisible, setSidebarVisibilty] = React.useState(false)

  const toggleSidebarVisibilty = () => {
    setSidebarVisibilty(!isSidebarVisible)
  }

  return (
    <div className="mobile-toolbar">
      <div className="mobile-toolbar-logo">
        <Logo />
      </div>
      <div className="mobile-toolbar-serach">Search</div>
      <div
        className="mobile-toolbar-sidebar-toggle"
        onClick={toggleSidebarVisibilty}
      >
        <FontAwesomeIcon icon={faBars} />
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
