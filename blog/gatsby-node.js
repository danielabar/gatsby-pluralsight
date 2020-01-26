const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === "MarkdownRemark") {
    // Restructuring assignment (ES6)
    const { createNodeField } = actions
    // getNode function used to get node's parent, which contains actual file name used to create slug
    const slug = createFilePath({ node, getNode, basePath: "markdown" })
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

// Create post pages programmatically
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  // This query grabs all the markdown content and passes it to the
  // page template via `context`.
  return new Promise(resolve => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                title
                image
                keywords
              }
              fields {
                slug
              }
              html
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve("./src/templates/post.js"),
          context: {
            slug: node.fields.slug,
            content: node.html,
            keywords: node.frontmatter.keywords,
            title: node.frontmatter.title,
          },
        })
      })
      resolve()
    })
  })
}
