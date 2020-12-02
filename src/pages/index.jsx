import React from "react"

import Layout from "../layouts/layout"
import { Card } from "semantic-ui-react"

const items = Array(100).fill({
  header: "Project Report - April",
  description:
    "Leverage agile frameworks to provide a robust synopsis for high level overviews.",
  meta: "ROI: 30%",
})

const IndexPage = () => (
  <Layout>
    <div style={{ maxWidth: "100%" }}>
      <Card.Group items={items} />
    </div>
  </Layout>
)

export default IndexPage
