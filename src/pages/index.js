import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostTeaser from "../components/post-teaser"

import * as styles from "./index.module.css"

const IndexPage = ({ data }) => {
  const posts = data.allContentfulPost.nodes

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby &amp; Contentful based photo blog.</p>
      <div className={styles.postsWrapper}>
        {posts.map(post => (
          <PostTeaser post={post} key={post.slug} />
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allContentfulPost {
      nodes {
        title
        slug
        image {
          gatsbyImageData(
            aspectRatio: 1.778
            width: 960
            cropFocus: CENTER
            layout: CONSTRAINED
            resizingBehavior: FILL
            placeholder: BLURRED
          )
        }
        body {
          body
        }
        hashtags
        createdAt(formatString: "MMMM Do YYYY, H:mm")
      }
    }
  }
`
