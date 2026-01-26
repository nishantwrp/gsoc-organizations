import React, { useCallback, useMemo, memo } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import "./sidebar.css"
import Filter from "./filters/filter"

import GitHubButton from "react-github-btn"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { Link } from "gatsby"
import { Icon } from "semantic-ui-react"
import { useAppDispatch } from "../store"
import { clearFilters } from "../store/filters"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { faDatabase } from "@fortawesome/free-solid-svg-icons"

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
        <div className="sidebar-header">
          {showFilters ? (
            <span className="sidebar-title">GSoC Organizations</span>
          ) : (
            <Link to="/" className="sidebar-title-link">
              <span className="sidebar-title">GSoC Organizations</span>
            </Link>
          )}
        </div>

        <div className="sidebar-content" style={filterStyle}>
          <div className="sidebar-content-clear-filters">
            <button className="sidebar-clear-btn" onClick={clearAllFilters}>
              <Icon name="refresh" /> Clear filters
            </button>
          </div>

          <div className="sidebar-content-filters">
            <Filter
              name="shortcuts"
              choices={[{ name: "First-time organizations", frequency: 14 }]}
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
          <div className="sidebar-footer-social">
            <GitHubButton
              data-size="large"
              href="https://github.com/nishantwrp/gsoc-organizations"
              data-icon="octicon-star"
              data-show-count="true"
              aria-label="Star nishantwrp/gsoc-organizations-site on GitHub"
            >
              Star
            </GitHubButton>

            <div className="sidebar-social-icons">
              <OutboundLink
                href="https://api.gsocorganizations.dev/"
                target="_blank"
                rel="noreferrer"
                className="sidebar-icon-link"
              >
                <FontAwesomeIcon icon={faDatabase} />
              </OutboundLink>

              <OutboundLink
                href="https://x.com/nishantwrp"
                target="_blank"
                rel="noreferrer"
                className="sidebar-icon-link"
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </OutboundLink>
            </div>
          </div>

          <div className="sidebar-footer-text-container">
            <span className="sidebar-footer-text">
              Made with <Icon name="heart" className="sidebar-heart-icon" /> by{" "}
              <OutboundLink
                href="https://www.github.com/nishantwrp"
                className="sidebar-footer-link"
                target="_blank"
                rel="noreferrer"
              >
                nishantwrp
              </OutboundLink>
            </span>
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
