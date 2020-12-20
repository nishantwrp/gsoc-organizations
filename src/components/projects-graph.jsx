import React from "react"
import PropTypes from "prop-types"

import { Line } from "react-chartjs-2"

const year = [0, 2016, 2017, 2018, 2019, 2020]
const numberofselects = [0, 4, 4, 8, 6, 0]

const state = {
  labels: year,
  datasets: [
    {
      label: "Number of projects",
      fill: false,
      lineTension: 0.38,
      backgroundColor: "#db6400",
      borderColor: "#16697a",
      borderWidth: 3,
      data: numberofselects,
    },
  ],
}

const ProjectsGraph = () => {
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
                stepSize: 1,
              },
            },
          ],
        },
      }}
    />
  )
}

export default ProjectsGraph
