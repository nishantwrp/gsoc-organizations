const fs = require("fs")
const {
  technologyFilters,
  topicFilters,
  categoryFilters,
  nameFilters,
} = require("./filters")

const YEARS = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]

const getDataPath = year => {
  return `api/data/${year}.json`
}

class DisjointSet {
  _parents = {}

  _getHashFromObject(obj) {
    return JSON.stringify(obj)
  }

  _getObjectFromHash(hash) {
    return JSON.parse(hash)
  }

  _findSet(hash) {
    if (this._parents[hash] === hash) {
      return hash
    }

    this._parents[hash] = this._findSet(this._parents[hash])
    return this._parents[hash]
  }

  add(obj) {
    const hash = this._getHashFromObject(obj)
    if (!(hash in this._parents)) {
      this._parents[hash] = hash
    }
  }

  union(obj1, obj2) {
    let hash1 = this._getHashFromObject(obj1)
    let hash2 = this._getHashFromObject(obj2)

    hash1 = this._findSet(hash1)
    hash2 = this._findSet(hash2)

    if (hash1 !== hash2) {
      this._parents[hash1] = hash2
    }
  }

  getAllElements() {
    const allHashes = Object.keys(this._parents)
    return allHashes.map(hash => this._getObjectFromHash(hash))
  }

  extract() {
    const allParentHashes = []

    Object.keys(this._parents).forEach(hash => {
      hash = this._findSet(hash)
      if (!allParentHashes.includes(hash)) {
        allParentHashes.push(hash)
      }
    })

    const allSets = []
    for (const parentHash of allParentHashes) {
      const elementsInThisSet = []

      Object.keys(this._parents).forEach(hash => {
        if (this._findSet(hash) === parentHash) {
          elementsInThisSet.push(this._getObjectFromHash(hash))
        }
      })

      allSets.push(elementsInThisSet)
    }
    return allSets
  }
}

const isMergePossible = (org1, org2) => {
  const normalizeUrlHost = host => {
    return host.startsWith("www.") ? host.slice(4) : host
  }

  // Case insensitive comparison
  if (org1.name.toUpperCase() === org2.name.toUpperCase()) {
    return true
  }

  const url1 = new URL(org1.url)
  const url2 = new URL(org2.url)

  if (
    normalizeUrlHost(url1.host) === normalizeUrlHost(url2.host) &&
    url1.pathname === url2.pathname
  ) {
    return true
  }

  return false
}

const updateYears = (
  combinedJson,
  year,
  projects_url,
  num_projects,
  projects
) => {
  combinedJson.years[year] = {
    projects_url: projects_url,
    num_projects: num_projects,
    projects: projects,
  }
}

const updateTopics = (combinedJson, topics) => {
  for (const topic of topics) {
    if (!combinedJson.topics.includes(topic)) {
      combinedJson.topics.push(topic)
    }
  }
}

const updateTechnologies = (combinedJson, technologies) => {
  for (const technology of technologies) {
    if (!combinedJson.technologies.includes(technology)) {
      combinedJson.technologies.push(technology)
    }
  }
}

const updateOrg = (combinedJson, orgJson) => {
  const {
    projects_url,
    topics,
    technologies,
    num_projects,
    projects,
    year,
  } = orgJson

  const basic_properties = [
    "name",
    "image_url",
    "image_background_color",
    "description",
    "url",
    "irc_channel",
    "contact_email",
    "mailing_list",
    "twitter_url",
    "blog_url",
    "category",
    "ideas_url",
    "guide_url",
  ]
  for (const prop of basic_properties) {
    combinedJson[prop] = orgJson[prop] || combinedJson[prop]
  }

  updateYears(combinedJson, year, projects_url, num_projects, projects)
  updateTopics(combinedJson, topics)
  updateTechnologies(combinedJson, technologies)
}

const applyFilters = orgJson => {
  orgJson.name = nameFilters.filter(orgJson.name)
  orgJson.category = categoryFilters.filter(orgJson.category)

  const topics = []
  for (const topic of orgJson.topics) {
    const filteredTopics = topicFilters.filter(topic)
    for (const filteredTopic of filteredTopics) {
      if (!topics.includes(filteredTopic)) {
        topics.push(filteredTopic)
      }
    }
  }
  orgJson.topics = topics

  const technologies = []
  for (const technology of orgJson.technologies) {
    const filteredTechnologies = technologyFilters.filter(technology)
    for (const filteredTechnology of filteredTechnologies) {
      if (!technologies.includes(filteredTechnologies)) {
        technologies.push(filteredTechnology)
      }
    }
  }
  orgJson.technologies = technologies
}

const getCombinedOrgJson = orgList => {
  const combinedJson = {
    name: "",
    url: "",
    image_url: "",
    image_background_color: "",
    description: "",
    category: "",
    topics: [],
    technologies: [],
    years: {},
    irc_channel: "",
    contact_email: "",
    mailing_list: "",
    ideas_url: "",
    guide_url: "",
  }

  orgList = orgList.sort((a, b) => {
    return a.year > b.year ? 1 : -1
  })

  for (const orgJson of orgList) {
    updateOrg(combinedJson, orgJson)
  }

  return combinedJson
}

const compileData = () => {
  const organizationSet = new DisjointSet()

  for (const year of YEARS) {
    const data = JSON.parse(fs.readFileSync(getDataPath(year)))

    for (const currentOrg of data.organizations) {
      applyFilters(currentOrg)
      currentOrg.year = Number.parseInt(data.year)

      organizationSet.add(currentOrg)
      for (const otherOrg of organizationSet.getAllElements()) {
        if (isMergePossible(currentOrg, otherOrg)) {
          organizationSet.union(currentOrg, otherOrg)
        }
      }
    }
  }

  const distinctOrganizations = organizationSet.extract()
  const gsocOrganizations = []
  distinctOrganizations.forEach(orgList => {
    gsocOrganizations.push(getCombinedOrgJson(orgList))
  })

  const sortedOrganizations = gsocOrganizations.sort((a, b) => {
    if (a.name === b.name) {
      return 0
    }

    return a.name > b.name ? 1 : -1
  })

  return sortedOrganizations
}

module.exports = { compileData }
