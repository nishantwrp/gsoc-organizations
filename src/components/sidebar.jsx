import React, { useCallback, useMemo, memo } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import "./sidebar.css"
import Filter from "./filters/filter"

import GitHubButton from "react-github-btn"
import { Link } from "gatsby"
import { Container, Divider, Button, Icon } from "semantic-ui-react"
import { useAppDispatch } from "../store"
import { clearFilters } from "../store/filters"

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
  const dispatch = useAppDispatch()
  const sidebarStyle = useMemo(() => getSidebarStyles(config), [config])
  const filterStyle = showFilters ? {} : { display: "none" }

  const {
    filter: { topics, technologies, years, categories },
  } = useStaticQuery(graphql`
    {
      filter {
        topics {
          name
          frequency
        }
        technologies {
          name
          frequency
        }
        years {
          name
          frequency
        }
        categories {
          name
          frequency
        }
      }
    }
  `)

  const clearAllFilters = useCallback(() => {
    dispatch(clearFilters())
  }, [dispatch])

  return (
    <div className="sidebar-sidebar" style={sidebarStyle}>
      <div className="sidebar-div">
        <div className="sidebar-logo-description">
          <div className="sidebar-description">
            {showFilters ? (
              <Container>GSoC Organizations</Container>
            ) : (
              <Link to="/">
                <Container>GSoC Organizations</Container>
              </Link>
            )}
          </div>
        </div>
        <div className="sidebar-content" style={filterStyle}>
          <div className="sidebar-content-clear-filters">
            <Button size="tiny" basic color="orange" onClick={clearAllFilters}>
              Clear all filters
            </Button>
          </div>
          <Divider className="sidebar-divider" />
          <div className="sidebar-content-filters">
            <Filter
              name="shortcuts"
              choices={[{ name: "First-time organizations", frequency: 20 }]}
              sortBy="frequency"
            />
            <Filter name="years" choices={years} sortBy="name" order="desc" />
            <Filter name="categories" choices={categories} sortBy="name" />
            <Filter
              name="technologies"
              choices={technologies}
              sortBy="frequency"
            />
            <Filter
              name="topics"
              choices={topics}
              showDivider={false}
              sortBy="frequency"
            />
          </div>
        </div>
        <div className="sidebar-footer">
          <Divider className="sidebar-divider" />
          <div>
            <center>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <GitHubButton
                        data-size="large"
                        href="https://github.com/nishantwrp/gsoc-organizations"
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
                      <a
                        href="https://www.twitter.com/nishantwrp"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button
                          className="sidebar-footer-icon-link"
                          icon
                          compact={true}
                        >
                          <Icon name="twitter"></Icon>
                        </Button>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="sidebar-footer-text-container">
                <span className="sidebar-footer-text">
                  Made with{" "}
                  <span className="sidebar-footer-icon">
                    <Icon name="heart"></Icon>
                  </span>{" "}
                  by{" "}
                  <a
                    href="https://www.github.com/nishantwrp"
                    className="sidebar-footer-text"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <u>nishantwrp</u>
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

export default memo(Sidebar)
