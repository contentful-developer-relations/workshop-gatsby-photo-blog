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
        allContentfulPost(sort: { fields: [createdAt], order: DESC }) {
          nodes {
            title
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const blogPosts = result.data.allContentfulPost.nodes

  paginate({
    createPage,
    items: blogPosts,
    itemsPerPage: 2,
    pathPrefix: "/",
    component: path.resolve("./src/templates/post-listing.js"),
  })
}
