/**
 * Updates the search params in the browser using JS history API.
 * This will not re-render the complete application. Using this API
 * may cause the react-router to go out of sync and give false values if
 * accessed elsewhere.
 * @param {{ [param: string]: string }} params
 */
export const setSearchParams = params => {
  if (typeof window !== "undefined" && window) {
    const url = new URL(window.location)
    for (const [param, value] of Object.entries(params)) {
      url.searchParams.set(param, value)
    }
    window.history.pushState({}, "", url)
  } else {
    console.error("error setting search params. window is not defined.")
  }
}

/**
 * Gets the value of the search param in the url. Returns null if doesn't exist.
 * @param {string} param
 * @returns {string | null}
 */
export const getSearchParam = param => {
  if (typeof window !== "undefined" && window) {
    return new URL(window.location).searchParams.get(param)
  } else {
    console.error("error getting search params. window is not defined.")
    return null
  }
}

/**
 * Removes a search param from the url.
 * @param {string} param
 */
export const removeSearchParam = param => {
  if (typeof window !== "undefined" && window) {
    const url = new URL(window.location)
    url.searchParams.delete(param)
    window.history.pushState({}, "", url)
  } else {
    console.error("error removing search param. window is not defined.")
  }
}
