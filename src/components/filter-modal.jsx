import React from "react"
import PropTypes from "prop-types"
import Fuse from "fuse.js"

import "./filter-modal.css"

import { Modal, Button, Input, Grid, Checkbox } from "semantic-ui-react"

const FilterModal = ({ trigger, name, optionsState, updateAllFilters }) => {
  const [open, setOpen] = React.useState(false)
  let [allOptions, setOptions] = optionsState
  const [searchQuery, setSearchQuery] = React.useState("")

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

  const getSelectedOptionIndexes = allOptions => {
    const selectedIndexes = []
    allOptions.map((value, index) => {
      if (value.selected) {
        selectedIndexes.push(index)
      }
    })
    return selectedIndexes
  }

  const getUnselectedOptionIndexes = allOptions => {
    const unselectedIndexes = []
    allOptions.map((value, index) => {
      if (!value.selected) {
        unselectedIndexes.push(index)
      }
    })
    return unselectedIndexes
  }

  const getfilteredCheckboxes = (allOptions, searchQuery) => {
    let filteredOptionIndexes = getSelectedOptionIndexes(allOptions)
    filteredOptionIndexes = filteredOptionIndexes.concat(
      getUnselectedOptionIndexes(allOptions)
    )

    if (searchQuery !== "") {
      const fuse = getFuseSearch(allOptions)
      filteredOptionIndexes = fuse.search(searchQuery).map(res => res.refIndex)
    }

    return filteredOptionIndexes
  }

  let filteredCheckboxes = getfilteredCheckboxes(allOptions, searchQuery)

  let filterCheckboxes = []
  for (let i = 0; i < filteredCheckboxes.length; i++) {
    filterCheckboxes.push(
      <Grid.Column>
        <Checkbox
          checked={allOptions[filteredCheckboxes[i]].selected}
          label={allOptions[filteredCheckboxes[i]].name}
          value={allOptions[filteredCheckboxes[i]].selected}
          onChange={toggleChecked(filteredCheckboxes[i])}
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
