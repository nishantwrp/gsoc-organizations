import React from "react"
import { Grid, Tab } from "semantic-ui-react"
import { useBreakpoint } from "gatsby-plugin-breakpoints"

import "./projects-section.css"

import ProjectCard from "./project-card"

const ProjectsSection = ({ data }) => {
  const projectColumns = useBreakpoint().l ? 3 : 4

  const projectPanes = Object.entries(data)
    .filter(([year, _]) => year != 2023)
    .map(([year, yearData]) => {
      return {
        menuItem: year,
        render: () => {
          if (yearData.projects.length) {
            return (
              <Tab.Pane attached={false} className="project-cards-container">
                <Grid
                  className="project-cards-grid"
                  stackable
                  columns={projectColumns}
                >
                  {yearData.projects.map(project => (
                    <Grid.Column>
                      <ProjectCard data={project} />
                    </Grid.Column>
                  ))}
                </Grid>
              </Tab.Pane>
            )
          } else {
            return (
              <Tab.Pane
                attached={false}
                className="project-cards-container projects-section-message-container"
              >
                No completed projects :(
              </Tab.Pane>
            )
          }
        },
      }
    })
    .reverse()

  return (
    <div className="projects-section-container">
      <Tab
        className="projects-section-year-headings"
        menu={{ secondary: true }}
        menuPosition="center"
        panes={projectPanes}
      />
    </div>
  )
}

export default ProjectsSection
