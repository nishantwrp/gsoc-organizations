import React from "react"
import PropTypes from "prop-types"

import "./filter.css"

import FilterTemplate from "./filter-template"
import FilterModal from "./filter-modal"
import { Checkbox, Input, Divider } from "semantic-ui-react"

class Filter extends FilterTemplate {
  DEFAULT_OPTIONS_DISPLAYED = 5

  constructor(props) {
    super(props, {})
  }

  render() {
    let filteredCheckboxes = this.getFilteredOptionsIndexes().map(index => {
      return (
        <tr>
          <td>
            <Checkbox
              checked={this.getAllOptions()[index].selected}
              label={this.getCheckboxLabel(index)}
              value={this.getAllOptions()[index].selected}
              onChange={this.toggleChecked(index)}
            />
          </td>
        </tr>
      )
    })

    const max_options_displayed = Math.max(
      this.getOptionIndexes(true).length,
      this.DEFAULT_OPTIONS_DISPLAYED
    )
    const num_options_displayed = Math.min(
      max_options_displayed,
      filteredCheckboxes.length
    )
    filteredCheckboxes = filteredCheckboxes.slice(0, num_options_displayed)
    const displayModalOption =
      this.getAllOptions().length > num_options_displayed

    return (
      <div className="filter-filter">
        <div className="filter-topic">
          <u>{this.props.name}</u>
        </div>
        <div className="filter-search">
          <Input
            size="mini"
            icon="search"
            value={this.state.searchQuery}
            placeholder={`Search ${this.props.name}`}
            onChange={this.handleSearchQuery.bind(this)}
          />
        </div>
        <div className="filter-boxes">
          <center>
            <div className="filter-boxes-container">
              <table>{filteredCheckboxes}</table>
            </div>
          </center>
        </div>
        <div style={displayModalOption ? {} : { display: "none" }}>
          <FilterModal
            name={this.props.name}
            optionsState={this.props.optionsState}
            updateAllFilters={this.props.updateAllFilters}
            sortBy={this.props.sortBy}
            trigger={<div className="filter-view-more">View all</div>}
          />
        </div>
        <div style={this.props.showDivider ? {} : { display: "none" }}>
          <center>
            <Divider className="filter-divider" />
          </center>
        </div>
      </div>
    )
  }
}

Filter.propTypes = {
  ...FilterTemplate.propTypes,
  name: PropTypes.string.isRequired,
  showDivider: PropTypes.bool,
}

Filter.defaultProps = {
  showDivider: true,
}

export default Filter
