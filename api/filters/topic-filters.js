const filters = {}

const filter = topic => {
  if (topic in filters) {
    return filters[topic]
  }

  return [topic]
}

module.exports = {
  filter: filter,
}
