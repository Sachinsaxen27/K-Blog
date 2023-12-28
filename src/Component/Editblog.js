import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Editblog() {
    const [Details, setMyDetails] = useState({ title: "", description: "", tag: "" })
    const [image, setImage] = useState("")
    let location=useNavigate()
    let history = useLocation()
    let data = history.state
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
        setMyDetails({ title: "", description: "", category: "" })
        setImage('')
    }
    const handlesubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/blogadd/updateblog/${data._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title:Details.title,description:Details.description,image:image,category:Details.category })
        });
        const json = response.json()
        if (!json === false) {
            console.log("Success")
            location('/myblog')
        } else {
            console.log("Error")
        }
        console.log(json)
    }
    useEffect(() => {
        setMyDetails({
            title: data.title || '',
            description: data.description || '',
            image: data.image || null,
            category: data.category || '',
        });
    }, [data]);
    const handlechange = (event) => {
        setMyDetails({ ...Details, [event.target.name]: event.target.value })
    }
    console.log(data._id)
    return (
        <>
            <form className='container add_blog'>
                <h2 className='my-2 text-center'>Edit Blog</h2>
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
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type='text' className="form-control" onChange={handlechange} id="category" name="category" value={Details.category} />
                </div>
                <div className='addblog'>
                    <input className="btn btn-primary mx-2 my-2" onClick={handlesubmit} type="submit" value="Submit" />
                    <input className="btn btn-primary mx-2 my-2" onClick={handleReset} type="reset" value="Reset" />
                </div>
            </form>
        </>
    )
}

export default Editblog