import React from "react"

import "./index.css"

import Layout from "../layouts/layout"
import OrgCard from "../components/org-card"
import { Grid } from "semantic-ui-react"

const orgs = [
  {
    name: "3DTK",
    url: "http://threedtk.de",
    image_url:
      "https://lh3.googleusercontent.com/5bb1zuSJfNaskJVgD5jO4Mdzamk1udiUH1BXVSzMcM8fB-kIy62kBFS6MtQj1EW445ZkQ1BWlvJL2oXRJNqsYBcmPWpSXng",
    description:
      "The 3D Toolkit provides algorithms and methods to process 3D point clouds",
    category: "Science and Medicine",
    topics: ["3d", "point clouds", "slam", "robotics", "mapping"],
    technologies: ["c/c++", "cmake", "opencv", "ros", "boost"],
    years: {
      2018: {
        projects_url:
          "https://summerofcode.withgoogle.com/archive/2018/organizations/5685665089978368/",
        num_projects: 2,
      },
    },
  },
  {
    name: "52° North GmbH",
    url: "https://52north.org",
    image_url:
      "https://lh3.googleusercontent.com/b3Eq2hMuwWVThPV-5EqL3UB8qWSOnMabjXaYn_UaYg6UUvDc1aiSyTGrxEddbCVZZLYeoCyjgtsvkUvCuQ8trdbFR6-YLA",
    description:
      "52°North works on innovative ideas and technologies in geoinformatics",
    category: "Science and Medicine",
    topics: [
      "spatial data",
      "sensor web",
      "web-based geoprocessing",
      "earth observation",
      "geoinformatics",
      "spatial data infrastructures",
      "spatial information",
      "geoprocessing",
      "remote sensing",
      "geostatistics",
      "ogc",
      "web processing",
      "sensorweb",
      "floating car data",
      "web services",
      "ogc standards",
      "trajectory analytics",
    ],
    technologies: [
      "javascript",
      "java",
      "ogc standards",
      "web services",
      "web",
      "spring",
      "r",
      "big data",
      "android",
      "python",
      "react",
    ],
    years: {
      2016: {
        projects_url:
          "https://summerofcode.withgoogle.com/archive/2016/organizations/5429283996565504/",
        num_projects: 3,
      },
      2017: {
        projects_url:
          "https://summerofcode.withgoogle.com/archive/2017/organizations/4959751460880384/",
        num_projects: 1,
      },
      2018: {
        projects_url:
          "https://summerofcode.withgoogle.com/archive/2018/organizations/5067792839606272/",
        num_projects: 1,
      },
      2019: {
        projects_url:
          "https://summerofcode.withgoogle.com/archive/2019/organizations/6331236958601216/",
        num_projects: 2,
      },
      2020: {
        projects_url:
          "https://summerofcode.withgoogle.com/archive/2020/organizations/6309633414660096/",
        num_projects: 3,
      },
    },
  },
  {
    name: "AOSSIE",
    url: "https://aossie.gitlab.io/",
    image_url:
      "https://lh3.googleusercontent.com/87Kab9O_6iDrF_hVUPa9qOTjiiIh9aoqJAKkyG-31gomCoQoU85TPtx7fd7PlyGnMjRStm9IELvhsWrdbijhOYNGJgPa3bM",
    description: "Australian Umbrella Org for Open-Source Projects",
    category: "End User Applications",
    topics: [
      "electronic voting",
      "natural language processing",
      "machine learning",
      "environment",
      "social science",
    ],
    technologies: ["javascript", "swift", "kotlin", "python"],
    years: {
      2020: {
        projects_url:
          "https://summerofcode.withgoogle.com/archive/2020/organizations/5037209255673856/",
        num_projects: 9,
      },
    },
  },
  {
    name: "AOSSIE - Australian Open Source Software Innovation and Education",
    url: "http://aossie.org/",
    image_url:
      "https://lh3.googleusercontent.com/vnZyDSkHg8vXeaqv85AbqSY1i01hBkwZxsOS3hJgy7GeFRaXNvUNwamhd2y0pELzJEDoQoZzqdH2zBs_HpC_63clXRxwIj31",
    description: "Australian Umbrella Org for Open-Source Projects",
    category: "End User Applications",
    topics: [
      "logic",
      "electronic voting",
      "natural language processing",
      "philosophy",
      "environment",
      "machine learning",
    ],
    technologies: [
      "scala",
      "javascript/html/css",
      "automated reasoning",
      "android/ios",
      "xcode",
      "isabelle proof assistant",
      "browser extension",
      "javascript/html5/css3",
      "javascript",
      "android",
      "ios",
    ],
    years: {
      2017: {
        projects_url:
          "https://summerofcode.withgoogle.com/archive/2017/organizations/4780102642565120/",
        num_projects: 13,
      },
      2018: {
        projects_url:
          "https://summerofcode.withgoogle.com/archive/2018/organizations/6209824106741760/",
        num_projects: 13,
      },
      2019: {
        projects_url:
          "https://summerofcode.withgoogle.com/archive/2019/organizations/4551437139312640/",
        num_projects: 18,
      },
    },
  },
  {
    name:
      "AOSSIE - The Australian National University's Open-Source Software Innovation and Education",
    url:
      "https://cecs.anu.edu.au/current-students/student-opportunities/google-summer-code-anu",
    image_url:
      "https://lh3.googleusercontent.com/XfzAMWazpWFv5aKpdEt9P6PMkHbX4Hz5LFbxdwNWnBiheiQKPYcUlbneEYs7ipnGdYTxnly9g6XCOF9jHm5lF2LxJxLYH0UJ",
    description:
      "Research-Intensive Open-Source Projects at Australia's Leading University",
    category: "Science and Medicine",
    topics: ["logic", "live programming", "data analysis", "health", "privacy"],
    technologies: ["scala", "lisp", "llvm", "python", "postgresql"],
    years: {
      2016: {
        projects_url:
          "https://summerofcode.withgoogle.com/archive/2016/organizations/5127141637226496/",
        num_projects: 6,
      },
    },
  },
]

const IndexPage = () => {
  const cards = []

  for (const org of orgs) {
    cards.push(
      <Grid.Column>
        <OrgCard data={org} />
      </Grid.Column>
    )
  }

  return (
    <Layout homePage={true}>
      <Grid className="index-org-cards-grid" stackable columns={4}>
        {cards}
      </Grid>
    </Layout>
  )
}

export default IndexPage
