import React from "react"
import PropTypes from "prop-types"

import "./filter.css"

import FilterModal from "./filter-modal"
import { Checkbox, Input, Divider } from "semantic-ui-react"

const Filter = () => {
  return (
    <div className="filter-filter">
      <div className="filter-topic">
        <u>Technology</u>
      </div>
      <div className="filter-search">
        <Input size="mini" icon="search" placeholder="Search technologies" />
      </div>
      <div className="filter-boxes">
        <center>
          <div className="filter-boxes-container">
            <table>
              <tr>
                <td>
                  <Checkbox label="test value" />
                </td>
              </tr>
              <tr>
                <td>
                  <Checkbox label="test value" />
                </td>
              </tr>
              <tr>
                <td>
                  <Checkbox label="test value" />
                </td>
              </tr>
              <tr>
                <td>
                  <Checkbox label="test value" />
                </td>
              </tr>
            </table>
          </div>
        </center>
      </div>
      <FilterModal trigger={<div className="filter-view-more">View all</div>} />
      <center>
        <Divider className="filter-divider" />
      </center>
    </div>
  )
}

export default Filter
