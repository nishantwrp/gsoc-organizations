import React from "react"
import PropTypes from "prop-types"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import "./org-info.css"

const OrgInfo = ({ data }) => {
  const years = Object.keys(data.years)
    .sort()
    .reverse()
    .map(year => (
      <OutboundLink
        key={year}
        href={data.years[year].projects_url}
        rel="noreferrer"
        target="_blank"
        className="gsoc-year-chip"
      >
        {year}
      </OutboundLink>
    ))

  return (
    <div className="gsoc-org-info">
      {/* Header */}
      <div className="gsoc-org-header">
        <div
          className="gsoc-org-logo-box"
          style={{ backgroundColor: data.image_background_color || "#ffffff" }}
        >
          <div
            className="gsoc-org-logo"
            style={{ backgroundImage: `url(${data.image_url})` }}
          />
        </div>
        <div className="gsoc-org-header-content">
          <h1 className="gsoc-org-title">{data.name}</h1>
          <span className="gsoc-org-category">{data.category}</span>

          <div className="gsoc-org-actions">
            {data.url && (
              <OutboundLink
                href={data.url}
                rel="noreferrer"
                target="_blank"
                className="gsoc-btn gsoc-btn-primary"
              >
                Visit Website
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 0 24 24"
                  width="18px"
                  fill="currentColor"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                </svg>
              </OutboundLink>
            )}

            {/* Social Links */}
            {data.twitter_url && (
              <OutboundLink
                href={data.twitter_url}
                target="_blank"
                rel="noreferrer"
                className="gsoc-btn gsoc-btn-icon"
                title="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </OutboundLink>
            )}
            {data.mailing_list && (
              <OutboundLink
                href={data.mailing_list}
                target="_blank"
                rel="noreferrer"
                className="gsoc-btn gsoc-btn-icon"
                title="Mailing List"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18"
                  viewBox="0 0 24 24"
                  width="18"
                  fill="currentColor"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </OutboundLink>
            )}
            {data.irc_channel && (
              <OutboundLink
                href={data.irc_channel}
                target="_blank"
                rel="noreferrer"
                className="gsoc-btn gsoc-btn-icon"
                title="Chat Channel"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18"
                  viewBox="0 0 24 24"
                  width="18"
                  fill="currentColor"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                </svg>
              </OutboundLink>
            )}
            {data.contact_email && (
              <OutboundLink
                href={`mailto:${data.contact_email}`}
                target="_blank"
                rel="noreferrer"
                className="gsoc-btn gsoc-btn-icon"
                title="Contact Email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18"
                  viewBox="0 0 24 24"
                  width="18"
                  fill="currentColor"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </OutboundLink>
            )}
            {data.blog_url && (
              <OutboundLink
                href={data.blog_url}
                target="_blank"
                rel="noreferrer"
                className="gsoc-btn gsoc-btn-icon"
                title="Blog"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18"
                  viewBox="0 0 24 24"
                  width="18"
                  fill="currentColor"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
                </svg>
              </OutboundLink>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="gsoc-org-body">
        <section className="gsoc-org-section">
          <h3 className="gsoc-section-title">About</h3>
          <p className="gsoc-org-description">{data.description}</p>
        </section>

        {data.guide_url && (
          <div className="gsoc-contrib-card">
            <svg
              className="gsoc-contrib-icon"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              fill="currentColor"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
            </svg>
            <div className="gsoc-contrib-text">
              Interested in contributing? Check out the official{" "}
              <OutboundLink
                href={data.guide_url}
                target="_blank"
                rel="noreferrer"
                className="gsoc-contrib-link"
              >
                contribution guidelines
              </OutboundLink>
              .
            </div>
          </div>
        )}

        <div className="gsoc-org-grid">
          <div className="gsoc-org-col">
            <h3 className="gsoc-section-title">Technologies</h3>
            <div className="gsoc-chip-container">
              {data.technologies.map(tech => (
                <span key={tech} className="gsoc-chip tech">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="gsoc-org-col">
            <h3 className="gsoc-section-title">Topics</h3>
            <div className="gsoc-chip-container">
              {data.topics.map(topic => (
                <span key={topic} className="gsoc-chip topic">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        <section className="gsoc-org-section">
          <h3 className="gsoc-section-title">GSoC History</h3>
          <div className="gsoc-years-list">{years}</div>
        </section>
      </div>
    </div>
  )
}

OrgInfo.propTypes = {
  data: PropTypes.object.isRequired,
}

export default OrgInfo
