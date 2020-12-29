import React from "react"
import PropTypes from "prop-types"

import "./filter-modal.css"

import FilterTemplate from "./filter-template"
import { Modal, Button, Input, Grid, Checkbox } from "semantic-ui-react"

class FilterModal extends FilterTemplate {
  constructor(props) {
    super(props, {
      open: false,
    })
  }

  toggleModal(isOpen) {
    return () => {
      this.setState({
        searchQuery: "",
        open: isOpen,
      })
    }
  }

  render() {
    const filteredCheckboxes = this.getFilteredOptionsIndexes().map(index => {
      return (
        <Grid.Column>
          <Checkbox
            checked={this.getAllOptions()[index].selected}
            label={this.getCheckboxLabel(index)}
            value={this.getAllOptions()[index].selected}
            onChange={this.toggleChecked(index)}
          />
        </Grid.Column>
      )
    })

    return (
      <div className="filter-modal">
        <Modal
          onClose={this.toggleModal(false)}
          onOpen={this.toggleModal(true)}
          open={this.state.open}
          trigger={this.props.trigger}
        >
          <Modal.Header>Filter by {this.props.name}</Modal.Header>
          <Modal.Content className="filter-modal-content" scrolling>
            <Input
              size="small"
              icon="search"
              className="filter-modal-content-search"
              value={this.state.searchQuery}
              onChange={this.handleSearchQuery.bind(this)}
              placeholder={`Search ${this.props.name}`}
            />
            <div className="filter-modal-content-filters">
              <Grid stackable columns={3}>
                {filteredCheckboxes}
              </Grid>
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Done"
              labelPosition="right"
              icon="checkmark"
              onClick={this.toggleModal(false)}
              color="orange"
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

FilterModal.propTypes = {
  ...FilterTemplate.propTypes,
  trigger: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
}

export default FilterModal
