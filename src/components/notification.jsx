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
        Official ogranizations for GSoC 2022 have been announced. You can check
        them{" "}
        <a
          href="https://summerofcode.withgoogle.com/programs/2022/organizations"
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
