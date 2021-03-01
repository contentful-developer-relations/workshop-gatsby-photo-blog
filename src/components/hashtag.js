import React from "react"

import * as styles from "./hashtag.module.css"

const Hashtag = ({ title }) => {
  return <div className={styles.tag}>#{title}</div>
}

export default Hashtag
