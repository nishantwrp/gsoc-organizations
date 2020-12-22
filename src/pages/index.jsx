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

const getFilteredOrganizations = (data, searchQuery, filters) => {
  const organizations = getOrganizations(data)
  let filteredOrganizations = organizations

  if (searchQuery !== "") {
    const fuse = getFuseSearch(organizations)
    filteredOrganizations = fuse.search(searchQuery).map(res => res.item)
  }

  // NOTE: YEARS - intersection, REST - union.
  const { years, categories, technologies, topics } = filters

  if (years.length > 0) {
    let newFilteredOrganizations = []
    for (const organization of filteredOrganizations) {
      let matches = 0
      for (const year of years) {
        if (Object.keys(organization.years).includes(year)) {
          matches++
        }
      }
      if (matches === years.length) {
        newFilteredOrganizations.push(organization)
      }
    }
    filteredOrganizations = newFilteredOrganizations
  }

  if (categories.length > 0) {
    let newFilteredOrganizations = []
    for (const organization of filteredOrganizations) {
      for (const category of categories) {
        if (organization.category === category) {
          newFilteredOrganizations.push(organization)
          break
        }
      }
    }
    filteredOrganizations = newFilteredOrganizations
  }

  if (technologies.length > 0) {
    let newFilteredOrganizations = []
    for (const organization of filteredOrganizations) {
      for (const technology of technologies) {
        if (organization.technologies.includes(technology)) {
          newFilteredOrganizations.push(organization)
          break
        }
      }
    }
    filteredOrganizations = newFilteredOrganizations
  }

  if (topics.length > 0) {
    let newFilteredOrganizations = []
    for (const organization of filteredOrganizations) {
      for (const topic of topics) {
        if (organization.topics.includes(topic)) {
          newFilteredOrganizations.push(organization)
          break
        }
      }
    }
    filteredOrganizations = newFilteredOrganizations
  }

  return filteredOrganizations
}

const IndexPage = ({ data }) => {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filters, setFilters] = React.useState({
    years: [],
    categories: [],
    technologies: [],
    topics: [],
  })

  let filteredOrganizations = getFilteredOrganizations(
    data,
    searchQuery,
    filters
  )

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
      filtersState={{ filters: filters, setFilters: setFilters }}
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
