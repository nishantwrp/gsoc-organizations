import React, { memo, useState, useEffect } from "react"
import PropTypes from "prop-types"
import slugify from "slugify"
import { useBreakpoint } from "gatsby-plugin-breakpoints"

import "./org-card.css"
import { useAppDispatch } from "../store"
import { addOrgToShortlist, removeOrgToShortlist } from "../store/bookmark"
import { Link } from "gatsby"
import { addCount, removeCount } from "../store/bookmark"
import { Icon } from "semantic-ui-react"

const getIfOrgSaved = orgname => {
  if (typeof window !== "undefined") {
    var curr_orgs = localStorage.getItem("gsoc_orgs")
    if (curr_orgs === null || curr_orgs.indexOf(orgname) == -1) {
      return false
    } else {
      return true
    }
  }
}
const OrgCard = ({ data }) => {
  const [ifOrgNotSaved, setIfOrgSaved] = useState(
    !getIfOrgSaved(data.name) ? true : false
  )
  const isMobile = useBreakpoint().md
  const dispatch = useAppDispatch()
  const years = Object.keys(data.years)
    .map(year => {
      return (
        <span key={year} className="org-card-year">
          {year}
        </span>
      )
    })
    .reverse()

  const addOrRemoveBookmark = value => {
    let isPresent = getIfOrgSaved(value)
    isPresent ? removeOrgToShortlist(value) : addOrgToShortlist(value)
    isPresent ? dispatch(removeCount()) : dispatch(addCount())
    setIfOrgSaved(ifOrgNotSaved => !ifOrgNotSaved)
  }

  let technologies = data.technologies.map(tech => {
    return (
      <span key={tech} className="org-card-technology">
        {tech}
      </span>
    )
  })

  if (technologies.length > 5) {
    const extra = technologies.length - 5
    technologies = technologies.slice(0, 5)
    technologies.push(
      <span key={`#${extra} more`} className="org-card-technology-extra">
        {extra} more
      </span>
    )
  }

  const card = (
    <div>
      <div
        className="org-card-logo-container"
        style={{
          backgroundColor: data.image_background_color,
        }}
      >
        <div
          className="org-card-logo"
          style={{
            backgroundImage: `url(${data.image_url})`,
          }}
        ></div>
      </div>
      <div className="org-card-name-container">{data.name}</div>
      <div className="org-card-category-container">
        <span>{data.category}</span>
      </div>
      <div className="org-card-description-container">{data.description}</div>
      <div className="org-card-years-container">{years}</div>
      <div className="org-card-technologies-container">{technologies}</div>
    </div>
  )

  return isMobile ? (
    <div className="org-card-container">
      <div onClick={() => addOrRemoveBookmark(data.name)}>
        <Icon
          key={Math.random()}
          name={ifOrgNotSaved ? "bookmark outline" : "remove bookmark"}
          size="big"
        />
      </div>
      <Link to={`/organization/${slugify(data.name, { lower: true })}/`}>
        {card}
      </Link>
    </div>
  ) : (
    <div className="org-card-container">
      <div onClick={() => addOrRemoveBookmark(data.name)}>
        <Icon
          key={Math.random()}
          name={ifOrgNotSaved ? "bookmark outline" : "remove bookmark"}
          size="big"
        />
      </div>
      <a
        href={`/organization/${slugify(data.name, { lower: true })}/`}
        target="_blank"
        rel="noreferrer"
      >
        {card}
      </a>
    </div>
  )
}

OrgCard.propTypes = {
  data: PropTypes.object.isRequired,
}

const isSameOrg = (prevData, newData) => {
  return prevData.data.name === newData.data.name
}

export default memo(OrgCard, isSameOrg)
