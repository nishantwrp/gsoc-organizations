import React from "react"
import { graphql } from "gatsby"
import { useBreakpoint } from "gatsby-plugin-breakpoints"
import { Button } from "semantic-ui-react"
import "./index.css"
import { getBookmarkedOrgsCount } from "../store/bookmark"
import Layout from "../layouts/layout"
import OrgCard from "../components/org-card"
import { Grid } from "semantic-ui-react"
import { Link } from "gatsby"
import { clearCount, removeAll } from "../store/bookmark"
import { useAppDispatch, useAppSelector } from "../store"

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
  let bookmarkedOrgs

  if (typeof window !== "undefined") {
    bookmarkedOrgs = JSON.parse(localStorage.getItem("gsoc_orgs"))
  }

  if (bookmarkedOrgs != null) {
    for (const org of organizations) {
      if (bookmarkedOrgs.indexOf(org.name) > -1) {
        filteredOrganizations.push(org)
      }
    }
  }

  return filteredOrganizations
}

const BookmarksPage = ({ data }) => {
  const dispatch = useAppDispatch()
  let filteredOrganizations = getFilteredOrganizations(data)
  function clearBookmark() {
    removeAll()
    dispatch(clearCount())
  }

  const cards = []
  for (const organization of filteredOrganizations) {
    cards.push(
      <Grid.Column key={organization.name}>
        <OrgCard data={organization} />
      </Grid.Column>
    )
  }
  const bookmarkCount = useAppSelector(getBookmarkedOrgsCount)
  const cardColumns = useBreakpoint().l ? 3 : 4
  return (
    <Layout>
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <a className="ui yellow label">
          {bookmarkCount} {bookmarkCount > 1 ? "bookmarks" : "bookmark"}
        </a>
      </div>

      <div
        style={{ marginTop: "1rem", textAlign: "center", marginBottom: "1rem" }}
      >
        <div className="sidebar-content-clear-filters">
          <Link to={`/`}>
            <Button
              size="tiny"
              basic
              color="orange"
              onClick={() => clearBookmark()}
            >
              Clear bookmarks
            </Button>
          </Link>
        </div>
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

export default BookmarksPage
