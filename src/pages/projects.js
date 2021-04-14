import * as React from "react"
import Layout from '../components/Layout'
import { graphql, Link } from 'gatsby'; 

export default function ProjectsHome({ data }) {
  return (
    <Layout>
      {data.allMarkdownRemark.edges.map(({ node: post }) => (
        <div key={post.fields.slug}>
          <Link to={post.fields.slug}><h3>{post.frontmatter.title}</h3></Link>
          <br/>
        </div>
      ))}
    </Layout>
    
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "projects" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            sourceLink
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
