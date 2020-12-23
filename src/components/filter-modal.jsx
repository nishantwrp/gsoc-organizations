import React from "react"
import PropTypes from "prop-types"
import Fuse from "fuse.js"

import "./filter-modal.css"

import { Modal, Button, Input, Grid, Checkbox } from "semantic-ui-react"

const FilterModal = ({
  trigger,
  name,
  optionsState,
  updateAllFilters,
  searchState,
}) => {
  const [open, setOpen] = React.useState(false)
  let [allOptions, setOptions] = optionsState
  const { searchQuery, setSearchQuery } = searchState

  const toggleChecked = index => {
    return () => {
      const newOptions = allOptions
      newOptions[index].selected = !newOptions[index].selected
      setOptions(newOptions)
      updateAllFilters()
    }
  }

  const getFuseSearch = allOptions => {
    const options = {
      threshold: 0.3,
      keys: ["name"],
    }

    return new Fuse(allOptions, options)
  }

  const handleChange = e => {
    setSearchQuery(e.target.value)
  }

  const getfilteredCheckboxes = (allOptions, searchQuery) => {
    let filteredOrganizations = allOptions

    if (searchQuery !== "") {
      const fuse = getFuseSearch(allOptions)
      filteredOrganizations = fuse.search(searchQuery).map(res => res.item)
    }

    return filteredOrganizations
  }

  let filteredCheckboxes = getfilteredCheckboxes(allOptions, searchQuery)

  let filterCheckboxes = []
  for (let i = 0; i < filteredCheckboxes.length; i++) {
    filterCheckboxes.push(
      <Grid.Column>
        <Checkbox
          checked={filteredCheckboxes[i].selected}
          label={filteredCheckboxes[i].name}
          value={filteredCheckboxes[i].selected}
          onChange={toggleChecked(i)}
        />
      </Grid.Column>
    )
  }

  return (
    <div className="filter-modal">
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={trigger}
      >
        <Modal.Header>Filter by {name}</Modal.Header>
        <Modal.Content className="filter-modal-content" scrolling>
          <Input
            size="small"
            icon="search"
            className="filter-modal-content-search"
            onChange={handleChange.bind(this)}
            placeholder={`Search ${name}`}
          />
          <div className="filter-modal-content-filters">
            <Grid stackable columns={3}>
              {filterCheckboxes}
            </Grid>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Done"
            labelPosition="right"
            icon="checkmark"
            onClick={() => setOpen(false)}
            color="orange"
          />
        </Modal.Actions>
      </Modal>
    </div>
  )
}

FilterModal.propTypes = {
  trigger: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  optionsState: PropTypes.array.isRequired,
  updateAllFilters: PropTypes.func.isRequired,
}

export default FilterModal
