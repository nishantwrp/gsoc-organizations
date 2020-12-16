const filters = {
  "app engine": ["google app engine"],
  appengine: ["google app engine"],
  "html/css": ["html", "css"],
  "html/css/js": ["html", "css", "javascript"],
  js: ["javascript"],
}

const filter = tech => {
  if (tech in filters) {
    return filters[tech]
  }

  return [tech]
}

module.exports = {
  filter: filter,
}
