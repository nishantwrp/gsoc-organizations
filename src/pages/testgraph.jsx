import React from "react"
import { Line } from "react-chartjs-2"
import "./index.css"

import Layout from "../layouts/layout"
const year = [2000, 2001, 2002, 2003, 2004, 2005]
const numberofselects = [4, 7, 1, 4, 2, 9]
const style2 = {
  height: "10px",
  width: "20px",
}
const state = {
  labels: year,
  datasets: [
    {
      label: "Number of selects",
      fill: false,
      lineTension: 0.38,
      backgroundColor: "#db6400",
      borderColor: "#16697a",
      borderWidth: 3,
      data: numberofselects,
    },
  ],
}
const IndexPage = () => {
  return (
    <Layout>
      <Line
        style={style2}
        data={state}
        // width="200"
        //   height="100"

        scaleFontColor="red"
        options={{
          title: {
            display: true,
            text: "Number of students selected year-wise",
            fontSize: 10,
          },
          // maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: "red",
                  drawOnChartArea: false,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  color: "red",
                  drawOnChartArea: false,
                },
              },
            ],
          },
        }}
      />
    </Layout>
  )
}

export default IndexPage
