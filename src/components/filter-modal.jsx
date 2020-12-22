import React from "react"
import PropTypes from "prop-types"

import "./filter-modal.css"

import { Modal, Button, Input, Grid, Checkbox } from "semantic-ui-react"

const FilterModal = ({ trigger, name, optionsState, updateAllFilters }) => {
  const [open, setOpen] = React.useState(false)
  let [allOptions, setOptions] = optionsState

  const toggleChecked = index => {
    return () => {
      const newOptions = allOptions
      newOptions[index].selected = !newOptions[index].selected
      setOptions(newOptions)
      updateAllFilters()
    }
  }

  let filterCheckboxes = []
  for (let i = 0; i < allOptions.length; i++) {
    filterCheckboxes.push(
      <Grid.Column>
        <Checkbox
          checked={allOptions[i].selected}
          label={allOptions[i].name}
          value={allOptions[i].selected}
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
            placeholder="Search technologies"
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
