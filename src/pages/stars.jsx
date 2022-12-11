import React, { useEffect } from "react"
import Fuse from "fuse.js"
import { graphql } from "gatsby"
import { useBreakpoint } from "gatsby-plugin-breakpoints"
import { navigate } from "@reach/router"

import "./index.css"

import Layout from "../layouts/layout"
import OrgCard from "../components/org-card"
import SEO from "../components/seo"
import Notification from "../components/notification"
import { Grid } from "semantic-ui-react"
import { Link } from "gatsby"

function clearStars() {
  if (typeof window !== "undefined") {
    localStorage.clear()
  }
}

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

const getFilteredOrganizations = data => {
  const organizations = getOrganizations(data)
  let filteredOrganizations = []
  let starredOrgs

  if (typeof window !== "undefined") {
    starredOrgs = JSON.parse(localStorage.getItem("gsoc_orgs"))
  }

  if (starredOrgs != null) {
    for (const org of organizations) {
      if (starredOrgs.indexOf(org.name) > -1) {
        filteredOrganizations.push(org)
      }
    }
  }

  return filteredOrganizations
}

const StarsPage = ({ data }) => {
  // const dispatch = useAppDispatch()
  // const searchQuery = useAppSelector(getSearch)
  // const filters = useAppSelector(getFilters)

  let filteredOrganizations = getFilteredOrganizations(data)

  const cards = []
  for (const organization of filteredOrganizations) {
    cards.push(
      <Grid.Column>
        <OrgCard data={organization} />
      </Grid.Column>
    )
  }
  let starCount = 0
  if (typeof window !== "undefined") {
    starCount = JSON.parse(localStorage.getItem("gsoc_orgs"))
      ? JSON.parse(localStorage.getItem("gsoc_orgs")).length
      : 0
  }
  const cardColumns = useBreakpoint().l ? 3 : 4

  return (
    <Layout>
      {/* <SEO title={"Stars"} meta={meta} /> */}
      <Grid className="index-org-cards-grid">
        <Notification />
      </Grid>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <a className="ui yellow label">{starCount} stars</a>
      </div>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <Link to={`/`}>
          <button className="view-stars-button" onClick={() => clearStars()}>
            Clear stars ⭐
          </button>
        </Link>
      </div>

      <div></div>

      <Grid className="index-org-cards-grid" stackable columns={cardColumns}>
        {cards}
      </Grid>
      <div style={{ padding: "1rem" }}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-9769516184087442"
          data-ad-slot="5525920548"
          data-ad-format="auto"
          data-full-width-responsive="false"
        ></ins>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    allOrganization {
      edges {
        node {
          category
          description
          name
          technologies
          image_url
          image_background_color
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
            _2021 {
              num_projects
              projects_url
            }
            _2022 {
              num_projects
              projects_url
            }
          }
        }
      }
    }
  }
`

export default StarsPage
