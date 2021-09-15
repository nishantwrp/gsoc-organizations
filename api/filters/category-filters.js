const filters = {
  "": "Other",
}

const filter = category => {
  if (category in filters) {
    return filters[category]
  }

  return category.trim()
}

module.exports = {
  filter: filter,
}
