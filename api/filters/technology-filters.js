const filters = {
  "app engine": ["google app engine"],
  appengine: ["google app engine"],
  "html/css": ["html", "css"],
  "html/css/js": ["html", "css", "javascript"],
  js: ["javascript"],
  javajava: ["java"],
  "javascript/html/css": ["html", "css", "javascript"],
  javascipt: ["javascript"],
  "javascript/html5/css3": ["html", "css", "javascript"],
  "java script": ["javascript"],
  "php/javascript/html": ["php", "javascript", "html"],
  "php/javascript/ajax": ["php", "javascript", "ajax"],
  "html/javascript": ["html", "javascript"],
  "c/c++": ["c", "c++"],
  "css/html": ["css", "html"],
  "web/html/css": ["web", "html", "css"],
  node: ["node.js"],
  nodejs: ["node.js"],
  vue: ["vue.js"],
  vuejs: ["vue.js"],
  "vue.js": ["vue.js"],
}

const filter = tech => {
  const lowerTech = tech.toLowerCase().trim()
  if (lowerTech in filters) {
    return filters[lowerTech]
  }

  return [tech.trim()]
}

module.exports = {
  filter: filter,
}
