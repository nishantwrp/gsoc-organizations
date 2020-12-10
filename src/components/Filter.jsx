import React from "react"

import "./filter.css"
import SingleFilter from "./singlefilter"

import { Icon, Input, Button } from "semantic-ui-react"

const Filter = () => {
  return (
    <div>
      <Button size="mini">Clear filter</Button>
      <SingleFilter className="singlefilter" topic="Technology" />
      <SingleFilter className="singlefilter" topic="Year" />
      <SingleFilter className="singlefilter" topic="Technology" />
    </div>
  )
}

export default Filter
