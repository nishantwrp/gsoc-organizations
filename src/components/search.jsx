import React from "react"
import PropTypes from "prop-types"

import "./search.css"

import { Icon, Input } from "semantic-ui-react"

const Search = ({ searchState }) => {
  if (searchState === undefined) {
    return <></>
  }

  const { searchQuery, setSearchQuery } = searchState

  const handleChange = e => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="search-search">
      <Input icon placeholder="Search">
        <input value={searchQuery} onChange={handleChange.bind(this)} />
        <Icon name="search" />
      </Input>
    </div>
  )
}

Search.propTypes = {
  searchState: PropTypes.object,
}

export default Search
