import React from "react"
import { Button, Card } from "semantic-ui-react"
import { OutboundLink } from "gatsby-plugin-google-analytics"

import "./project-card.css"

const ProjectCard = ({ data }) => {
  return (
    <div className="project-card-main-container">
      <Card>
        <Card.Content>
          <Card.Header>{data.title}</Card.Header>
          <Card.Meta>{data.student_name}</Card.Meta>
          <Card.Description>{data.short_description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <OutboundLink
              className="project-card-link"
              href={data.project_url}
              target="_blank"
              rel="noreferrer"
            >
              <Button basic color="green">
                More Details
              </Button>
            </OutboundLink>
            <OutboundLink
              className="project-card-link"
              href={data.code_url}
              target="_blank"
              rel="noreferrer"
            >
              <Button basic color="orange">
                Code Submission
              </Button>
            </OutboundLink>
          </div>
        </Card.Content>
      </Card>
    </div>
  )
}

export default ProjectCard
