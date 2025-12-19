import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import "./project-card.css"

const ProjectCard = ({ data }) => {
  return (
    <div className="gsoc-project-card">
      <div className="gsoc-project-title">{data.title}</div>
      <div className="gsoc-project-student">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          viewBox="0 0 24 24"
          width="16"
          fill="currentColor"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
        {data.student_name}
      </div>
      <div className="gsoc-project-desc">{data.short_description}</div>

      <div className="gsoc-project-actions">
        <OutboundLink
          className="gsoc-project-btn"
          href={data.project_url}
          target="_blank"
          rel="noreferrer"
        >
          View Project
        </OutboundLink>
        {data.code_url && data.code_url !== "" && (
          <OutboundLink
            className="gsoc-project-btn"
            href={data.code_url}
            target="_blank"
            rel="noreferrer"
          >
            Code
          </OutboundLink>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
