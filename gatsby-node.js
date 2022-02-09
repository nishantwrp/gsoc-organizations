const slugify = require("slugify")
const { compileData } = require("./api/compile-data")

const getAllNodesData = organizations => {
  const filtersIndexes = {
    years: {},
    technologies: {},
    topics: {},
    categories: {},
  }

  const allYears = []
  const allTechnologies = []
  const allTopics = []
  const allCategories = []

  for (const organization of organizations) {
    const years = Object.keys(organization.years)
    const technologies = organization.technologies
    const topics = organization.topics
    const category = organization.category

    if (!(category in filtersIndexes.categories)) {
      allCategories.push({
        name: category,
        frequency: 1,
      })
      filtersIndexes.categories[category] = allCategories.length - 1
    } else {
      allCategories[filtersIndexes.categories[category]].frequency++
    }

    for (const topic of topics) {
      if (!(topic in filtersIndexes.topics)) {
        allTopics.push({
          name: topic,
          frequency: 1,
        })
        filtersIndexes.topics[topic] = allTopics.length - 1
      } else {
        allTopics[filtersIndexes.topics[topic]].frequency++
      }
    }

    for (const technology of technologies) {
      if (!(technology in filtersIndexes.technologies)) {
        allTechnologies.push({
          name: technology,
          frequency: 1,
        })
        filtersIndexes.technologies[technology] = allTechnologies.length - 1
      } else {
        allTechnologies[filtersIndexes.technologies[technology]].frequency++
      }
    }

    for (const year of years) {
      if (!(year in filtersIndexes.years)) {
        allYears.push({
          name: year,
          frequency: 1,
        })
        filtersIndexes.years[year] = allYears.length - 1
      } else {
        allYears[filtersIndexes.years[year]].frequency++
      }
    }
  }

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
    for (const year of Object.keys(organization.years)) {
      organization.years[year].projects = organization.years[year].projects.map(
        project => {
          delete project["description"]
          return project
        }
      )
    }

    createPage({
      path: `organization/${slugify(organization.name, { lower: true })}/`,
      component: require.resolve("./src/templates/organization.jsx"),
      context: { organization: organization },
    })
  }
}
