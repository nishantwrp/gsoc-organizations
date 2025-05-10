export const createOrgChartData = (allYears, orgYearData) => {
  const years = allYears
    .sort()
    .filter(item => item != 2026)
    .reduce((yearsToPlot, year) => {
      if (yearsToPlot.length != 0) {
        yearsToPlot.push(year)
        return yearsToPlot
      } else {
        return Object.keys(orgYearData).includes(year) ? [year] : []
      }
    }, [])

  const numProjects = []
  for (const year of years) {
    if (Object.keys(orgYearData).includes(year)) {
      numProjects.push(orgYearData[year].num_projects)
    } else {
      numProjects.push(0)
    }
  }

  return {
    years,
    numProjects,
  }
}
