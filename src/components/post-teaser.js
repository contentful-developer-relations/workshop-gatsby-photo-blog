import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

import Hashtag from "./hashtag"
import * as styles from "./post-teaser.module.css"

const PostTeaser = ({ post }) => {
  return (
    <div className={styles.wrapper}>
      <figure className={styles.figure}>
        <GatsbyImage image={post.image.gatsbyImageData} alt={post.title} />
        <figcaption className={styles.figcaption}>{post.title}</figcaption>
      </figure>
      <div className={styles.date}>Posted: {post.createdAt}</div>
      <div className={styles.hashtags}>
        {post.hashtags.map(hashtag => (
          <Hashtag key={hashtag} title={hashtag} />
        ))}
      </div>
    </div>
  )
}

export default PostTeaser
