import React, { useEffect, useState } from 'react'
import SpeedDailer from './SpeedDailer'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function Blog() {
  const [blog, setMyblog] = useState([])
  let history = useNavigate()
  const fetchallblog = async () => {
    const response = await fetch('https://session-backend-tivg.onrender.com/api/blogadd/fetchallblog', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    let json = await response.json()
    setMyblog(json)
  }
  useEffect(() => {
    fetchallblog()
  }, [])
  const [favorites, setFavorites] = useState([])
  const handleclid = async (blogid, element) => {
    if (localStorage.getItem('token')) {

      AddNewBlog(element)
      const updatedFavorites = [...favorites];
      const index = updatedFavorites.indexOf(blogid);
      if (index === -1) {
        updatedFavorites.push(blogid);
      } else {
        updatedFavorites.splice(index, 1);
      }
      setFavorites(updatedFavorites);
    } else {
      history('/login')
    }
  };
  const AddNewBlog = async (element) => {
    const response = await fetch('https://session-backend-tivg.onrender.com/api/blogadd/newblog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ author: element.author, title: element.title, description: element.description, publishedAt: element.publishedAt, image: element.image, category: element.category, favourite: "Favourite" })
    });
    const json = response.json()
    console.log(json)
  }
  // const handleopen = (element) => {
  //   history('/open', { state: element })
  // }
  const [opendata,setMyopendata]=useState([])
  const [open, setOpen] =useState(false);
  const handleOpen = (element) => {
    setMyopendata(element)
    setOpen(true)
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className='row my-2' style={{ overflowX: 'auto', width: '79.7rem' }}>
        {blog?.map((element, index) => {
          let isfavourite = favorites.includes(element.blogid)
          return <div className="col md-4 " key={index}>
            <div className={`card my-1`} style={{ width: "19rem", height: "25.1rem", overflow: "hidden" }}>
            <img src={element.image?element.image:"https://images.moneycontrol.com/static-mcnews/2023/02/FM-1-737x435.jpeg"} className="card-img-top w-100 p-3"style={{height: "200px"}} alt="..."/>
              <div className="card-body" style={{ width: '18rem' }} >
                <h5 className='card-title'>{(element.title).slice(0, 30)}...</h5>
                <p className="card-text" >{!element.description ? "" : (element.description).slice(0, 50)}...</p>
                <p className="card-text" ><small className="text ">By:-{element.author ? (element.author).slice(0, 15) : "Unknown"}</small></p>
                <button rel="noreferrer" onClick={()=>handleOpen(element)} className='btn btn-sm btn-primary' style={{ position: "absolute", top: "22.6rem" }}>Read More</button>
                {isfavourite ?
                  <FavoriteIcon style={{ position: "absolute", left: "14rem", top: "22.6rem", color: 'red', cursor: "pointer" }} /> :
                  <FavoriteBorderIcon onClick={() => handleclid(element.blogid, element)} style={{ position: "absolute", left: "14rem", top: "22.6rem", cursor: 'pointer' }} />
                }
              </div>
            </div>
          </div>
        })}
      </div >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <img src={!opendata.image?"https://images.moneycontrol.com/static-mcnews/2023/02/FM-1-737x435.jpeg":opendata.image} className="img-thumbnail" alt="..."/>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {opendata.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {opendata.description}
          </Typography>
        </Box>
      </Modal>
      <SpeedDailer />
    </>
  )
}

export default Blog