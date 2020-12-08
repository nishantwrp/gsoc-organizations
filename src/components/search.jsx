import React from "react"

import "./search.css"

import { Icon, Input } from "semantic-ui-react"

const Search = () => {
  return (
    <div className="search-search">
      <Input icon placeholder="Search">
        <input />
        <Icon name="search" />
      </Input>
    </div>
  )
}

export default Search
