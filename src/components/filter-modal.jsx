import React from "react"
import PropTypes from "prop-types"

import "./filter-modal.css"

import { Modal, Button, Input, Grid, Checkbox } from "semantic-ui-react"

const FilterModal = ({ trigger }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="filter-modal">
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={trigger}
      >
        <Modal.Header>Filter by technology</Modal.Header>
        <Modal.Content className="filter-modal-content" scrolling>
          <Input
            size="small"
            icon="search"
            className="filter-modal-content-search"
            placeholder="Search technologies"
          />
          <div className="filter-modal-content-filters">
            <Grid stackable columns={3}>
              <Grid.Column>
                <Checkbox label="test value"></Checkbox>
              </Grid.Column>
              <Grid.Column>
                <Checkbox label="test value"></Checkbox>
              </Grid.Column>
              <Grid.Column>
                <Checkbox label="test value"></Checkbox>
              </Grid.Column>
              <Grid.Column>
                <Checkbox label="test value"></Checkbox>
              </Grid.Column>
              <Grid.Column>
                <Checkbox label="test value"></Checkbox>
              </Grid.Column>
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
}

export default FilterModal
