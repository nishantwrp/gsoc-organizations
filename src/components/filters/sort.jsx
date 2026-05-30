import React from "react"
import { Dropdown } from "semantic-ui-react"
import { useAppDispatch, useAppSelector } from "../../store"
import { setSortBy } from "../../store/filters"

const Sort = () => {
  const dispatch = useAppDispatch()
  const currentSort = useAppSelector(state => state.filters.sortBy)

  const options = [
    { key: 1, text: "Default", value: "" },
    { key: 2, text: "Most Projects", value: "projects_desc" },
    { key: 3, text: "Least Projects", value: "projects_asc" },
  ]

  const handleSortChange = (e, data) => {
    dispatch(setSortBy(data.value))
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        style={{ marginRight: "8px", fontWeight: "bold", fontSize: "0.9em" }}
      >
        Sort by:
      </span>
      <Dropdown
        selection
        options={options}
        value={currentSort}
        onChange={handleSortChange}
        placeholder="Select..."
      />
    </div>
  )
}

export default Sort
