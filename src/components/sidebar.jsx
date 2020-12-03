import React from "react"
import PropTypes from "prop-types"

import "semantic-ui-less/semantic.less"
import "./sidebar.css"

import Logo from "./logo"
import GitHubButton from "react-github-btn"
import { Container, Divider, Button, Icon } from "semantic-ui-react"

const getSidebarStyles = config => {
  if (config.mode === "desktop") {
    return [
      {
        width: "inherit",
      },
    ]
  }

  if (config.mode === "mobile") {
    if (config.visible) {
      return [
        {
          width: "60%",
        },
      ]
    } else {
      return [
        {
          width: "0px",
        },
        {
          display: "none",
        },
      ]
    }
  }
}

const Sidebar = ({ config }) => {
  return (
    <div class="sidebar-sidebar" style={getSidebarStyles(config)[0]}>
      <div class="sidebar-div" style={getSidebarStyles(config)[1]}>
        <div class="sidebar-logo-description">
          <div class="sidebar-logo">
            <Logo size={60}></Logo>
          </div>
          <div class="sidebar-description">
            <Container>
              {" "}
              open-source organizations participating in{" "}
              <a href="https://summerofcode.withgoogle.com/">
                Google Summer of Code
              </a>{" "}
              since 2016{" "}
            </Container>
          </div>
        </div>
        <div class="sidebar-content">Filter Content</div>
        <div class="sidebar-footer">
          <center>
            <Divider className="sidebar-footer-divider" />
          </center>
          <div>
            <center>
              <table>
                <tr>
                  <td>
                    <GitHubButton
                      data-size="large"
                      href="https://github.com/nishantwrp/gsoc-organizations-site"
                      data-icon="octicon-star"
                      data-show-count="true"
                      aria-label="Star nishantwrp/gsoc-organizations-site on GitHub"
                    >
                      Star
                    </GitHubButton>
                  </td>
                  <td>
                    <a href="mailto:contact@gsocorganizations.dev">
                      <Button basic color="black" compact={true}>
                        <Icon name="mail"></Icon>Contact
                      </Button>
                    </a>
                  </td>
                </tr>
              </table>
              <div class="sidebar-footer-text-container">
                <span class="sidebar-footer-text">
                  Made with{" "}
                  <span class="sidebar-footer-icon">
                    <Icon name="heart"></Icon>
                  </span>{" "}
                  and{" "}
                  <a
                    href="https://www.gatsbyjs.org/"
                    class="sidebar-footer-text"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <u>Gatsby</u>
                  </a>
                </span>
              </div>
            </center>
          </div>
        </div>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  config: PropTypes.object,
}

Sidebar.defaultProps = {
  config: {
    mode: "desktop",
  },
}

export default Sidebar
