import React, {useState } from 'react'
import "../App.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import BlogAlert from './BlogAlert';


function NavBar(props) {
    const [anchorEl, setAnchorEl] =useState(null);
    const open = Boolean(anchorEl);
    let history=useNavigate()
    const handleClick = (event) => {
        if(localStorage.getItem('token')){
            setAnchorEl(event.currentTarget);
        }
        else{
            history('/login')
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
        history('/myblog')
    };
    const handlelogout=()=>{
        localStorage.clear()
        setAnchorEl(null);
        history('/')
    }
    const handleprofile=()=>{
        setAnchorEl(null);
        history('/profile')
    }
    const handlefavourite=()=>{
        setAnchorEl(null);  
        history('/favourite')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <div className="container text-center">
                        <h1 className='text-light'>K-Blog</h1>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ">
                                <li className="nav-item">
                                    <Link className="nav-link text-light" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" aria-current="page" to="/blog">Blog</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" aria-current="page" to="/news">News</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/science">Science</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/entertainment">Entertainment</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/space">Space</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/video">Video</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div className='user'>
                    <div>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <AccountCircleIcon style={{ color: "white" }} />
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}  
                        >
                            <MenuItem onClick={handleprofile}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My Blog</MenuItem>
                            <MenuItem onClick={handlefavourite}>Saved Blog</MenuItem>
                            <MenuItem onClick={handlelogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </div>
            </nav>
            <BlogAlert/>
        </>
    )
}

export default NavBar