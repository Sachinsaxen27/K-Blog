import React from 'react'
import "../App.css"
function FooterBar() {

    return (
        <>
            <div style={{ backgroundColor: "#232F3E", height: "15rem" }}>
                <div style={{ backgroundColor: '#37475A', display: 'grid', justifyContent: 'center' }}><div className='text-light my-2' style={{ fontSize: '13px' }}>
                    <i className="fa-brands fa-facebook fa-2xl" style={{ color: "#0457e7" }}></i>
                    <i className="fa-brands fa-twitter fa-2xl" style={{ color: "#005eff" }}></i>
                    <i className="fa-brands fa-square-instagram fa-2xl" style={{ color: "#f78178" }}></i>
                    <i className="fa-brands fa-youtube fa-2xl" style={{ color: "#ff0000" }}></i>
                </div></div>
                <div style={{ backgroundColor: '#131A22', height: "10rem" }}>
                    <div>&nbsp;</div>
                    <div className="container text-center" >
                        <a href="/" style={{ color: '#DDD', fontSize: '12px', margin: '5px' }}>Conditions of Use & Sale  </a>
                        <a href="/" style={{ color: '#DDD', fontSize: '12px', margin: '5px' }}>Privacy Notice  </a>
                        <a href="/" style={{ color: '#DDD', fontSize: '12px', margin: '5px' }}>Interest-Based Ads</a>
                        <br />
                        <p style={{ color: '#DDD', fontSize: '12px' }}>© 2023, K-Blog.com, Inc. or its affiliates</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FooterBar