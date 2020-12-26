import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import "./sidebar.css"
import Filter from "./filters/filter"

import Logo from "./logo"
import GitHubButton from "react-github-btn"
import { OutboundLink } from "gatsby-plugin-google-analytics"
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

const updateFiltersState = (
  setFilters,
  topics,
  technologies,
  years,
  categories
) => {
  const getSelectedValues = options => {
    const selectedValues = []
    options.map(option => {
      if (option.selected) {
        selectedValues.push(option.name)
      }
    })
    return selectedValues
  }

  setFilters({
    years: getSelectedValues(years),
    categories: getSelectedValues(categories),
    technologies: getSelectedValues(technologies),
    topics: getSelectedValues(topics),
  })
}

const Sidebar = ({ config, showFilters, filtersState }) => {
  const {
    filter: { topics, technologies, years, categories },
  } = useStaticQuery(graphql`
    {
      filter {
        topics
        technologies
        years
        categories
      }
    }
  `)

  const topicsState = React.useState(
    topics.map(topic => {
      return {
        name: topic,
        selected: false,
      }
    })
  )
  const technologiesState = React.useState(
    technologies.map(technology => {
      return {
        name: technology,
        selected: false,
      }
    })
  )
  const yearsState = React.useState(
    years.map(year => {
      return {
        name: year,
        selected: false,
      }
    })
  )
  const categoriesState = React.useState(
    categories.map(category => {
      return {
        name: category,
        selected: false,
      }
    })
  )

  const updateAllFilters = () => {
    updateFiltersState(
      filtersState.setFilters,
      topicsState[0],
      technologiesState[0],
      yearsState[0],
      categoriesState[0]
    )
  }

  const clearAllFilters = () => {
    const clearFilter = filterState => {
      const [filter, setFilter] = filterState
      const unselectedOptions = filter.map(option => {
        return {
          name: option.name,
          selected: false,
        }
      })
      setFilter(unselectedOptions)
    }

    clearFilter(topicsState)
    clearFilter(technologiesState)
    clearFilter(yearsState)
    clearFilter(categoriesState)

    filtersState.setFilters({
      years: [],
      categories: [],
      technologies: [],
      topics: [],
    })
  }

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
            <Container>GSoC Organizations</Container>
          </div>
        </div>
        <div className="sidebar-content" style={filterStyle()}>
          <div className="sidebar-content-clear-filters">
            <Button size="tiny" basic color="orange" onClick={clearAllFilters}>
              Clear all filters
            </Button>
          </div>
          <div className="sidebar-content-filters">
            <Filter
              name="Years"
              updateAllFilters={updateAllFilters}
              optionsState={yearsState}
            />
            <Filter
              name="Categories"
              updateAllFilters={updateAllFilters}
              optionsState={categoriesState}
            />
            <Filter
              name="Technologies"
              updateAllFilters={updateAllFilters}
              optionsState={technologiesState}
            />
            <Filter
              name="Topics"
              updateAllFilters={updateAllFilters}
              optionsState={topicsState}
              showDivider={false}
            />
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
                      href="https://github.com/nishantwrp/gsoc-organizations"
                      data-icon="octicon-star"
                      data-show-count="true"
                      aria-label="Star nishantwrp/gsoc-organizations-site on GitHub"
                    >
                      Star
                    </GitHubButton>
                  </td>
                  <td>
                    <OutboundLink
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
                    </OutboundLink>
                  </td>
                  <td>
                    <a href="mailto:contact@gsocorganizations.dev">
                      <OutboundLink
                        className="sidebar-footer-icon-link"
                        icon
                        compact={true}
                      >
                        <Icon name="mail"></Icon>
                      </OutboundLink>
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
  filtersState: PropTypes.object,
}

Sidebar.defaultProps = {
  config: {
    mode: "desktop",
  },
  showFilters: true,
}

export default Sidebar
