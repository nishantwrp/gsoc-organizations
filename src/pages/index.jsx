import React from "react"

import Layout from "../layouts/layout"
import { Card , Icon , List, Image} from "semantic-ui-react"

const CardExampleCardProps = () => (
  <Card>
    <Image src='https://lh3.googleusercontent.com/jq4RtxaUJf4KNYhzaFpeRqkS6MywFFMIpCeQ4FxZduX6HkpS_qQZasGfF1HXy3D9AhFyjQEb378xoolb77sOYdumqt3ASQ' wrapped ui={false} />
    <Card.Content>
      <Card.Header style={{
      textAlign: "center",
      color: "#16697a",
    }}>OPPIA</Card.Header>

      <Card.Meta   style={{
      color: "orange",
      fontWeight: "bold",
      fontFamily: 'Montserrat'
    }} >2016</Card.Meta>
    
      <Card.Description>
      <List  bulleted horizontal>
    <List.Item style={{
      color: "#db6400",
    }} as='a'>C++</List.Item>
     <List.Item style={{
      color: "#db6400",
    }} as='a'>C++</List.Item>
    <List.Item style={{
      color: "#db6400",
    }} as='a'>C++</List.Item>
  </List>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
    <List  horizontal>
    <List.Item as='a'>About Us</List.Item>
    <List.Item as='a'>Sitemap</List.Item>
    <List.Item as='a'>Contact</List.Item>
  </List>
    </Card.Content>
  </Card>
)

const CardExampleCardProps2 = () => (
  <Card>
    <Image src='https://lh3.googleusercontent.com/aaKLhcIBHjVUTOfv1THA3FyAljtzAfxhXWZc_UKrVgNmN1A7Ef753BxfUudazULdnboLTgyXpKbJl4GzRM0-08FVVy_BB6E' wrapped ui={false} />
    <Card.Content>
      <Card.Header style={{
      textAlign: "center",
      color: "#16697a",
    }}>KODI</Card.Header>

      <Card.Meta   style={{
      color: "orange",
      fontWeight: "bold",
      fontFamily: 'Montserrat'
    }} >2016</Card.Meta>
    
      <Card.Description>
      <List  bulleted horizontal>
    <List.Item style={{
      color: "#db6400",
    }} as='a'>C++</List.Item>
     <List.Item style={{
      color: "#db6400",
    }} as='a'>C++</List.Item>
    <List.Item style={{
      color: "#db6400",
    }} as='a'>C++</List.Item>
  </List>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
    <List  horizontal>
    <List.Item as='a'>About Us</List.Item>
    <List.Item as='a'>Sitemap</List.Item>
    <List.Item as='a'>Contact</List.Item>
  </List>
    </Card.Content>
  </Card>
)

// export default CardExampleCardProps

const items2 = Array(100).fill({
  header: "Project Report - April",
  description:
    "Leverage agile frameworks to provide a robust synopsis for high level overviews.",
  meta: "ROI: 30%",
  image:'https://repository-images.githubusercontent.com/40687563/6ebdd900-b879-11e9-927a-490af85f8567',
  header:'Elliot Baker',
  meta:'Friend',
  description:'Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.',
})

const items = Array(100).fill({
  image:'https://repository-images.githubusercontent.com/40687563/6ebdd900-b879-11e9-927a-490af85f8567',
  header: "Project Report - April",
  description:
    "Leverage agile frameworks to provide a robust synopsis for high level overviews.",
  meta: "ROI: 30%",
})

let rows=[];
for(let i=0;i<100;i++)
{
  rows.push(<CardExampleCardProps key={i}/>)
}

const IndexPage = () => (
  <Layout>
     {/* <rows/> */}

    <div  >
    <CardExampleCardProps/> 
     <CardExampleCardProps2/> 
    {/* <Card.Group items={items} />  */}
      {/* <div class="ui card"><div class="image"><img src="/images/avatar/large/elliot.jpg"/></div><div class="content"><div class="header">Elliot Baker</div><div class="meta">Friend</div><div class="description">Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.</div></div><div class="extra content"><a><i aria-hidden="true" class="user icon"></i>16 Friends</a></div></div> */}
     </div> 
  </Layout>
)

export default IndexPage
