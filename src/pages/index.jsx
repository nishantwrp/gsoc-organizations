import React from "react"
import Fuse from "fuse.js"
import { graphql } from "gatsby"

import "./index.css"

import Layout from "../layouts/layout"
import OrgCard from "../components/org-card"
import { Grid } from "semantic-ui-react"

const getOrganizations = data => {
  return data.allOrganization.edges.map(orgNode => {
    let org = orgNode.node
    for (const yearKey of Object.keys(org.years)) {
      if (yearKey[0] === "_") {
        if (org.years[yearKey] !== null) {
          let year = yearKey.slice(1)
          org.years[year] = org.years[yearKey]
        }
        delete org.years[yearKey]
      }
    }
    return org
  })
}

const getFuseSearch = organizations => {
  const options = {
    threshold: 0.3,
    keys: ["name"],
  }

  return new Fuse(organizations, options)
}

const getFilteredOrganizations = (data, searchQuery) => {
  const organizations = getOrganizations(data)

  if (searchQuery === "") {
    return organizations
  }

  const fuse = getFuseSearch(organizations)
  return fuse.search(searchQuery).map(res => res.item)
}

const IndexPage = ({ data }) => {
  const [searchQuery, setSearchQuery] = React.useState("")

  let filteredOrganizations = getFilteredOrganizations(data, searchQuery)

  const cards = []

  for (const organization of filteredOrganizations) {
    cards.push(
      <Grid.Column>
        <OrgCard data={organization} />
      </Grid.Column>
    )
  }

  return (
    <Layout
      searchState={{ searchQuery: searchQuery, setSearchQuery: setSearchQuery }}
      homePage={true}
    >
      <Grid className="index-org-cards-grid" stackable columns={4}>
        {cards}
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query {
    allOrganization {
      edges {
        node {
          category
          description
          name
          technologies
          image_url
          topics
          url
          years {
            _2016 {
              num_projects
              projects_url
            }
            _2017 {
              num_projects
              projects_url
            }
            _2018 {
              num_projects
              projects_url
            }
            _2019 {
              num_projects
              projects_url
            }
            _2020 {
              num_projects
              projects_url
            }
          }
        }
      }
    }
  }
`

export default IndexPage
