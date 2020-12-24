import React, { useState } from "react"
import PropTypes from "prop-types"
import Fuse from "fuse.js"

import "./filter.css"

import FilterModal from "./filter-modal"
import { Checkbox, Input, Divider } from "semantic-ui-react"

const Filter = ({ name, optionsState, showDivider, updateAllFilters }) => {
  let [allOptions, setOptions] = optionsState
  const [searchQuery, setSearchQuery] = React.useState("")

  const toggleChecked = index => {
    return () => {
      const newOptions = allOptions
      newOptions[index].selected = !newOptions[index].selected
      setOptions(newOptions)
      updateAllFilters()
    }
  }

  const getFuseSearch = allOptions => {
    const options = {
      threshold: 0.3,
      keys: ["name"],
    }

    return new Fuse(allOptions, options)
  }

  const handleChange = e => {
    setSearchQuery(e.target.value)
  }

  const getSelectedOptionIndexes = allOptions => {
    const selectedIndexes = []
    allOptions.map((value, index) => {
      if (value.selected) {
        selectedIndexes.push(index)
      }
    })
    return selectedIndexes
  }

  const getUnselectedOptionIndexes = allOptions => {
    const unselectedIndexes = []
    allOptions.map((value, index) => {
      if (!value.selected) {
        unselectedIndexes.push(index)
      }
    })
    return unselectedIndexes
  }

  const getfilteredCheckboxes = (allOptions, searchQuery) => {
    let filteredOptionIndexes = getSelectedOptionIndexes(allOptions)
    filteredOptionIndexes = filteredOptionIndexes.concat(
      getUnselectedOptionIndexes(allOptions)
    )

    if (searchQuery !== "") {
      const fuse = getFuseSearch(allOptions)
      filteredOptionIndexes = fuse.search(searchQuery).map(res => res.refIndex)
    }

    return filteredOptionIndexes
  }

  let filteredCheckboxes = getfilteredCheckboxes(allOptions, searchQuery)

  let filterCheckboxes = []
  for (let i = 0; i < filteredCheckboxes.length && i < 5; i++) {
    filterCheckboxes.push(
      <tr>
        <td>
          <Checkbox
            checked={allOptions[filteredCheckboxes[i]].selected}
            label={allOptions[filteredCheckboxes[i]].name}
            value={allOptions[filteredCheckboxes[i]].selected}
            onChange={toggleChecked(filteredCheckboxes[i])}
          />
        </td>
      </tr>
    )
  }

  const displayModalOption = allOptions.length > 5

  return (
    <div className="filter-filter">
      <div className="filter-topic">
        <u>{name}</u>
      </div>
      <div className="filter-search">
        <Input
          size="mini"
          icon="search"
          placeholder={`Search ${name}`}
          onChange={handleChange.bind(this)}
        />
      </div>
      <div className="filter-boxes">
        <center>
          <div className="filter-boxes-container">
            <table>{filterCheckboxes}</table>
          </div>
        </center>
      </div>
      <div style={displayModalOption ? {} : { display: "none" }}>
        <FilterModal
          name={name}
          optionsState={optionsState}
          updateAllFilters={updateAllFilters}
          trigger={<div className="filter-view-more">View all</div>}
          searchState={{
            searchQuery: searchQuery,
            setSearchQuery: setSearchQuery,
          }}
        />
      </div>
      <div style={showDivider ? {} : { display: "none" }}>
        <center>
          <Divider className="filter-divider" />
        </center>
      </div>
    </div>
  )
}

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  optionsState: PropTypes.array.isRequired,
  showDivider: PropTypes.bool,
  updateAllFilters: PropTypes.func.isRequired,
}

Filter.defaultProps = {
  showDivider: true,
}

export default Filter
