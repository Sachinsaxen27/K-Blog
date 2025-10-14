import React, { useEffect, useState } from 'react'
import BlogAPI from './BlogAPI'
function BlogState(props) {
  const [blogges, setMyblogges] = useState([])
  const GetBlog = async () => {
    const response = await fetch('https://session-backend-tivg.onrender.com/api/blogadd/fetchblog/favourite', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    })
    const json = await response.json()
    setMyblogges(json)
  }

  const [status, setMystatus] = useState({msg:null,type:null})
  const Alerts = (msg,type) => {
    setMystatus({msg:msg,type:type})
  }
  useEffect(() => {
    if(localStorage.getItem('token')){
      GetBlog()
    }
    // eslint-disable-next-line 
  }, [])
  return (
    <BlogAPI.Provider value={{blogges, status, Alerts }}>
      {props.children}
    </BlogAPI.Provider>
  )
}

export default BlogState