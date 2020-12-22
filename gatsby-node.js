const slugify = require("slugify")
const { compileData } = require("./api/compile-data")

const getAllNodesData = organizations => {
  const allYears = []
  const allTechnologies = []
  const allTopics = []
  const allCategories = []

  for (const organization of organizations) {
    const years = Object.keys(organization.years)
    const technologies = organization.technologies
    const topics = organization.topics
    const category = organization.category

    if (!allCategories.includes(category)) {
      allCategories.push(category)
    }

    for (const topic of topics) {
      if (!allTopics.includes(topic)) {
        allTopics.push(topic)
      }
    }

    for (const technology of technologies) {
      if (!allTechnologies.includes(technology)) {
        allTechnologies.push(technology)
      }
    }

    for (const year of years) {
      if (!allYears.includes(year)) {
        allYears.push(year)
      }
    }
  }

  allYears.sort()
  allTechnologies.sort()
  allTopics.sort()
  allCategories.sort()

  return {
    Filter: {
      years: allYears,
      topics: allTopics,
      categories: allCategories,
      technologies: allTechnologies,
    },
    Organization: organizations,
  }
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  const addNode = (nodeType, id, nodeObject) => {
    const gatsbyNode = {
      ...nodeObject,
      id: createNodeId(`${nodeType}-${id}`),
      parent: null,
      children: [],
      internal: {
        type: nodeType,
        contentDigest: createContentDigest(nodeObject),
        content: JSON.stringify(nodeObject),
      },
    }
    createNode(gatsbyNode)
  }

  const organizations = compileData()
  const nodesData = getAllNodesData(organizations)

  for (const [nodeType, nodeObjects] of Object.entries(nodesData)) {
    if (Array.isArray(nodeObjects)) {
      for (const [index, nodeObject] of Object.entries(nodeObjects)) {
        addNode(nodeType, index, nodeObject)
      }
    } else {
      addNode(nodeType, "id", nodeObjects)
    }
  }
}

exports.createPages = ({ actions: { createPage } }) => {
  const organizations = compileData()
  for (const organization of organizations) {
    createPage({
      path: `organization/${slugify(organization.name, { lower: true })}`,
      component: require.resolve("./src/templates/organization.jsx"),
      context: { organization: organization },
    })
  }
}
