import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Title from "../components/title"
import styles from "./post.module.scss"

// props.pageContext object contains context from gatsby-node.js createPages
export default props => {
  // props.data contains results of page query but we don't need it
  // const post = props.data.markdownRemark
  const content = props.pageContext.content
  const keywords = props.pageContext.keywords
  const title = props.pageContext.title

  return (
    <Layout>
      <div className={styles.container}>
        <Title text={title}></Title>
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundColor: "#fafafa",
            backgroundImage:
              "Url(https://source.unsplash.com/960x200/?" + keywords + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            marginBottom: "30px",
          }}
        ></div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </Layout>
  )
}

// Was shown in course but not needed because pageContext has everything we need
// query will filter by slug using parameter $slug
// eg: slug === 'gatsby-awesome'
// eg: slug === 'react-powerful'
// query returns post content (html), title and keywords
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        keywords
      }
    }
  }
`
