import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Title from "../components/title"
import { graphql } from "gatsby"
import Article from "../components/article"

export default ({ data }) => (
  <Layout>
    <Title text="Welcome" />
    <nav>
      <Link to="/">Home</Link> | <Link to="/about">About Me</Link>
    </nav>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
      voluptates earum et autem facilis aliquam? Architecto, quibusdam
      dignissimos repellendus harum ipsum eius facilis, necessitatibus
      aspernatur, recusandae non labore magnam tempora?
    </p>
    <div className="posts">
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Article
          id={node.id}
          to="/"
          keywords={node.frontmatter.keywords}
          title={node.frontmatter.title}
          date={node.frontmatter.date}
          excerpt={node.excerpt}
        />
      ))}
    </div>
  </Layout>
)

export const query = graphql`
  {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            image
            keywords
            date(formatString: "MMMM YYYY")
          }
          excerpt
        }
      }
    }
  }
`
