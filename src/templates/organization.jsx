import React from "react"
import slugify from "slugify"
import { graphql, Link } from "gatsby"

import "./organization.css"

import Layout from "../layouts/layout"
import OrgInfo from "../components/org-info"
import ProjectsGraph from "../components/projects-graph"
import ProjectsSection from "../components/projects-section"
import SEO from "../components/seo"
import { Grid } from "semantic-ui-react"
import { createOrgChartData } from "../utils/chartData"

const OrganizationPage = ({ pageContext: { organization }, data }) => {
  const metaTitle = `${organization.name} | ${data.site.siteMetadata.title}`
  const metaDescription = `View and analyse the years of participation, technologies, number of projects, etc of ${organization.name} in Google Summer of Code.`
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
      content: metaTitle,
    },
    {
      property: "og:description",
      content: metaDescription,
    },
    {
      property: "og:image",
      content: organization.image_url,
    },
    {
      property: "og:site_name",
      content: data.site.siteMetadata.title,
    },
    {
      property: "og:url",
      content: `${data.site.siteMetadata.siteUrl}/organization/${slugify(
        organization.name,
        { lower: true }
      )}/`,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: metaTitle,
    },
    {
      name: "twitter:description",
      content: metaDescription,
    },
    {
      name: "twitter:image",
      content: organization.image_url,
    },
  ]

  const orgChartData = createOrgChartData(
    data.filter.years.map(item => item.name),
    organization.years
  )

  React.useEffect(() => {
    setTimeout(() => {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    }, 2000)
  }, [])

  return (
    <Layout>
      <SEO title={organization.name} meta={meta} />
      <div className="organization-back-btn-container">
        <Link to="/" className="organization-back-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="currentColor"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Back to Home
        </Link>
      </div>
      <Grid
        className="organization-content-grid"
        stackable
        columns={2}
        stretched
      >
        <Grid.Column>
          <OrgInfo data={organization} />
        </Grid.Column>
        <Grid.Column>
          {!!orgChartData.years.length && <ProjectsGraph data={orgChartData} />}
          <div className="organization-graph-ad-container">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-9769516184087442"
              data-ad-slot="9135360049"
              data-ad-format="auto"
              data-full-width-responsive="false"
            ></ins>
          </div>
        </Grid.Column>
      </Grid>
      {/* TODO(nishantwrp): This is temp fix. Refactor it. */}
      {!!Object.keys(organization.years).filter(y => y != 2026).length && (
        <div className="organization-projects-wrapper">
          <h2 className="organization-section-heading">Past Projects</h2>
          <ProjectsSection data={organization.years} />
        </div>
      )}
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
    filter {
      years {
        name
      }
    }
  }
`

export default OrganizationPage
