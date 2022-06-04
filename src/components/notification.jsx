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
        Coding period for GSoC 2022 has started. You can check the program
        timeline{" "}
        <a
          href="https://developers.google.com/open-source/gsoc/timeline"
          target="_blank"
        >
          <u>here</u>
        </a>
        .
      </Message.Header>
    </Message>
  )
}

export default Notification
