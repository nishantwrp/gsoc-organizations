import React from "react"

import "semantic-ui-less/semantic.less"
import "./mobileheader.css"
import ReactDOM from "react-dom"
// import SidebarExampleTransitions from "./learnsidebar"
import Logo from "./logo"
import { Button, Grid, Divider } from "semantic-ui-react"
import { Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react"
import MobileSidebar from "./mobilesidebar"

const VerticalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    // as={Menu}
    animation={animation}
    direction={direction}
    icon="labeled"
    inverted
    vertical
    visible={visible}
    width="80%"
  >
    <MobileSidebar />
  </Sidebar>
)

function exampleReducer(state, action) {
  switch (action.type) {
    case "CHANGE_ANIMATION":
      return { ...state, animation: action.animation, visible: !state.visible }
    case "CHANGE_DIMMED":
      return { ...state, dimmed: action.dimmed }
    case "CHANGE_DIRECTION":
      return { ...state, direction: action.direction, visible: false }
    default:
      throw new Error()
  }
}

const optionshandler = () => {
  console.log("function insideee")
  ReactDOM.render(
    <MobileSidebar />,
    document.getElementsByClassName("mobileheader-mobileheader")[0]
  )
}

const MobileHeader = () => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    animation: "overlay",
    direction: "left",
    dimmed: false,
    visible: false,
  })

  const { animation, dimmed, direction, visible } = state
  const vertical = direction === "bottom" || direction === "top"

  return (
    <div class="mobileheader-mobileheader">
      <Sidebar.Pushable
        as={Segment}
        class="mobileheader-mobileheader"
        style={{ overflow: "hidden" }}
      >
        {!vertical && (
          <VerticalSidebar
            animation={animation}
            direction={direction}
            visible={visible}
          />
        )}

        <Sidebar.Pusher
          class="mobileheader-mobileheader"
          dimmed={dimmed && visible}
        >
          <Segment basic>
            <div class="mobileheader-div">
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
                          onClick: () =>
                            dispatch({
                              type: "CHANGE_ANIMATION",
                              animation: "overlay",
                            }),
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
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  )
}

export default MobileHeader
