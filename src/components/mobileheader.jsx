import React from "react"

import "semantic-ui-less/semantic.less"
import "./mobileheader.css"

import Logo from "./logo"
import { Button, Grid } from "semantic-ui-react"

const getButtonStyle = {
  marginTop: "-4px",
  marginLeft: "110px",
  marginRight: "1px",
}

const MobileHeader = () => {
  return (
    <Grid className="mobile-layout-grid">
      <Grid.Row className="mobile-layout-grid-row">
        {
          <Grid.Column className="mobile-layout-grid-column" width={4}>
            <Logo size={20}></Logo>
          </Grid.Column>
        }
        {
          <Grid.Column className="mobile-layout-grid-column" width={6}>
            SEARCH bar
          </Grid.Column>
        }
        {
          <Grid.Column className="mobile-layout-grid-column" width={4}>
            <div style={getButtonStyle}>
              <Button.Group
                buttons={[{ key: "align justify", icon: "align justify" }]}
              />{" "}
            </div>
          </Grid.Column>
        }
      </Grid.Row>
    </Grid>
  )
}

export default MobileHeader
