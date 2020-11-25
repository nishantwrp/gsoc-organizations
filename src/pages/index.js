import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Footer from "../components/footer"
import Image from "../components/image"
import SEO from "../components/seo"
import 'semantic-ui-css/semantic.min.css'
import { Button ,Header, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'

const IndexPage = () => (
  <div>

<Sidebar as={Menu} position='fixed' icon='labeled' inverted vertical visible float ='left' color="pink" width='wide' overflow= 'scroll' height='100%'>
  Filter
  <Menu.Item as={Link} to="/admin">
          <Icon name='building' />
          Rubykraft
       </Menu.Item>
       <Menu.Item >
          <Icon name='user' />
          Shan
       </Menu.Item>
       <Menu.Item as='a'>
         <Icon name='user' />
         Vishnu
       </Menu.Item> 
       <Footer message="Contact us @developers">

       </Footer>
</Sidebar>

  <Layout>
    <SEO title="Home" />


    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/"><button className="ui button">Click Here tto (goto page 2)become db</button></Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
  </div>
)

export default IndexPage
