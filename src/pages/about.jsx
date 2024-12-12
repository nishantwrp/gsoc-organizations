import React from "react"
import { graphql } from "gatsby"
import Layout from "../layouts/layout"
import SEO from "../components/seo"
import { Grid } from "semantic-ui-react"
import "./about.css"

//newnew
const AboutPage = ({ data }) => {
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

  return (
    <Layout>
      <SEO title="About Us" meta={meta} />
      <div className="about-container">
        <Grid className="about-content">
          <Grid.Row>
            <Grid.Column>
              <h1 className="about-heading">About Us</h1>
              <p className="about-description">
                GSoC Organizations is a platform to find all past GSoC
                Organizations , Helping you select your project and
                Organizations for the next GSoC .
                <p>
                  {" "}
                  View and analyse the info of the organizations participating
                  in Google Summer of Code and filter them by various
                  parameters.
                </p>
                <p>
                  {" "}
                  Project History: Emphasize that each organization’s history of
                  projects is accessible, which could help prospective
                  applicants understand the type of work they may expect or
                  identify trends across different years.
                </p>
                <p>
                  {" "}
                  Tech Stack Information: Explain that users can see the tech
                  stacks used by each organization, giving developers insight
                  into technologies they may need to know or could learn
                </p>
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="about-background">
            <Grid.Column>
              <h2 className="about-subheading">What is GSoC?</h2>
              <p className="about-text">
                Google Summer of Code (GSoC) is a global online program that
                helps university students contribute to open source software
                development: <br></br>
                <ul>
                  <li>
                    <strong> Goal</strong>
                  </li>
                  To grow the open source ecosystem by bringing new contributors
                  into the community
                  <li>
                    <strong>How it works</strong>
                  </li>
                  Students work on a 12+ week coding project with an open source
                  organization under the guidance of a mentor Benefits Students
                  gain real-world experience, build a network, and earn a
                  stipend for their work
                </ul>
              </p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              {" "}
              <h2 className="about-subheading">Why Gsoc?</h2>
              <p className="about-text">
                If you’re passionate about coding, committed to writing
                high-quality code, and eager to build exceptional software, GSoC
                is the perfect opportunity to channel your enthusiasm. What
                better way to celebrate your love for programming than by
                immersing yourself in a summer dedicated to coding? At its core,
                GSoC is a mentorship program designed to inspire and elevate
                your skills.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <div>
        <a href="https://www.gsocorganizations.dev/">
          <button className="boton-elegante">Explore the Orgs</button>

          <p></p>
        </a>
      </div>
    </Layout>
  )
}
//view all GSoC Org link button should be there , i have to keep about us very short , then define what is GSoC , should include one image in background for GSoC , and some org examples too maybe depends on repo guy bro
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

export default AboutPage
