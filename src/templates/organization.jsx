import React from "react"
import slugify from "slugify"
import { graphql } from "gatsby"

import "./organization.css"

import Layout from "../layouts/layout"
import OrgInfo from "../components/org-info"
import ProjectsGraph from "../components/projects-graph"
import SEO from "../components/seo"
import { Grid } from "semantic-ui-react"

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
      content: `${
        data.site.siteMetadata.siteUrl
      }/organization/${slugify(organization.name, { lower: true })}/`,
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

  return (
    <Layout homePage={false}>
      <SEO title={organization.name} meta={meta} />
      <div className="organization-name-container">{organization.name}</div>
      <Grid className="organization-content-grid" stackable columns={2}>
        <Grid.Column>
          <OrgInfo data={organization} />
        </Grid.Column>
        <Grid.Column>
          <ProjectsGraph data={organization.years} />
          <div>
            <script
              async
              src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            ></script>
            <ins
              class="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-9769516184087442"
              data-ad-slot="9135360049"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
            <script
              dangerouslySetInnerHTML={{
                __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
              }}
            ></script>
          </div>
        </Grid.Column>
      </Grid>
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
  }
`

export default OrganizationPage
