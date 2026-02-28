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
  reactjs: ["react"],
  "react.js": ["react"],
  "reactjs javascript": ["react", "javascript"],
  golang: ["go"],
  "python 3": ["python"],
  html5: ["html"],
  "html5/css3": ["html", "css"],
  css3: ["css"],
  machinelearning: ["machine learning"],
  "machine learning (ml)": ["machine learning"],
  "c++11": ["c++"],
  "c++14": ["c++"],
  "c++17": ["c++"],
  "c++20": ["c++"],
  cpp: ["c++"],
  "c\\c++": ["c", "c++"],
  "c/c+": ["c", "c++"],
  "c/rust/go": ["c", "rust", "go"],
  nextjs: ["next.js"],
  "artificial-intelligence": ["artificial intelligence"],
  "data-science": ["data science"],
  "jupyter notebook": ["jupyter"],
  mern: ["mongodb", "express.js", "react", "node.js"],
  "dart/flutter": ["dart", "flutter"],
  "shell script": ["shell"],
  llms: ["llm"],
  "django+postgresql": ["django", "postgresql"],
  postgres: ["postgresql"],
  "git/github": ["git", "github"],
  "react-native": ["react native"],
  mongo: ["mongodb"],
  deeplearning: ["deep learning"],
  "sql/nosql": ["sql", "nosql"],
  "rest api": ["rest"],
  "restful api": ["rest"],
  springboot: ["spring boot"],
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
