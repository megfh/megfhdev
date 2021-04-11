import React from "react"
import { Link } from 'gatsby'; 
import { Helmet } from 'react-helmet'

export default function Layout(props) {
  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>megfh</title>
        <link rel="stylesheet" href="https://fonts.xz.style/serve/inter.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css" />
      </Helmet>
      <header>
        <h1>megfh</h1>
        <nav>
          <Link to="/">home</Link> /&nbsp;
          <Link to="/blog">blog</Link> /&nbsp;
          <Link to="/projects">projects</Link> /&nbsp;
          <Link to="/faq">recruiter faq</Link> /&nbsp;
          <Link to="/contact">contact</Link>
        </nav>
      </header>
      <div>{props.children}</div>
    </>
      
    
  )
}