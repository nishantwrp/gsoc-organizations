import React from "react"
const scrollToTop = () => {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}
function ScrollToTop() {
  return (
    <div onClick={scrollToTop} className="gotoTopButton">
      &#8593;
    </div>
  )
}

export default ScrollToTop
