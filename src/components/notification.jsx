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
        GSoC 2023 has been announced. Read the announcement blog{" "}
        <a
          href="https://opensource.googleblog.com/2022/11/get-ready-for-google-summer-of-code-2023.html"
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
