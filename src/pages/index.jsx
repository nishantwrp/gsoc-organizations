import React from "react"
import { Link } from "gatsby"

import Layout from "../layouts/layout"
import SEO from "../components/seo"
import "semantic-ui-less/semantic.less"
import { Button } from "semantic-ui-react"
import Logo from "../components/logo"
import { Grid, Image, Segment } from "semantic-ui-react"

const GridExampleStackable = () => (
  <Grid stackable columns={2}>
    <Grid.Column>
      <Segment>
        <Image src="/images/wireframe/paragraph.png" />
      </Segment>
    </Grid.Column>
    <Grid.Column>
      <Segment>
        <Image src="/images/wireframe/paragraph.png" />
      </Segment>
    </Grid.Column>
  </Grid>
)

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Logo color="#14274e"></Logo>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
  </Layout>
)

export default IndexPage
