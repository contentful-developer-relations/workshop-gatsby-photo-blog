import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostTeaser from "../components/post-teaser"

import * as styles from "./post-listing.module.css"

const TagListingTemplate = ({ data, pageContext }) => {
  const posts = data.allContentfulPost.nodes
  const { hashtag } = pageContext
  const title = `#${hashtag}`

  return (
    <Layout title={title}>
      <SEO title={title} />
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

export default TagListingTemplate

export const pageQuery = graphql`
  query TagListingQuery($skip: Int!, $limit: Int!, $hashtag: String!) {
    allContentfulPost(
      filter: { hashtags: { eq: $hashtag } }
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
