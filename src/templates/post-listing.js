import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostTeaser from "../components/post-teaser"

import * as styles from "./post-listing.module.css"

const PostListingTemplate = ({ data, pageContext }) => {
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
      <div className={styles.pagination}>
        {pageContext.previousPagePath && (
          <Link to={pageContext.previousPagePath}>◂ Previous</Link>
        )}
        {pageContext.nextPagePath && (
          <Link to={pageContext.nextPagePath}>Next ▸</Link>
        )}
      </div>
    </Layout>
  )
}

export default PostListingTemplate

export const pageQuery = graphql`
  query PostListingQuery($skip: Int!, $limit: Int!) {
    allContentfulPost(
      sort: { fields: [createdAt], order: DESC }
      skip: $skip
      limit: $limit
    ) {
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
          childMarkdownRemark {
            excerpt(format: PLAIN, truncate: false, pruneLength: 60)
          }
        }
        hashtags
        createdAt(formatString: "MMMM Do YYYY, H:mm")
      }
    }
  }
`
