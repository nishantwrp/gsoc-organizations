import React from "react"
import { Message } from "semantic-ui-react"

const Notification = () => {
  const style = {
    width: "100%",
    margin: "1rem",
  }
  return (
    <Message positive style={style}>
      <Message.Header>
        Data for the organizations which participated in 2021{" "}
        <u>
          <a
            href="https://twitter.com/nishantwrp/status/1433895794596143105"
            target="_blank"
          >
            will be added soon
          </a>
        </u>
        .
      </Message.Header>
    </Message>
  )
}

export default Notification
