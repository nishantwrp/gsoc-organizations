import React from "react"
import PropTypes from "prop-types"
import Fuse from "fuse.js"

class FilterTemplate extends React.Component {
  constructor(props, initialStates) {
    super(props)

    this.state = {
      ...initialStates,
      searchQuery: "",
    }
  }

  getAllOptions() {
    return this.props.optionsState[0]
  }

  updateOptions(newOptions) {
    return this.props.optionsState[1](newOptions)
  }

  toggleChecked(index) {
    return () => {
      const newOptions = this.getAllOptions()
      newOptions[index].selected = !newOptions[index].selected
      this.updateOptions(newOptions)
      this.props.updateAllFilters()
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
      if (value.selected === selected) {
        indexes.push(index)
      }
    })
    return indexes
  }

  getSortedOptionIndexes() {
    const sortedOptions = this.getAllOptions().sort((a, b) => {
      if (a.selected ^ b.selected) {
        return a.selected ? -1 : 1
      }

      if (this.props.sortBy === "name") {
        return a.name > b.name ? 1 : -1
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
  optionsState: PropTypes.array.isRequired,
  updateAllFilters: PropTypes.func.isRequired,
  sortBy: PropTypes.oneOf(["name", "frequency"]).isRequired,
}

export default FilterTemplate
