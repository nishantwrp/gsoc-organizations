import React from "react"

import "./404.css"

import SEO from "../components/seo"
import { Link } from "gatsby"

const NotFoundPage = () => (
  <div className="page-404-container">
    <SEO title="404 - Not found" />
    <table className="page-404-table">
      <tbody>
        <tr>
          <td className="page-404-content">
            <h1 className="page-404-header">404</h1>
            <p className="page-404-content-main">
              Go to{" "}
              <Link to="/">
                <u>home page</u>
              </Link>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default NotFoundPage
