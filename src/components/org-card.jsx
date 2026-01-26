import React, { memo } from "react"
import PropTypes from "prop-types"
import slugify from "slugify"
import { useBreakpoint } from "gatsby-plugin-breakpoints"

import "./org-card.css"

import { Link } from "gatsby"

const OrgCard = ({ data }) => {
  const isMobile = useBreakpoint().md

  // Get year range for compact display
  const yearsList = Object.keys(data.years).sort()
  const yearRange =
    yearsList.length > 0
      ? yearsList.length === 1
        ? yearsList[0]
        : `${yearsList[0]} - ${yearsList[yearsList.length - 1]}`
      : ""

  const participationCount = yearsList.length

  const totalProjects = Object.values(data.years).reduce((acc, yearData) => {
    return acc + (yearData?.num_projects || 0)
  }, 0)

  // Show top items
  const topTechnologies = data.technologies.slice(0, 5)
  const remainingTechCount = Math.max(0, data.technologies.length - 5)

  const card = (
    <div className="gsoc-card">
      <div className="gsoc-card-header">
        <div
          className="gsoc-card-logo-bg"
          style={{ backgroundColor: data.image_background_color || "#ffffff" }}
        >
          <div
            className="gsoc-card-logo"
            style={{ backgroundImage: `url(${data.image_url})` }}
          />
        </div>
        <div className="gsoc-card-title-area">
          <h3 className="gsoc-card-title" title={data.name}>
            {data.name}
          </h3>
          <span className="gsoc-card-category">{data.category}</span>
        </div>
      </div>

      <div className="gsoc-card-content">
        <p className="gsoc-card-desc">{data.description}</p>

        <div className="gsoc-card-metrics">
          <div className="gsoc-metric" title={`Participated: ${yearRange}`}>
            <svg
              className="gsoc-metric-icon"
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 0 24 24"
              width="18px"
              fill="currentColor"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
            </svg>
            <span className="gsoc-metric-value">{participationCount}</span>
            <span className="gsoc-metric-label">
              {participationCount === 1 ? "Year" : "Years"}
            </span>
          </div>
          <div className="gsoc-metric-divider"></div>
          <div className="gsoc-metric" title="Total Projects">
            <svg
              className="gsoc-metric-icon"
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 0 24 24"
              width="18px"
              fill="currentColor"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
            </svg>
            <span className="gsoc-metric-value">{totalProjects}</span>
            <span className="gsoc-metric-label">
              {totalProjects === 1 ? "Project" : "Projects"}
            </span>
          </div>
        </div>

        <div className="gsoc-card-tech">
          {topTechnologies.map(tech => (
            <span key={tech} className="gsoc-tech-chip" title={tech}>
              {tech}
            </span>
          ))}
          {remainingTechCount > 0 && (
            <span
              className="gsoc-tech-chip more"
              title={`${remainingTechCount} more technologies`}
            >
              +{remainingTechCount}
            </span>
          )}
        </div>
        {data.url && (
          <a
            href={data.url}
            target="_blank"
            rel="noreferrer"
            className="gsoc-card-link"
            onClick={e => e.stopPropagation()}
            title="Visit Website"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 0 24 24"
              width="20px"
              fill="currentColor"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )

  return (
    <Link
      to={`/organization/${slugify(data.name, { lower: true })}/`}
      className="gsoc-card-wrapper"
    >
      {card}
    </Link>
  )
}

OrgCard.propTypes = {
  data: PropTypes.object.isRequired,
}

const isSameOrg = (prevData, newData) => {
  return prevData.data.name === newData.data.name
}

export default memo(OrgCard, isSameOrg)
