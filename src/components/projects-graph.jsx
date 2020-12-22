import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { Line } from "react-chartjs-2"

const ProjectsGraph = ({ data }) => {
  const queryData = useStaticQuery(graphql`
    query {
      filter {
        years
      }
    }
  `)

  const years = queryData.filter.years
  const numProjects = []

  for (const year of years) {
    if (Object.keys(data).includes(year)) {
      numProjects.push(data[year].num_projects)
    } else {
      numProjects.push(0)
    }
  }

  const state = {
    labels: years,
    datasets: [
      {
        label: "Number of projects",
        fill: false,
        lineTension: 0.38,
        backgroundColor: "#db6400",
        borderColor: "#16697a",
        borderWidth: 3,
        data: numProjects,
      },
    ],
  }

  return (
    <Line
      data={state}
      scaleFontColor="red"
      options={{
        title: {
          display: true,
          text: "Number of completed projects year-wise",
          fontSize: 14,
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: true,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                drawOnChartArea: false,
              },
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
        },
      }}
    />
  )
}

ProjectsGraph.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ProjectsGraph
