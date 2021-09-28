const fs = require("fs")
const {
  technologyFilters,
  topicFilters,
  categoryFilters,
  nameFilters,
} = require("./filters")

const YEARS = [2016, 2017, 2018, 2019, 2020, 2021]

const getDataPath = year => {
  return `api/data/${year}.json`
}

let gsocOrganizations = []

const getOrCreateOrganization = orgJson => {
  for (const [index, org] of Object.entries(gsocOrganizations)) {
    if (org.name === orgJson.name) {
      return index
    }

    const originalUrl = new URL(org.url)
    const incomingUrl = new URL(orgJson.url)

    if (
      originalUrl.host === incomingUrl.host &&
      originalUrl.pathname === incomingUrl.pathname
    ) {
      return index
    }
  }

  gsocOrganizations.push({
    name: "",
    url: "",
    image_url: "",
    image_background_color: "",
    description: "",
    category: "",
    topics: [],
    technologies: [],
    years: {},
  })
  return gsocOrganizations.length - 1
}

const getLatestGsocYear = index => {
  const years = Object.keys(gsocOrganizations[index].years).sort()

  if (years.length) {
    return Number.parseInt(years[years.length - 1])
  }

  return 0
}

const updateBasicOrgInfo = (
  index,
  year,
  name,
  imageUrl,
  imageBackgroundColor,
  description,
  url,
  irc_channel,
  contact_email,
  mailing_list,
  category
) => {
  if (getLatestGsocYear(index) < year) {
    gsocOrganizations[index].name = name
    gsocOrganizations[index].image_url = imageUrl
    gsocOrganizations[index].image_background_color = imageBackgroundColor
    gsocOrganizations[index].description = description
    gsocOrganizations[index].url = url
    gsocOrganizations[index].irc_channel = irc_channel
    gsocOrganizations[index].contact_email = contact_email
    gsocOrganizations[index].mailing_list = mailing_list
    gsocOrganizations[index].category = category
  }
}

const updateYears = (index, year, projects_url, num_projects) => {
  gsocOrganizations[index].years[year] = {
    projects_url: projects_url,
    num_projects: num_projects,
  }
}

const updateTopics = (index, year, topics) => {
  for (const topic of topics) {
    if (!gsocOrganizations[index].topics.includes(topic)) {
      gsocOrganizations[index].topics.push(topic)
    }
  }
}

const updateTechnologies = (index, year, technologies) => {
  for (const technology of technologies) {
    if (!gsocOrganizations[index].technologies.includes(technology)) {
      gsocOrganizations[index].technologies.push(technology)
    }
  }
}

const updateOrg = (index, year, orgJson) => {
  const {
    name,
    image_url,
    image_background_color,
    description,
    url,
    irc_channel,
    contact_email,
    mailing_list,
    category,
    projects_url,
    topics,
    technologies,
    num_projects,
  } = orgJson
  updateBasicOrgInfo(
    index,
    year,
    name,
    image_url,
    image_background_color,
    description,
    url,
    irc_channel,
    contact_email,
    mailing_list,
    category
  )
  updateYears(index, year, projects_url, num_projects)
  updateTopics(index, year, topics)
  updateTechnologies(index, year, technologies)
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

const processData = data => {
  for (const orgJson of data.organizations) {
    applyFilters(orgJson)
    const index = getOrCreateOrganization(orgJson)
    updateOrg(index, Number.parseInt(data.year), orgJson)
  }
}

const compileData = () => {
  gsocOrganizations = []

  for (const year of YEARS) {
    const rawData = fs.readFileSync(getDataPath(year))
    processData(JSON.parse(rawData))
  }

  const sortedOrganizations = gsocOrganizations.sort((a, b) => {
    if (a.name === b.name) {
      return 0
    }

    return a.name > b.name ? 1 : -1
  })

  return sortedOrganizations
}

module.exports = { compileData }
