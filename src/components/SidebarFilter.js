/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const SidebarHeader = ( props ) => {

  const style= {
    margin : '20px ',
    backgroundColor: 'blue',
 };
 const style2= {
     marginTop : '20px',
     color : 'blue ',

};
  return (
    <>
       <p style={style2}>{props.title} </p>
      <div style={style}>
  
      </div>
    </>
  )
}

SidebarHeader.propTypes = {
  // children: PropTypes.node.isRequired,
}

export default SidebarHeader
