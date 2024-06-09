import React, { memo } from "react"
import { Message } from "semantic-ui-react"

const Notification = () => {
  const style = {
    width: "fit-content",
  }

  return (
    <Message positive style={style}>
      <Message.Header>
        Organizations participating in GSoC 2024 have been announced. View them
        in the official site{" "}
        <a
          href="https://summerofcode.withgoogle.com/programs/2024/organizations"
          target="_blank"
        >
          <u>here</u>
        </a>
        .
      </Message.Header>
    </Message>
  )
}

export default memo(Notification)
