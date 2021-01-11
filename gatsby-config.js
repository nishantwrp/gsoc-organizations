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
    siteUrl: `https://www.gsocorganizations.dev`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-114654874-3",
        head: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GSoC Organizations`,
        short_name: `GSoC Organizations`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#db6400`,
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
    {
      resolve: `@isamrish/gatsby-plugin-google-adsense`,
      options: {
        googleAdClientId: "ca-pub-9769516184087442",
        head: true,
      },
    },
  ],
}
