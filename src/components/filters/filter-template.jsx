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
    this.getAllOptions().map((value, index) => {
      if (value.selected == selected) {
        indexes.push(index)
      }
    })
    return indexes
  }

  getFilteredOptionsIndexes() {
    let filteredOptionIndexes = this.getOptionIndexes(true).concat(
      this.getOptionIndexes(false)
    )

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
}

export default FilterTemplate
