import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Spinner from './Spinner'
import { useLocation, useNavigate } from 'react-router-dom';
import BlogAPI from '../ComponentAPI/BlogAPI';
function Home(props) {
    let dates = new Date()
    let year = dates.getFullYear()
    let month = dates.getMonth() + 1
    let predate = dates.getDate() - 1
    let location = useLocation()
    const context = useContext(BlogAPI)
    const { blogges } = context
    const [newsapi, setMyNewsapi] = useState([])
    const [page, setMypage] = useState(1)
    const [totalresult, setMytotalResult] = useState(0)
    const [loading, setMyloading] = useState(false)
    const FetchNews = async () => {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${props.category}&from=${year + '-' + month + "-" + predate}&to=${dates.toLocaleDateString()}&sortBy=popularity&apiKey=a92e8782-b0bd-4d67-ac8b-d7ed56a7fa26&page=${page}&pagesize=6`)
        setMyloading(true)
        const json = response.data
        setMyNewsapi(json.articles)
        setMytotalResult(json.totalResults)
        setMyloading(false)


    }
    const capitalizedfun = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    useEffect(() => {
        FetchNews()
        if (location.pathname === '/') {
            document.title = 'K-Blog'
        }
        else if (props.category === 'technology') {
            document.title = 'News'
        }
        else {
            document.title = capitalizedfun(props.category)
        }
        const updatedFavorites = [...favorites];
        for (let i = 0; i < blogges.length; i++) {
            let element = blogges[i]
            const index = updatedFavorites.indexOf(element.url);
            if (index === -1) {
                updatedFavorites.push(element.url);
            } else {
                updatedFavorites.splice(index, 1);
            }
            setFavorites(updatedFavorites);
        }
        // eslint-disable-next-line 
    }, [])
    const FetchNext = async () => {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${props.category}&from=${year + '-' + month + "-" + predate}&to=${dates.toLocaleDateString()}&sortBy=popularity&apiKey=dc02ca6ff93e4e90b2681bb1451b2465&page=${page + 1}&pagesize=6`)
        setMypage(page + 1)
        setMyloading(true)
        const json = response.data
        setMyNewsapi(newsapi.concat(json.articles))
        setMytotalResult(json.totalResults)
        setMyloading(false)
    }

    const [favorites, setFavorites] = useState([]);
    let history=useNavigate()
    const handleclid = async (urlto, element) => {
        if(localStorage.getItem('token')){
            AddNewBlog(element)
            const updatedFavorites = [...favorites];
            const index = updatedFavorites.indexOf(urlto);
            if (index === -1) {
                updatedFavorites.push(urlto);
            } else {
                updatedFavorites.splice(index, 1);
            }
            setFavorites(updatedFavorites);
        }
        else(
            history('/login')
        )
    };
    const AddNewBlog = async (element) => {
        const response = await fetch('https://k-blog-article.onrender.com/api/blogadd/newblog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ author: element.author, title: element.title, content: element.content, description: element.description, publishedAt: element.publishedAt, url: element.url, image: element.urlToImage })
        });
        const json = response.json()
        console.log(json)
    }
    return (
        <>
            <InfiniteScroll
                dataLength={newsapi.length}
                next={FetchNext}
                hasMore={newsapi.length !== totalresult}
                loader={loading ? <Spinner /> : ""}
            >
                <div className='row' style={{ overflowX: 'auto' }}>
                    {newsapi?.map((element, index) => {
                        console.log(element)
                        let isfavourite = favorites.includes(element.url)
                        return <div className="col md-4 " key={index}>
                            <div className={`card my-1`} style={{ width: "19rem", height: "25.1rem", overflow: "hidden" }}>
                            <img src={element.urlToImage?element.urlToImage:"https://images.moneycontrol.com/static-mcnews/2023/02/FM-1-737x435.jpeg"} className="card-img-top w-100 p-3"style={{height: "200px"}} alt="..."/>
                       
                               <div className="card-body" >
                                    <h5 className='card-title'>{(element.title).slice(0, 30)}...</h5>
                                    <p className="card-text" >{!element.description ? "" : (element.description).slice(0, 50)}...</p>
                                    <p className="card-text" ><small className="text ">By:-{element.author ? (element.author).slice(0, 15) : "Unknown"}</small></p>
                                    <a href={element.url} target='_blank' rel="noreferrer" className='btn btn-sm btn-primary' style={{ position: "absolute", top: "22.6rem" }}>Read More</a>
                                    {isfavourite?<FavoriteIcon style={{ position: "absolute", left: "14rem", top: "22.6rem", color: 'red', cursor: "pointer" }} />:
                                    <FavoriteBorderIcon onClick={() => handleclid(element.url, element)} style={{ position: "absolute", left: "14rem", top: "22.7rem", cursor: 'pointer' }} />}
                                </div>
                            </div>
                        </div>
                    })}
                </div >
            </InfiniteScroll >
        </>
    )
}

export default Home