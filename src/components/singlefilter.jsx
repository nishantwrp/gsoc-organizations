import React from "react"
import { Icon, Input, Checkbox } from "semantic-ui-react"

const Search = props => {
  return (
    <div className="singlefilter">
      <div>
        <p className="filtername">{props.topic}</p>
      </div>
      <div className="search">
        <Input className="input" icon placeholder="Search">
          <input />
          <Icon name="search" />
        </Input>
      </div>

      <div className="checkboxes">
        <Checkbox label="Python" />
        <Checkbox label="Python" />
        <Checkbox label="Python" />
        <Checkbox label="Python" />
        <Checkbox label="React" />
        <Checkbox label="Angular" />
        <Checkbox label="Vue" />
      </div>
    </div>
  )
}

export default Search
