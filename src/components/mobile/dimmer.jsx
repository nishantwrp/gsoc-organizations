import React from "react"
import PropTypes from "prop-types"

import "./dimmer.css"

const getDimmerStyle = isSidebarVisible => {
  if (!isSidebarVisible) {
    return {
      display: "none",
    }
  }
}

const Dimmer = ({ onClick, isSidebarVisible }) => {
  return (
    <div
      className="mobile-dimmer"
      onClick={onClick}
      style={getDimmerStyle(isSidebarVisible)}
    ></div>
  )
}

Dimmer.propTypes = {
  onClick: PropTypes.func.isRequired,
  isSidebarVisible: PropTypes.bool.isRequired,
}

export default Dimmer
