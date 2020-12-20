import React from "react"

import "./organization.css"

import Layout from "../layouts/layout"
import OrgInfo from "../components/org-info"
import ProjectsGraph from "../components/projects-graph"
import { Grid } from "semantic-ui-react"

const OrganizationPage = ({ pageContext: { organization } }) => {
  return (
    <Layout homePage={false}>
      <div className="organization-name-container">{organization.name}</div>
      <Grid className="organization-content-grid" stackable columns={2}>
        <Grid.Column>
          <OrgInfo data={organization} />
        </Grid.Column>
        <Grid.Column>
          <ProjectsGraph data={organization.years} />
        </Grid.Column>
      </Grid>
    </Layout>
  )
}

export default OrganizationPage
