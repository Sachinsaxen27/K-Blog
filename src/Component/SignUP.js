import React, { useContext, useState } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import i from './i.png'
import { Link, useNavigate } from 'react-router-dom'
import "../App.css"
import BlogAPI from '../ComponentAPI/BlogAPI';
function SignUP() {
    const context=useContext(BlogAPI)
    const {Alerts}=context
    const pagedirection=useNavigate()
    const [credintial, setMycredintial] = useState({ name: "", email: "", password: "", mobile: "",username:""})
    const [image,setImage]=useState("")
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
    const handlesubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/userlogin/usersignup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({name:credintial.name,mobile:credintial.mobile,email:credintial.email,password:credintial.password,username:credintial.username,image:image})
        });
        const json = await response.json()
        if (json.success) {
            pagedirection("/")
            Alerts("Account Create Successfully","Success")
        }else{
            Alerts("Invalid details","Danger")
        }
    }
const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'number' && !isNaN(value)) {
        setMycredintial({ ...credintial, [name]: value });
    } else if (name !== 'number') {
        setMycredintial({ ...credintial, [name]: value });
    }
    // setMycredintial({ ...credintial, [e.target.name]: e.target.value })

}
    return (
        <>
            <div className="container text-center" style={{ marginTop: '47px', height: '32rem', width: '24rem' }} >
                <div className="container text-center" style={{ marginTop: '25px' }}>
                    <div className="row align-items-start">
                        <div className="col">
                        </div>
                        <div className="col">
                            <div className="card" style={{ width: "22rem", backgroundColor: 'aliceblue', boxShadow: "3px 0px 10px 20px" }}>
                                <div className="card-body">
                                    <h5 className="card-title" style={{ textAlign: 'start', fontSize: '30px' }}>Create Account</h5>
                                    <h6 className="card-subtitle mb-2 text-body-secondary" style={{ textAlign: 'start', marginTop: '16px' }}>Your Profile Pic</h6>
                                    <div style={{ display: 'grid', marginTop: "5px", marginBottom: '10px' }}>
                                    <input style={{ backgroundColor: 'transparent' }} className="form-control" type="file" id="image" name='image' onChange={convertobase64} required />
                                    </div>
                                    <h6 className="card-subtitle mb-2 text-body-secondary" style={{ textAlign: 'start', marginTop: '16px' }}>Your Name</h6>
                                    <div style={{ display: 'grid', marginTop: "5px", marginBottom: '10px' }}>
                                        <input type='text' value={credintial.name} name="name" id="name" onChange={handleChange} />
                                    </div>
                                    <h6 className="card-subtitle mb-2 text-body-secondary" style={{ textAlign: 'start', marginTop: '16px' }}>UserName</h6>
                                    <div style={{ display: 'grid', marginTop: "5px", marginBottom: '10px' }}>
                                        <input type='text' value={credintial.username} name="username" id="username" onChange={handleChange} />
                                    </div>
                                    <h6 className="card-subtitle mb-2 text-body-secondary" style={{ textAlign: 'start' }}>Mobile Number</h6>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input type="number" id="number" value={credintial.mobile} name="mobile" onChange={handleChange} />
                                    </div>
                                    <h6 className="card-subtitle mb-2 text-body-secondary" style={{ textAlign: 'start', marginTop: '16px' }}>Email(Optional)</h6>
                                    <div style={{ display: 'grid', marginTop: "5px", marginBottom: '10px' }}>
                                        <input type="email" name="email" value={credintial.email} id="email" style={{ height: '39px', backgroundColor: "transparent", border: '1px solid gray', borderRadius: "5px" }} onChange={handleChange} />
                                    </div>
                                    <h6 className="card-subtitle mb-2 text-body-secondary" style={{ textAlign: 'start', marginTop: '16px' }}>Password</h6>
                                    <div style={{ display: 'grid', marginTop: "5px", marginBottom: '10px' }}>
                                        <input type="password" name="password" id="password" value={credintial.password} style={{ height: '39px', backgroundColor: "transparent", border: '1px solid gray', borderRadius: "5px" }} onChange={handleChange} />
                                        <p style={{ fontSize: "12px", textAlign: 'start', display: 'flow' }}> <img src={i} alt="i" style={{ width: '12px' }} /> Passwords must be at least 6 characters.</p>
                                    </div>
                                    <div style={{ display: 'grid', marginTop: '15px' }}>
                                        <button style={{ borderRadius: '8px', backgroundColor: "lightcyan", height: '35px' }} onClick={handlesubmit} >Continue</button>
                                    </div>
                                    <div>&nbsp;</div>
                                    <div style={{ textAlign: 'start', position: 'relative', right: '6px' }}>
                                        <span style={{ fontWeight: '700', fontSize: "14px", marginLeft: '5px' }}>Already have an account?</span>
                                        <span>
                                            <Link to='/signin' style={{ fontSize: '13px', marginLeft: '5px' }}>Sign in<ArrowRightIcon style={{ position: "relative", top: '0px', right: '6px' }} /></Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUP