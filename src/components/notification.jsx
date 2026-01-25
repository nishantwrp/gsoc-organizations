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
        GSoC 2026 has been{" "}
        <a
          href="https://opensource.googleblog.com/2025/12/shape-future-with-google-summer-of-code.html"
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
