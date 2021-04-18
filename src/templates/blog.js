import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"


export default function Blog(props) {
  const data = props.data.markdownRemark

  return (
    <Layout>
        <div>
          <h1>{data.frontmatter.title}</h1>
          <i><h5>{data.frontmatter.date}</h5></i>
        </div>
        <hr/>
        <div
          dangerouslySetInnerHTML={{ __html: data.html }}
        ></div>
    </Layout>
  )
}

//dynamic page query, must occur within each post context
//$slug is made available by context from createPages call in gatsby-node.js
export const getPostData = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
      }
      html
    }
  }
`