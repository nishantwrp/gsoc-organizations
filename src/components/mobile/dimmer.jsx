import React, { memo } from "react"
import PropTypes from "prop-types"

import "./dimmer.css"

const Dimmer = ({ onClick, isSidebarVisible }) => {
  const dimmerStyle = isSidebarVisible ? {} : { display: "none" }

  return (
    <div className="mobile-dimmer" onClick={onClick} style={dimmerStyle}></div>
  )
}

Dimmer.propTypes = {
  onClick: PropTypes.func.isRequired,
  isSidebarVisible: PropTypes.bool.isRequired,
}

export default memo(Dimmer)
