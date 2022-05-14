import React from "react"
import { Grid, Header, List, Icon, GridColumn } from "semantic-ui-react"

import "./org-links.css"
export default function OrgLinks(props) {
  return (
    <div className="org-links-container">
      <Icon name="linkify" /> <b>Important Links</b>
      <List>
        <List.Item as="a">
          <a href="https://noble-split-it.herokuapp.com/">
            <Icon name="right triangle" /> What exactly is {props.data}?
          </a>
        </List.Item>
        <List.Item as="a">
          <a href="https://noble-split-it.herokuapp.com/">
            <Icon name="right triangle" /> Good resources for {props.data}
          </a>
        </List.Item>
        <List.Item as="a">
          <a href="https://noble-split-it.herokuapp.com/">
            <Icon name="right triangle" /> How working for {props.data} feel?
          </a>
        </List.Item>
      </List>
    </div>
  )
}
