const breakPoints = {
  xs: "(max-width: 575px)",
  sm: "(max-width: 767px)",
  md: "(max-width: 991px)",
  l: "(max-width: 1367px)",
  xl: "(max-width: 1920px)",
}

module.exports = {
  siteMetadata: {
    title: `GSoC Organizations`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@nishantwrp`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/images/logo.png`,
      },
    },
    {
      resolve: "gatsby-plugin-breakpoints",
      options: {
        queries: breakPoints,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#db6400`,
        showSpinner: false,
      },
    },
  ],
}
