import React, {  useContext, useEffect, useState } from 'react'
import '../App.css'
import BlogAPI from '../ComponentAPI/BlogAPI'
function AddBlog() {
  let context=useContext(BlogAPI)
  let {Alerts}=context
  let date = new Date()
  let time = (date.toLocaleDateString() + " " + date.toLocaleTimeString())
  const [Details, setMyDetails] = useState({ title: "", description: "", tag: "" })
  const [image, setImage] = useState("")
  const [data, setMydata] = useState([])
  const fetchuser = async () => {
    let token = localStorage.getItem('token')
    if (!token) {
      setMydata([])
    }
    const response = await fetch('http://localhost:5000/api/userlogin/getuserdata', {
      method: "GET",
      headers: {
        "content-type": "application/json",
        'auth-token': localStorage.getItem('token')
      }
    })
    const json = await response.json()
    setMydata(json)

  }
  useEffect(() => {
    fetchuser()
    // eslint-disable-next-line 
  }, [])
  const AddNewBlog = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/api/blogadd/newblog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ author: data.name, title: Details.title, description: Details.description, publishedAt: time, image: image, category: Details.tag })
    });
    const json = response.json()
    if (!json === false) {
      Alerts("Blog Post","Success")
      setMyDetails({ title: "", description: "", tag: "" })
      setImage('')
    } else {
      console.log('error')
      // Alert("Error")
    }
  }
  const convertobase64 = (e) => {
    // console.log(e)
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.onerror = error => {
      console.error("Error", error)
    }
  }
  const handleReset = () => {
    setMyDetails({ title: "", description: "", tag: "" })
    setImage('')
  }
  const handlechange = (event) => {
    setMyDetails({ ...Details, [event.target.name]: event.target.value })
  }
  return (
    <>
      <form className='container add_blog'>
        <h2 className='my-2 text-center'>Add Blog</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' value={Details.title} onChange={handlechange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea type='text' rows='3' className="form-control" id="description" name='description' onChange={handlechange} value={Details.description} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Image</label>
          <input type="file" name="image" id="image" className="form-control" onChange={convertobase64} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type='text' className="form-control" onChange={handlechange} id="tag" name='tag' value={Details.tag} />
        </div>
        <div className='addblog'>
          <input className="btn btn-primary mx-2 my-2" onClick={AddNewBlog} type="submit" value="Submit" />
          <input className="btn btn-primary mx-2 my-2" onClick={handleReset} type="reset" value="Reset" />
        </div>
      </form>
    </>
  )
}

export default AddBlog