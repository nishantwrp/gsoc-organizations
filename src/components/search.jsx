import React, { useMemo, useState, useEffect } from "react"
import { debounce } from "debounce"

import "./search.css"

import { Icon, Input } from "semantic-ui-react"
import { useAppDispatch, useAppSelector } from "../store"
import { getSearch, setSearch } from "../store/search"

const Search = () => {
  const search = useAppSelector(getSearch)
  const dispatch = useAppDispatch()
  const [searchText, setSearchText] = useState(search)

  const dispatchSetSearch = value => {
    dispatch(setSearch(value))
  }

  const debouncedDispatchSetSearch = useMemo(
    () => debounce(dispatchSetSearch, 200),
    []
  )

  const handleChange = ({ target: { value } }) => {
    setSearchText(value)
    debouncedDispatchSetSearch(value)
  }

  return (
    <div className="search-search">
      <Input icon placeholder="Search">
        <input value={searchText} onChange={handleChange.bind(this)} />
        <Icon name="search" />
      </Input>
    </div>
  )
}

export default Search
