import React from "react"

import "./search.css"

import { Icon, Input } from "semantic-ui-react"
import { useAppDispatch, useAppSelector } from "../store"
import { getSearch, setSearch } from "../store/search"

const Search = () => {
  const search = useAppSelector(getSearch)
  const dispatch = useAppDispatch()

  const handleChange = e => {
    dispatch(setSearch(e.target.value))
  }

  return (
    <div className="search-search">
      <Input icon placeholder="Search">
        <input value={search} onChange={handleChange.bind(this)} />
        <Icon name="search" />
      </Input>
    </div>
  )
}

export default Search
