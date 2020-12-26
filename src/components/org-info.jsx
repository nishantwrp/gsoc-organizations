import React from "react"
import PropTypes from "prop-types"

import "./org-info.css"

import { OutboundLink } from "gatsby-plugin-google-analytics"
import { Divider, Button, Header, Icon } from "semantic-ui-react"

const OrgInfo = ({ data }) => {
  const years = Object.keys(data.years)
    .map(year => {
      return (
        <OutboundLink
          href={data.years[year].projects_url}
          rel="noreferrer"
          target="_blank"
        >
          <span className="org-info-year">{year}</span>
        </OutboundLink>
      )
    })
    .reverse()

  let technologies = data.technologies.map(tech => {
    return <span className="org-info-technology">{tech}</span>
  })

  let topics = data.topics.map(topic => {
    return <span className="org-info-topic">{topic}</span>
  })

  return (
    <div className="org-info-container">
      <div
        className="org-info-logo-container"
        style={{
          backgroundColor: data.image_background_color,
        }}
      >
        <div
          className="org-info-logo"
          style={{
            backgroundImage: `url(${data.image_url})`,
          }}
        ></div>
      </div>
      <div className="org-info-site-container">
        <OutboundLink href={data.url} rel="noreferrer" target="_blank">
          <Button icon labelPosition="left" color="orange">
            <Icon name="world" />
            Visit Site
          </Button>
        </OutboundLink>
      </div>
      <div className="org-info-description-container">{data.description}</div>
      <center>
        <Divider horizontal className="org-info-divider">
          <Header as="h4">Category</Header>
        </Divider>
      </center>
      <div className="org-info-category-container">
        <span>{data.category}</span>
      </div>
      <center>
        <Divider horizontal className="org-info-divider">
          <Header as="h4">Years</Header>
        </Divider>
      </center>
      <div className="org-info-years-container">{years}</div>
      <center>
        <Divider horizontal className="org-info-divider">
          <Header as="h4">Technologies</Header>
        </Divider>
      </center>
      <div className="org-info-technologies-container">{technologies}</div>
      <center>
        <Divider horizontal className="org-info-divider">
          <Header as="h4">Topics</Header>
        </Divider>
      </center>
      <div className="org-info-topics-container">{topics}</div>
    </div>
  )
}

OrgInfo.propTypes = {
  data: PropTypes.object.isRequired,
}

export default OrgInfo
