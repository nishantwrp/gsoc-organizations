import React, { memo } from "react"
import PropTypes from "prop-types"
import slugify from "slugify"
import { useBreakpoint } from "gatsby-plugin-breakpoints"

import "./org-card.css"

import { Link } from "gatsby"

const OrgCard = ({ data }) => {
  const isMobile = useBreakpoint().md

  const years = Object.keys(data.years)
    .map(year => {
      return (
        <span key={year} className="org-card-year">
          {year}
        </span>
      )
    })
    .reverse()

  let technologies = data.technologies.map(tech => {
    return (
      <span key={tech} className="org-card-technology">
        {tech}
      </span>
    )
  })

  if (technologies.length > 5) {
    const extra = technologies.length - 5
    technologies = technologies.slice(0, 5)
    technologies.push(
      <span key={`#${extra} more`} className="org-card-technology-extra">
        {extra} more
      </span>
    )
  }

  const card = (
    <div className="org-card-container">
      <div
        className="org-card-logo-container"
        style={{
          backgroundColor: data.image_background_color,
        }}
      >
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
  )

  return isMobile ? (
    <Link to={`/organization/${slugify(data.name, { lower: true })}/`}>
      {card}
    </Link>
  ) : (
    <a
      href={`/organization/${slugify(data.name, { lower: true })}/`}
      target="_blank"
      rel="noreferrer"
    >
      {card}
    </a>
  )
}

OrgCard.propTypes = {
  data: PropTypes.object.isRequired,
}

const isSameOrg = (prevData, newData) => {
  return prevData.data.name === newData.data.name
}

export default memo(OrgCard, isSameOrg)
