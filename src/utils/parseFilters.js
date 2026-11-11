export const parseFiltersParam = raw => {
  if (!raw) {
    return {}
  }
  try {
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed
    }
  } catch (e) {
    console.warn("ignoring malformed filters search param:", raw)
  }
  return {}
}

/**
 * Parses the `filters` search param. Returns {} (no active filters)
 * if it's missing, isn't valid JSON, or isn't an object.
 */
