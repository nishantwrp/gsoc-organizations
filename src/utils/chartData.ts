interface OrgYearData {
  [year: string]: {
    num_projects: number
  }
}
interface OrgChartData {
  years: number[]
  numProjects: number[]
}
/**
 * Creates organization chart data based on the provided years and organization data.
 * @param allYears - An array of all years to consider.
 * @param orgYearData - An object containing organization data for specific years.
 * @returns An object containing the years to plot and the number of projects for each year.
 */

export const createOrgChartData = (
  allYears: number[],
  orgYearData: OrgYearData
): OrgChartData => {
  // Filter and sort years, excluding 2025
  const years = allYears
    .sort()
    .filter(item => item != 2025)
    .reduce((yearsToPlot: number[], year: number) => {
      if (yearsToPlot.length != 0) {
        yearsToPlot.push(year)
        return yearsToPlot
      } else {
        return Object.keys(orgYearData).includes(year.toString()) ? [year] : []
      }
    }, [])
  // Calculate the number of projects for each year
  const numProjects = []
  for (const year of years) {
    if (Object.keys(orgYearData).includes(year.toString())) {
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
