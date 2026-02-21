const fs = require("fs")
const { compileData } = require("../api/compile-data")

const organizations = compileData()

const topics = new Map()
const technologies = new Map()

organizations.forEach(org => {
  org.topics.forEach(topic => topics.set(topic, (topics.get(topic) || 0) + 1))
  org.technologies.forEach(tech =>
    technologies.set(tech, (technologies.get(tech) || 0) + 1)
  )
})

const filters = {
  topics: Array.from(topics.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count),
  technologies: Array.from(technologies.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count),
}

fs.writeFileSync("./filters.json", JSON.stringify(filters))
