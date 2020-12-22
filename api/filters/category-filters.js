const filters = {
  "": "Other",
}

const filter = category => {
  if (category in filters) {
    return filters[category]
  }

  return category
}

module.exports = {
  filter: filter,
}
