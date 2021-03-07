import React from "react"
import { graphql, Link, navigate } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { useSwipeable } from "react-swipeable"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hashtag from "../components/hashtag"
import * as styles from "./post.module.css"

function PageTemplate({ data, pageContext }) {
  const post = data.contentfulBlogPost

  const { previousPost, nextPost } = pageContext

  const swipeHandlers = useSwipeable({
    onSwiped: eventData => {
      const { dir } = eventData

      if (dir === "Right" && previousPost) {
        navigate(previousPost)
      }
      if (dir === "Left" && nextPost) {
        navigate(nextPost)
      }
    },
    preventDefaultTouchmoveEvent: true,
  })

  return (
    <Layout title={post.title}>
      <SEO title={post.title} />
      <div {...swipeHandlers} className={styles.imageWrapper}>
        <GatsbyImage image={post.heroImage.gatsbyImageData} alt={post.title} />
        {previousPost && (
          <Link
            to={previousPost}
            className={`${styles.controls} ${styles.controlPrevious}`}
            title="Previous post"
          >
            ◀
          </Link>
        )}
        {nextPost && (
          <Link
            to={nextPost}
            className={`${styles.controls} ${styles.controlNext}`}
            title="Next post"
          >
            ▶
          </Link>
        )}
      </div>
      <div className={styles.title}>{post.title}</div>
      <div className={styles.date}>Posted: {post.createdAt}</div>
      <div
        className={styles.body}
        dangerouslySetInnerHTML={{ __html: post.body.childMarkdownRemark.html }}
      />
      <div className={styles.hashtags}>
        {post.tags.map(hashtag => (
          <Hashtag key={hashtag} title={hashtag} />
        ))}
      </div>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query postQuery($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      id
      title
      body {
        childMarkdownRemark {
          html
        }
      }
      tags
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
      }
      createdAt(formatString: "MMMM Do YYYY, H:mm")
    }
  }
`
