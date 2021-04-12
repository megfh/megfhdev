import * as React from "react"
import Layout from '../components/Layout'
import { graphql, Link } from 'gatsby'; 

export default function BlogHome({ data }) {
  console.log(data);
  return (
    <Layout>
      <h2>A collection of projects, thoughts & musings</h2>
      <hr/>
      {data.allMarkdownRemark.edges.map(({ node: post }) => (
        <div key={post.fields.slug}>
          <Link to={post.fields.slug}><h3>{post.frontmatter.title}</h3></Link>
          <p>{post.frontmatter.date}</p>
          <br/><hr/>
        </div>
      ))}
    </Layout>
    
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { collection: { eq: "blog" } } }
    ) {
      totalCount
      edges {
        node {
          html
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
