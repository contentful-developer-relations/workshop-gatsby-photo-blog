import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hashtag from "../components/hashtag"
import * as styles from "./post.module.css"

function PageTemplate({ data, pageContext }) {
  const post = data.contentfulPost

  return (
    <Layout title={post.title}>
      <SEO title={post.title} />
      <div className={styles.imageWrapper}>
        <GatsbyImage image={post.image.gatsbyImageData} alt={post.title} />
      </div>
      <div className={styles.title}>{post.title}</div>
      <div className={styles.date}>Posted: {post.createdAt}</div>
      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: post.body.childMarkdownRemark.html }}
      />
      <div className={styles.hashtags}>
        {post.hashtags.map(hashtag => (
          <Hashtag key={hashtag} title={hashtag} />
        ))}
      </div>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query postQuery($id: String!) {
    contentfulPost(id: { eq: $id }) {
      id
      title
      body {
        childMarkdownRemark {
          html
        }
      }
      hashtags
      image {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
      }
      createdAt(formatString: "MMMM Do YYYY, H:mm")
    }
  }
`
