import * as React from "react"
import Layout from '../components/Layout'
import { Link } from 'gatsby';

const Contact = () => {
  return (
    <Layout>
      <h2>Get in touch</h2>
      <ul>
        <li>Want to be friends? Say hi on <a href="https://twitter.com/megfhdev">twitter</a> 👋</li>
        <li>Want to chat about a job opportunity? Please take a look at my <Link to="/faq">recruiter faq</Link> 👩‍💻</li>
        <li>Curious about this site? Checkout the code on <a href="https://github.com/megfh/megfhdev">github</a> 🛠</li>
        <li>Anything else? Email me at <a href="mailto:megfhannon@gmail.com">megfhannon@gmail.com</a> 📥</li>
      </ul>
    </Layout>
    
  )
}

export default Contact; 