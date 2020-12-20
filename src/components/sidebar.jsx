import React from "react"
import PropTypes from "prop-types"

import "./sidebar.css"
import Filter from "./filter"

import Logo from "./logo"
import GitHubButton from "react-github-btn"
import { Link } from "gatsby"
import { Container, Divider, Button, Icon } from "semantic-ui-react"

const getSidebarStyles = config => {
  if (config.mode === "desktop") {
    return {
      width: "inherit",
    }
  }

  if (config.mode === "mobile") {
    const mobileCss = {
      width: "400px",
      maxWidth: "70%",
    }

    if (config.visible) {
      return {
        ...mobileCss,
        transform: "translateX(0%)",
      }
    } else {
      return {
        ...mobileCss,
        transform: "translateX(-100%)",
      }
    }
  }
}

const Sidebar = ({ config, showFilters }) => {
  const filterStyle = () => {
    if (!showFilters) {
      return {
        display: "none",
      }
    }
    return {}
  }

  return (
    <div className="sidebar-sidebar" style={getSidebarStyles(config)}>
      <div className="sidebar-div">
        <div className="sidebar-logo-description">
          <div className="sidebar-logo">
            <Link to="/">
              <Logo size={60}></Logo>
            </Link>
          </div>
          <div className="sidebar-description">
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
        <div className="sidebar-content" style={filterStyle()}>
          <div className="sidebar-content-clear-filters">
            <Button size="tiny" basic color="orange">
              Clear all filters
            </Button>
          </div>
          <div className="sidebar-content-filters">
            <Filter />
            <Filter />
            <Filter />
            <Filter />
          </div>
        </div>
        <div className="sidebar-footer">
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
                    <a
                      href="https://api.gsocorganizations.dev/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button
                        className="sidebar-footer-icon-link"
                        icon
                        compact={true}
                      >
                        <Icon name="database"></Icon>
                      </Button>
                    </a>
                  </td>
                  <td>
                    <a href="mailto:contact@gsocorganizations.dev">
                      <Button
                        className="sidebar-footer-icon-link"
                        icon
                        compact={true}
                      >
                        <Icon name="mail"></Icon>
                      </Button>
                    </a>
                  </td>
                </tr>
              </table>
              <div className="sidebar-footer-text-container">
                <span className="sidebar-footer-text">
                  Made with{" "}
                  <span className="sidebar-footer-icon">
                    <Icon name="heart"></Icon>
                  </span>{" "}
                  and{" "}
                  <a
                    href="https://www.gatsbyjs.org/"
                    className="sidebar-footer-text"
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
  showFilters: PropTypes.bool,
}

Sidebar.defaultProps = {
  config: {
    mode: "desktop",
  },
  showFilters: true,
}

export default Sidebar
