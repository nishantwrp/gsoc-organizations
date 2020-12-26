<p align="center">
  <a href="https://www.gsocorganizations.dev">
    <img alt="GSoC Organizations" src="./static/images/logo.png" width="60" />
  </a>
</p>
<h1 align="center">
  GSoC Organizations
  <br>
  <center>
  <img src="https://img.shields.io/badge/Built%20using-Gatsby-purple">
  <img src="https://madewithlove.now.sh/in" alt="Made with love in India">
  <img src="https://github.com/nishantwrp/gsoc-organizations/workflows/Lint%20checks/badge.svg">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat">
  <img src="https://david-dm.org/nishantwrp/gsoc-organizations.svg">
  <img src="https://img.shields.io/github/license/nishantwrp/gsoc-organizations">
  </center>
</h1>

A site for viewing and analysing the info of the organizations participating in [Google Summer of Code](https://summerofcode.withgoogle.com/) and filtering them by various factors like years of participation, categories, etc.

## Tech Stack

- [Gatsby](https://www.gatsbyjs.com/) - Gatsby is the frontend framework used for developing this site.
- [Redoc](https://redocly.github.io/redoc/) - Redoc is used for generating api docs.

## 💫 Deployment Status

#### Main Site

<a href="https://app.netlify.com/sites/gsoc-organizations/deploys"><img src="https://api.netlify.com/api/v1/badges/71cda104-920e-48f6-aa35-5c7c63655261/deploy-status"></a>

#### API docs

<a href="https://app.netlify.com/sites/gsoc-organizations-api/deploys"><img src="https://api.netlify.com/api/v1/badges/15064b7c-f1e9-43cd-8c7e-a3709214d21e/deploy-status"></a>

## 🚀 Contributing

Contributions are most welcome in this project be it reporting an issue or sending a pull request.

Some of the things you could help with currently are -

1. **Improving custom filters**

   The data displayed is scraped from the official [GSoC Archive](https://summerofcode.withgoogle.com/archive). There may be some errors in the data. To tackle that custom filters are applied on the data which are defined in [api/filters](https://github.com/nishantwrp/gsoc-organizations/tree/master/api/filters). The filters can be improved a lot.

   Example 1 - There may be duplicate organizations on the site which is due to them having different names. To tackle them you can add filters in [api/filters/name-filters.js](https://github.com/nishantwrp/gsoc-organizations/blob/master/api/filters/name-filters.js).

   Example 2 - Some technologies are also modified because they may have some spelling mistakes or for the sake of better filtering. You can see that in [api/filters/technology-filters.js](https://github.com/nishantwrp/gsoc-organizations/blob/master/api/filters/technology-filters.js). For instance we have broken down `javascript/html/css` technology to `javascript`, `html` and `css`.

   The other filters also work in same way. It would be great if you can contribute to these filters in case you see any scope of improvement.

1. **Improving UI / UX**

   PRs that improve the UI / UX are greatly appreciated.

1. **Adding features**

   If you can think of feature which would help make the site better for people interested in Google Summer of Code, feel free to open an issue for discussion over that feature.
