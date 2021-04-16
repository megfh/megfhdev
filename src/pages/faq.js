import * as React from "react"
import Layout from '../components/Layout'
import { graphql } from 'gatsby'; 

const FAQ = ({ data }) => {
  return (
    <Layout>
      <h2>For recruiters - FAQ</h2>
      <p><i>Last updated {data.markdownRemark.frontmatter.date}</i></p>
      <div
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      ></div>

    </Layout>
    
  )
}

export const getPostData = graphql`
  query {
    markdownRemark(fields: { slug: { eq: "faq" } }) {
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM Do, YYYY")
      }
      html
    }
  }
`

export default FAQ; 
