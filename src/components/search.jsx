import React, { useMemo, useState, useCallback, useEffect, memo } from "react"
import { debounce } from "debounce"
import PropTypes from "prop-types"

import "./search.css"

import { Icon } from "semantic-ui-react"
import { useAppDispatch, useAppSelector } from "../store"
import { getSearch, setSearch } from "../store/search"
import { EventBus } from "../utils/events"

const Search = ({ resultsCount }) => {
  const search = useAppSelector(getSearch)
  const dispatch = useAppDispatch()
  const [searchText, setSearchText] = useState(search)

  const dispatchSetSearch = useCallback(
    value => {
      dispatch(setSearch(value))
    },
    [dispatch]
  )

  const debouncedDispatchSetSearch = useMemo(
    () => debounce(dispatchSetSearch, 200),
    [dispatchSetSearch]
  )

  const handleChange = useCallback(
    ({ target: { value } }) => {
      setSearchText(value)
      debouncedDispatchSetSearch(value)
    },
    [debouncedDispatchSetSearch]
  )

  useEffect(() => {
    EventBus.subscribe("updateSearch", query => {
      setSearchText(query)
    })
  }, [])

  return (
    <div className="search-container">
      <div className="search-bar">
        <Icon name="search" className="search-icon" />
        <input
          className="search-input"
          placeholder="Search organizations"
          value={searchText}
          onChange={handleChange}
        />
        {resultsCount !== undefined && (
          <div className="search-results-badge">{resultsCount} results</div>
        )}
      </div>
    </div>
  )
}

Search.propTypes = {
  resultsCount: PropTypes.number,
}

export default memo(Search)
