import React from "react"
import PropTypes from "prop-types"
import Fuse from "fuse.js"

import { addFilter, removeFilter } from "../../store/filters"

class FilterTemplate extends React.Component {
  constructor(props, initialStates) {
    super(props)

    this.state = {
      ...initialStates,
      searchQuery: "",
    }
  }

  getDisplayableName() {
    return this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)
  }

  getAllOptions() {
    return this.props.choices
  }

  getOptionFromIndex(index) {
    return this.getAllOptions()[index]
  }

  isOptionSelected(option) {
    return this.props.filters.includes(option.name)
  }

  isIndexSelected(index) {
    return this.isOptionSelected(this.getOptionFromIndex(index))
  }

  toggleChecked(index) {
    return () => {
      const option = this.getOptionFromIndex(index).name
      this.isIndexSelected(index)
        ? this.props.removeFilter(option)
        : this.props.addFilter(option)
    }
  }

  getFuseSearch() {
    return new Fuse(this.getAllOptions(), {
      threshold: 0.3,
      keys: ["name"],
    })
  }

  handleSearchQuery(e, input) {
    this.setState(state => {
      return {
        ...state,
        searchQuery: input.value,
      }
    })
  }

  getOptionIndexes(selected) {
    const indexes = []
    this.getAllOptions().forEach((value, index) => {
      if (this.isOptionSelected(value) === selected) {
        indexes.push(index)
      }
    })
    return indexes
  }

  getSortedOptionIndexes() {
    const sortOrder = this.props.order === "asc" ? 1 : -1

    const sortedOptions = this.getAllOptions().sort((a, b) => {
      if (this.isOptionSelected(a) ^ this.isOptionSelected(b)) {
        return this.isOptionSelected(a) ? -1 : 1
      }

      if (this.props.sortBy === "name") {
        return (a.name > b.name ? 1 : -1) * sortOrder
      }

      if (this.props.sortBy === "frequency") {
        return a.frequency === b.frequency
          ? a.name > b.name
            ? 1
            : -1
          : a.frequency > b.frequency
          ? -1
          : 1
      }
    })
    return sortedOptions.map(item => this.getAllOptions().indexOf(item))
  }

  getCheckboxLabel(index) {
    if (this.props.sortBy === "frequency") {
      return `${this.getAllOptions()[index].name} (${
        this.getAllOptions()[index].frequency
      })`
    }

    return this.getAllOptions()[index].name
  }

  getFilteredOptionsIndexes() {
    let filteredOptionIndexes = this.getSortedOptionIndexes()

    if (this.state.searchQuery !== "") {
      const fuse = this.getFuseSearch()
      filteredOptionIndexes = fuse
        .search(this.state.searchQuery)
        .map(res => res.refIndex)
    }

    return filteredOptionIndexes
  }

  render() {
    return <></>
  }
}

FilterTemplate.propTypes = {
  name: PropTypes.string.isRequired,
  sortBy: PropTypes.oneOf(["name", "frequency"]).isRequired,
  order: PropTypes.oneOf(["asc", "desc"]),
}

FilterTemplate.defaultProps = {
  order: "asc",
}

export const mapStateWithProps = (state, ownProps) => {
  return { filters: state.filters[ownProps.name] }
}

export const mapDispatchWithProps = (dispatch, ownProps) => {
  return {
    addFilter: val => dispatch(addFilter({ val, name: ownProps.name })),
    removeFilter: val => dispatch(removeFilter({ val, name: ownProps.name })),
  }
}

export default FilterTemplate
