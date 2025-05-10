import React from "react"
import PropTypes from "prop-types"

import "./projects-graph.css"

import "chart.js/auto"
import { Bar } from "react-chartjs-2"

const ProjectsGraph = ({ data: { years, numProjects } }) => {
  const state = {
    labels: years,
    datasets: [
      {
        label: "Number of completed projects",
        backgroundColor: "rgba(22, 105, 122, 0.7)",
        hoverBackgroundColor: "rgba(22, 105, 122, 1)",
        borderRadius: 5,
        data: numProjects,
        maxBarThickness: 50,
      },
    ],
  }

  return (
    <div className="projects-graph-container">
      <Bar
        data={state}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Number of completed projects",
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
