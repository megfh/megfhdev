import * as React from "react"
import { Link } from "gatsby"
import Layout from '../components/Layout'


// markup
const NotFoundPage = () => {
  return (
    <Layout>
      <h1>404 Not Found</h1>
      <br></br>
      <p>Hi friend, are you lost? The page you're looking for doesn't seem to exist 😔</p>
      <p>Let's get you back <Link to="/">home</Link></p>
    </Layout>
  )
}

export default NotFoundPage
