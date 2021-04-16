import * as React from "react"
import Layout from '../components/Layout'
import { graphql, Link } from 'gatsby'; 

export default function ProjectsHome({ data }) {
  return (
    <Layout>
      <h2>Projects</h2>
      <p>A few highlights of my open-source projects. See them all on <a href="https://github.com/megfh">github</a></p>
      {data.allMarkdownRemark.edges.map(({ node: post }) => (
        <div key={post.fields.slug}>
          <Link to={post.fields.slug}><h3>{post.frontmatter.title}</h3></Link>
          <p>{post.frontmatter.description}</p>
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
            description
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
