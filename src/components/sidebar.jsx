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
    options.forEach(option => {
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

  const topicsState = React.useState(
    topics.map(topic => {
      return {
        name: topic.name,
        frequency: topic.frequency,
        selected: !!filtersState?.filters.topics.includes(topic.name),
      }
    })
  )
  const technologiesState = React.useState(
    technologies.map(technology => {
      return {
        name: technology.name,
        frequency: technology.frequency,
        selected: !!filtersState?.filters.technologies.includes(
          technology.name
        ),
      }
    })
  )
  const yearsState = React.useState(
    years.map(year => {
      return {
        name: year.name,
        frequency: year.frequency,
        selected: !!filtersState?.filters.years.includes(year.name),
      }
    })
  )
  const categoriesState = React.useState(
    categories.map(category => {
      return {
        name: category.name,
        frequency: category.frequency,
        selected: !!filtersState?.filters.categories.includes(category.name),
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
          frequency: option.frequency,
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
          <Divider className="sidebar-divider" />
          <div className="sidebar-content-filters">
            <Filter
              name="Years"
              updateAllFilters={updateAllFilters}
              optionsState={yearsState}
              sortBy="name"
            />
            <Filter
              name="Categories"
              updateAllFilters={updateAllFilters}
              optionsState={categoriesState}
              sortBy="name"
            />
            <Filter
              name="Technologies"
              updateAllFilters={updateAllFilters}
              optionsState={technologiesState}
              sortBy="frequency"
            />
            <Filter
              name="Topics"
              updateAllFilters={updateAllFilters}
              optionsState={topicsState}
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
                      <OutboundLink
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
                      </OutboundLink>
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
                  <OutboundLink
                    href="https://www.github.com/nishantwrp"
                    className="sidebar-footer-text"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <u>nishantwrp</u>
                  </OutboundLink>
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
