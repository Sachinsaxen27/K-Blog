const express = require('express')
const User = require('../schema/UserSchema')
const router = express.Router()
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken")
const { body, validationResult } = require('express-validator')
const fetchuser=require('../Middleware/fetchuser')
const validator=require('validator')
// ROUTE 1 FOR USER CREATION
router.post('/usersignup', [
    body('name').isLength({ min: 3, max: 15 }),
    body("email").isEmail(),
    body('password').isLength({ min: 6 })], async (req, res) => {
        let success = false
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email,username:req.body.username})
            if (user) {
                return res.status(400).json({ success, errors: errors.array() });
            }
            const salt = await bcrypt.genSalt(10)
            const secpass = await bcrypt.hash(req.body.password, salt)
            user = await User.create({
                username: req.body.username,
                name: req.body.name,
                mobile: req.body.mobile,
                email: req.body.email,
                password: secpass,
                image: req.body.image
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const jwt_Sign = "Sachin_Saxena"
            const jwttoken = jwt.sign(data, jwt_Sign)
            success = true
            res.json({ success})
        } catch (error) {
            res.status(500).json(error, "Some Error Occurred")
        }
    })
// ROUTER 2 FOR USER LOGIN
router.post("/ulogin", [
    body('password').exists()
], async (req, res) => {
    // For Checking the error or not in your send data
    const errors = validationResult(req);
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }
    // Defactoring the password or email from the database as password or email
    const { password, email, } = req.body
    console.log(email)
    let success = false
    try {
        let user;
        // finding the email
        
        if(validator.isEmail(email)){
            console.log("Checking by email")
            user=await User.findOne({email:email})
        }else{
            console.log("Checking by username")
            user = await User.findOne({ username:email })
        }
        if (!user) {
            return res.status(500).json({ success, error: "Incorrects information" })
        }
        // Comparing the given password and database password
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(500).json({ error: "Incorrectes information" })
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        const jwt_Sign = "Sachin_Saxena"
        const authtoken = jwt.sign(payload, jwt_Sign)
        res.json({ success: true, authtoken })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
// ROUTER 3 FOR USER DATA
router.get('/getuserdata',fetchuser, async (req, res) => {
    try {
        const userId = req.user;
        // console.log(userId,'userid')
        const user = await User.findById(userId).select('-password -_id -__v')
        // console.log(user,'user')
        res.json(user)
    } catch (error) {
        res.status(500).send("Some Error Occurred")
    }
})
module.exports = router