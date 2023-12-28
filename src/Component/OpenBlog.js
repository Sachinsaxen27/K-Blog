import React from 'react'
import { useLocation } from 'react-router-dom'

function OpenBlog() {
    let location=useLocation()
    let data=location.state
    console.log(data)
  return (
    <div>OpenBlog</div>
  )
}

export default OpenBlog