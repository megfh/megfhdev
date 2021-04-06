import React from "react"

export default function Layout(props) {
  return (
    <div>
      <h1>My Awesome Layout</h1>
      <div>{props.children}</div>
    </div>
      
    
  )
}