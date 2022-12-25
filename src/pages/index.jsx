import React, { useEffect, useMemo } from "react"
import Fuse from "fuse.js"
import { graphql } from "gatsby"
import { useBreakpoint } from "gatsby-plugin-breakpoints"

import "./index.css"

import Layout from "../layouts/layout"
import OrgCard from "../components/org-card"
import SEO from "../components/seo"
import Notification from "../components/notification"
import { Grid } from "semantic-ui-react"
import { useAppSelector } from "../store"
import { getSearch } from "../store/search"
import { getFilters } from "../store/filters"
import { setSearchParams } from "../utils/searchParams"

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

const getFilteredOrganizations = (organizations, searchQuery, filters) => {
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
  const searchQuery = useAppSelector(getSearch)
  const filters = useAppSelector(getFilters)
  const allOrganizations = useMemo(() => getOrganizations(data), [])
  const filteredOrganizations = getFilteredOrganizations(
    allOrganizations,
    searchQuery,
    filters
  )

  useEffect(() => {
    // Update the search params in the url if filters or search query
    // change.
    const searchParams = {}

    if (searchQuery) {
      searchParams["search"] = searchQuery
    }

    if (Object.values(filters).filter(arr => arr.length !== 0).length !== 0) {
      searchParams["filters"] = JSON.stringify(filters)
    }

    setSearchParams(searchParams)
  }, [searchQuery, filters])

  const metaDescription =
    "View and analyse the info of the organizations participating in Google Summer of Code and filter them by various parameters."
  const meta = [
    {
      name: "description",
      content: metaDescription,
    },
    {
      name: "keywords",
      content:
        "gsoc, analysis, organizations, statistics, filter, years, google summer of code, technologies, topics, categories, projects",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: data.site.siteMetadata.title,
    },
    {
      property: "og:description",
      content: metaDescription,
    },
    {
      property: "og:image",
      content: `${data.site.siteMetadata.siteUrl}/images/screenshot.png`,
    },
    {
      property: "og:site_name",
      content: data.site.siteMetadata.title,
    },
    {
      property: "og:url",
      content: data.site.siteMetadata.siteUrl,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: data.site.siteMetadata.title,
    },
    {
      name: "twitter:description",
      content: metaDescription,
    },
    {
      name: "twitter:image",
      content: `${data.site.siteMetadata.siteUrl}/images/screenshot.png`,
    },
  ]

  const cardColumns = useBreakpoint().l ? 3 : 4

  React.useEffect(() => {
    setTimeout(() => {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    }, 2000)
  }, [])

  return (
    <Layout>
      <SEO title={"Home"} meta={meta} />
      <Grid className="index-org-cards-grid">
        <Notification />
      </Grid>
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <a className="ui orange label">
          {filteredOrganizations.length} results
        </a>
      </div>
      <Grid className="index-org-cards-grid" stackable columns={cardColumns}>
        {filteredOrganizations.map(org => (
          <Grid.Column key={org.name}>
            <OrgCard data={org} />
          </Grid.Column>
        ))}
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

export default IndexPage
