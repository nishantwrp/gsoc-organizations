import React from "react"
import PropTypes from "prop-types"

import "./org-card.css"

import { Link } from "gatsby"

const OrgCard = ({ data }) => {
  const years = Object.keys(data.years)
    .map(year => {
      return <span className="org-card-year">{year}</span>
    })
    .reverse()

  let technologies = data.technologies.map(tech => {
    return <span className="org-card-technology">{tech}</span>
  })

  if (technologies.length > 5) {
    const extra = technologies.length - 5
    technologies = technologies.slice(0, 5)
    technologies.push(
      <span className="org-card-technology-extra">{extra} more</span>
    )
  }

  return (
    <Link to="/organization">
      <div className="org-card-container">
        <div className="org-card-logo-container">
          <div
            className="org-card-logo"
            style={{
              backgroundImage: `url(${data.image_url})`,
            }}
          ></div>
        </div>
        <div className="org-card-name-container">{data.name}</div>
        <div className="org-card-category-container">
          <span>{data.category}</span>
        </div>
        <div className="org-card-description-container">{data.description}</div>
        <div className="org-card-years-container">{years}</div>
        <div className="org-card-technologies-container">{technologies}</div>
      </div>
    </Link>
  )
}

OrgCard.propTypes = {
  data: PropTypes.object.isRequired,
}

export default OrgCard
