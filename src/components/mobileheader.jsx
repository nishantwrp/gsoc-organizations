import React from "react"

import "semantic-ui-less/semantic.less"
import "./mobileheader.css"
import ReactDOM from "react-dom"

import Logo from "./logo"
import { Button, Grid, Divider } from "semantic-ui-react"
import MobileSidebar from "./mobilesidebar"

const optionshandler = () => {
  console.log("function insideee")
  ReactDOM.render(
    <MobileSidebar />,
    document.getElementsByClassName("mobileheader-mobileheader")[0]
  )
}

const MobileHeader = () => {
  return (
    <div class="mobileheader-mobileheader">
      <div class="mobileheader-div">
        <div class="mobileheader-logo-description">
          <div class="mobileheader-logo">
            <Logo size={20}></Logo>
          </div>
        </div>

        <div class="mobileheader-search-description">searchh</div>

        <div class="mobileheader-options-button">
          <span class="options-button">
            <Button.Group
              buttons={[
                {
                  key: "align justify",
                  icon: "align justify",
                  onClick: () => {
                    optionshandler()
                  },
                  color: "red",
                },
              ]}
            />{" "}
          </span>
        </div>
      </div>
      <center>
        <Divider />
      </center>
    </div>
  )
}

export default MobileHeader
