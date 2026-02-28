#!/usr/bin/env bun

// This file is entirely vibe-coded.

import fs from "fs"
import path from "path"
import commandLineArgs from "command-line-args"

const optionDefinitions = [
  { name: "filter-type", type: String },
  { name: "analytics-dir", type: String },
]

const options = commandLineArgs(optionDefinitions)

if (!options["filter-type"] || !options["analytics-dir"]) {
  console.error(
    "Usage: bun scripts/aggregate-single-filter-data.js --filter-type <type> --analytics-dir <dir>"
  )
  process.exit(1)
}

const filterType = options["filter-type"]
const analyticsDir = options["analytics-dir"]

try {
  // 1. Read raw filters data from filters.json
  const filtersDataPath = path.join(__dirname, "filters.json")
  const filtersRaw = fs.readFileSync(filtersDataPath, "utf8")
  const filtersJson = JSON.parse(filtersRaw)

  if (!filtersJson[filterType]) {
    console.error(
      `Error: Filter type "${filterType}" not found in filters.json`
    )
    process.exit(1)
  }

  const rawFilters = filtersJson[filterType] // Array of { name, count }

  // Create a map for quick lookup of org count
  const filterOrgCountMap = new Map()
  for (const item of rawFilters) {
    filterOrgCountMap.set(item.name, item.count)
  }

  // 2. Read the latest analytics file
  if (!fs.existsSync(analyticsDir)) {
    console.error(`Error: Analytics directory "${analyticsDir}" not found`)
    process.exit(1)
  }
  const files = fs.readdirSync(analyticsDir)
  const dateRegex = /^\d{4}-\d{2}-\d{2}\.json$/

  const analyticsFiles = files.filter(file => dateRegex.test(file))
  if (analyticsFiles.length === 0) {
    console.error(
      "Error: No analytics data files found in the specified directory."
    )
    process.exit(1)
  }

  // Sort files in descending order to get the latest
  analyticsFiles.sort((a, b) => b.localeCompare(a))
  const latestFile = analyticsFiles[0]

  const latestFilePath = path.join(analyticsDir, latestFile)
  const analyticsRaw = fs.readFileSync(latestFilePath, "utf8")
  const analyticsJson = JSON.parse(analyticsRaw)

  const filtersAnalytics = analyticsJson.filters || {}
  let targetAnalyticsData = []

  if (filtersAnalytics[filterType]) {
    targetAnalyticsData = filtersAnalytics[filterType]
  } else if (filtersAnalytics.categories && filterType === "categories") {
    targetAnalyticsData = filtersAnalytics.categories
  } else if (filtersAnalytics.technologies && filterType === "technologies") {
    targetAnalyticsData = filtersAnalytics.technologies
  } else if (filtersAnalytics.topics && filterType === "topics") {
    targetAnalyticsData = filtersAnalytics.topics
  } else {
    // Attempt fallback or simply empty array
    console.warn(
      `Warning: Filter type "${filterType}" view data not present in analytics file.`
    )
  }

  // Create a map for quick lookup of view count
  // The structure of view counts can be like:
  // { category: "Artificial Intelligence", views: 3213 }
  // { technology: "python", views: 5022 }
  // { topic: "web", views: 1970 }

  // We need to infer the key name for the object since it varies.
  // It usually matches the singular of the filterType or something similar.
  // Instead of guessing, we can find the property that is string value (name) and the property 'views'.

  const filterViewCountMap = new Map()
  for (const item of targetAnalyticsData) {
    let nameKey = null
    let viewsKey = "views"

    for (const key in item) {
      if (key !== viewsKey) {
        nameKey = key
        break
      }
    }

    if (nameKey && item[nameKey]) {
      // In JS object, it might be { topic: "web", views: 1970 }
      filterViewCountMap.set(item[nameKey], item[viewsKey] || 0)
    }
  }

  // 3. Aggregate
  const aggregatedData = []

  // Iterate over rawFilters to ensure we include all known items
  for (const { name, count } of rawFilters) {
    const viewCount = filterViewCountMap.get(name) || 0
    aggregatedData.push({
      name,
      orgCount: count,
      viewCount,
    })
  }

  // 4. Sort output by viewCount descending as requested
  aggregatedData.sort((a, b) => b.viewCount - a.viewCount)

  // Output
  const outputFileName = `${filterType}-data.json`
  fs.writeFileSync(
    path.join(__dirname, outputFileName),
    JSON.stringify(aggregatedData, null, 2)
  )

  console.log(`Successfully aggregated data and saved to ${outputFileName}`)
} catch (err) {
  console.error("An error occurred:", err.message)
  process.exit(1)
}
