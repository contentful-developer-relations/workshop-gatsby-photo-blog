import React from "react"
import { Link } from "gatsby"

import * as styles from "./hashtag.module.css"

const Hashtag = ({ title }) => {
  return (
    <Link to={`/hashtag/${title}`} className={styles.tag}>
      #{title}
    </Link>
  )
}

export default Hashtag
