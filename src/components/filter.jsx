import React from "react"
import PropTypes from "prop-types"

import "./filter.css"

import FilterModal from "./filter-modal"
import { Checkbox, Input, Divider } from "semantic-ui-react"

const Filter = ({ name, optionsState, showDivider, updateAllFilters }) => {
  let [allOptions, setOptions] = optionsState

  const toggleChecked = index => {
    return () => {
      const newOptions = allOptions
      newOptions[index].selected = !newOptions[index].selected
      setOptions(newOptions)
      updateAllFilters()
    }
  }

  let filterCheckboxes = []
  for (let i = 0; i < allOptions.length && i < 5; i++) {
    filterCheckboxes.push(
      <tr>
        <td>
          <Checkbox
            checked={allOptions[i].selected}
            label={allOptions[i].name}
            value={allOptions[i].selected}
            onChange={toggleChecked(i)}
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
        <Input size="mini" icon="search" placeholder={`Search ${name}`} />
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
