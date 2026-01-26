import React from "react"
import PropTypes from "prop-types"

import "./projects-graph.css"

import "chart.js/auto"
import { Line } from "react-chartjs-2"

const ProjectsGraph = ({ data: { years, numProjects } }) => {
  const state = {
    labels: years,
    datasets: [
      {
        label: "Projects",
        data: numProjects,
        borderColor: "#1a73e8",
        backgroundColor: "rgba(26, 115, 232, 0.1)",
        borderWidth: 2,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#1a73e8",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      },
    ],
  }

  return (
    <div className="projects-graph-container">
      <Line
        data={state}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Participation History",
              font: {
                size: 16,
                family: "'Google Sans', sans-serif",
                weight: 500,
              },
              color: "#202124",
              padding: {
                bottom: 20,
              },
            },
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: "rgba(32, 33, 36, 0.9)",
              padding: 12,
              cornerRadius: 8,
              titleFont: {
                family: "'Google Sans', sans-serif",
              },
              bodyFont: {
                family: "'Google Sans', sans-serif",
              },
              displayColors: false,
              callbacks: {
                label: context => `${context.parsed.y} Projects`,
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  family: "'Google Sans', sans-serif",
                },
                color: "#5f6368",
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: "#f1f3f4",
                borderDash: [4, 4],
              },
              ticks: {
                stepSize: 1,
                font: {
                  family: "'Google Sans', sans-serif",
                },
                color: "#5f6368",
                precision: 0,
              },
              border: {
                display: false,
              },
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
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
