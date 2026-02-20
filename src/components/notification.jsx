import React, { memo } from "react"
import { Message } from "semantic-ui-react"

const Notification = () => {
  const style = {
    width: "100%",
    margin: "1rem",
  }

  return (
    <Message positive style={style}>
      <Message.Header>
        Organizations participating in GSoC 2026 have been announced. View them
        in the official site{" "}
        <a
          href="https://summerofcode.withgoogle.com/programs/2026/organizations"
          target="_blank"
        >
          <u>announced</u>
        </a>
        . Check the program timeline{" "}
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

export default memo(Notification)
