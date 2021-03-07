/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
const path = require("path")

const { paginate } = require("gatsby-awesome-pagination")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      query PostsQuery {
        allContentfulBlogPost(sort: { fields: [createdAt], order: DESC }) {
          nodes {
            id
            title
            slug
            tags
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const blogPosts = result.data.allContentfulBlogPost.nodes

  paginate({
    createPage,
    items: blogPosts,
    itemsPerPage: 2,
    pathPrefix: "/",
    component: path.resolve("./src/templates/post-listing.js"),
  })

  const hashtagsMap = new Map()

  // Detail pages
  blogPosts.forEach((post, i) => {
    const { id, slug, tags } = post

    // Gather unique hashtags
    tags.map(hashtag => {
      const postList = hashtagsMap.get(hashtag) || []
      postList.push(post)
      hashtagsMap.set(hashtag, postList)
    })

    createPage({
      path: `/post/${slug}`,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        id,
        previousPost: blogPosts[i - 1] && `/post/${blogPosts[i - 1].slug}`,
        nextPost: blogPosts[i + 1] && `/post/${blogPosts[i + 1].slug}`,
      },
    })
  })

  // Hashtag listing pages
  hashtagsMap.forEach((postList, hashtag) => {
    paginate({
      createPage,
      items: postList,
      itemsPerPage: 2,
      pathPrefix: `/hashtag/${hashtag}`,
      component: path.resolve("./src/templates/hashtag-listing.js"),
      context: { hashtag },
    })
  })
}
