import { useState, useEffect } from "react"

const useScreenSize = () => {
  const isBrowser = typeof window !== "undefined"

  const [screenSize, setScreenSize] = useState({
    width: isBrowser ? window.innerWidth : 0,
    height: isBrowser ? window.innerHeight : 0,
  })

  useEffect(() => {
    if (!isBrowser) return // Return early if not in the browser environment

    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("load", handleResize)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize)
      window.addEventListener("load", handleResize)
    }
  }, [isBrowser])

  return screenSize
}

export default useScreenSize
