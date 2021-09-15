const filters = {}

const filter = topic => {
  if (topic in filters) {
    return filters[topic]
  }

  return [topic.trim()]
}

module.exports = {
  filter: filter,
}
