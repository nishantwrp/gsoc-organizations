import React from "react"
import PropTypes from "prop-types"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode } from "@fortawesome/free-solid-svg-icons"

const getLogoStyle = (size, color) => {
  const fontSize = size + "px"
  const padding = size * 0.1 + "px"
  const borderSize = size * 0.1 + "px"

  return {
    border: borderSize + " solid",
    "border-radius": "10000px",
    color: color,
    padding: padding,
    "font-size": fontSize,
  }
}

const Logo = ({ size, color }) => {
  let logoStyle = getLogoStyle(size, color)

  return (
    <span style={logoStyle}>
      <FontAwesomeIcon icon={faCode}></FontAwesomeIcon>
    </span>
  )
}

Logo.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}

Logo.defaultProps = {
  size: 25,
  color: "red",
}

export default Logo
