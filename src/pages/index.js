import * as React from "react"
import Layout from '../components/Layout'
import { Link } from 'gatsby'; 


const IndexPage = () => {
  return (
    <Layout>
      <h2>Hello, world! 👋 </h2>
      <br/>
      <p>
        My name is Meg, and I'm a software developer. I built this site to showcase some of my <Link to="/projects">projects</Link>, share some <Link to="/blog">writing</Link>, 
        and honestly just have some fun. 
      </p> 
      <p>
        The site is built with <a href="https://www.gatsbyjs.com/">Gatsby</a>, 
        the blog is powered by <a href="https://forestry.io/">Forestry CMS</a>, 
        and all of it is styled with <a href="https://newcss.net/">new.css</a>. 
        Please take a look around, and don't hesitate to <Link to="/contact">get in touch!</Link>
      </p> 
    </Layout>
    
  )
}

export default IndexPage
