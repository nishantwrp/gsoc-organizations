import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import "./projects-graph.css"

import "chart.js/auto"
import { Line } from "react-chartjs-2"

const ProjectsGraph = ({ data }) => {
  const queryData = useStaticQuery(graphql`
    query {
      filter {
        years {
          name
        }
      }
    }
  `)

  const years = queryData.filter.years
    .map(item => item.name)
    .sort()
    .filter(item => item != 2024)
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
    <div className="projects-graph-container">
      <Line
        data={state}
        scaleFontColor="red"
        options={{
          plugins: {
            title: {
              display: true,
              text: "Number of completed projects year-wise",
              fontSize: 14,
            },
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              grid: {
                drawOnChartArea: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                drawOnChartArea: false,
              },
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
      />
    </div>
  )
}

ProjectsGraph.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ProjectsGraph
