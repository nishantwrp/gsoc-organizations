import React from "react"

import "./organization.css"

import Layout from "../layouts/layout"
import OrgInfo from "../components/org-info"
import ProjectsGraph from "../components/projects-graph"
import { Grid } from "semantic-ui-react"

const org = {
  name: "52° North GmbH",
  url: "https://52north.org",
  image_url:
    "https://lh3.googleusercontent.com/b3Eq2hMuwWVThPV-5EqL3UB8qWSOnMabjXaYn_UaYg6UUvDc1aiSyTGrxEddbCVZZLYeoCyjgtsvkUvCuQ8trdbFR6-YLA",
  description:
    "52°North works on innovative ideas and technologies in geoinformatics",
  category: "Science and Medicine",
  topics: [
    "spatial data",
    "sensor web",
    "web-based geoprocessing",
    "earth observation",
    "geoinformatics",
    "spatial data infrastructures",
    "spatial information",
    "geoprocessing",
    "remote sensing",
    "geostatistics",
    "ogc",
    "web processing",
    "sensorweb",
    "floating car data",
    "web services",
    "ogc standards",
    "trajectory analytics",
  ],
  technologies: [
    "javascript",
    "java",
    "ogc standards",
    "web services",
    "web",
    "spring",
    "r",
    "big data",
    "android",
    "python",
    "react",
  ],
  years: {
    2016: {
      projects_url:
        "https://summerofcode.withgoogle.com/archive/2016/organizations/5429283996565504/",
      num_projects: 3,
    },
    2017: {
      projects_url:
        "https://summerofcode.withgoogle.com/archive/2017/organizations/4959751460880384/",
      num_projects: 1,
    },
    2018: {
      projects_url:
        "https://summerofcode.withgoogle.com/archive/2018/organizations/5067792839606272/",
      num_projects: 1,
    },
    2019: {
      projects_url:
        "https://summerofcode.withgoogle.com/archive/2019/organizations/6331236958601216/",
      num_projects: 2,
    },
    2020: {
      projects_url:
        "https://summerofcode.withgoogle.com/archive/2020/organizations/6309633414660096/",
      num_projects: 3,
    },
  },
}

const OrganizationPage = () => {
  return (
    <Layout homePage={false}>
      <div className="organization-name-container">{org.name}</div>
      <Grid className="organization-content-grid" stackable columns={2}>
        <Grid.Column>
          <OrgInfo data={org} />
        </Grid.Column>
        <Grid.Column>
          <ProjectsGraph />
        </Grid.Column>
      </Grid>
    </Layout>
  )
}

export default OrganizationPage
