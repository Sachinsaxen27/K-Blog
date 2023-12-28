const express = require('express')
const router = express.Router()
const Blogger = require('../schema/BlogSchema')
const Saveblog = require('../schema/SaveBlogSchema')
const fetchuser = require('../Middleware/fetchuser')
//Router 1  FOR ADDING NEW BLOG
router.post('/newblog', fetchuser, async (req, res) => {
    try {
        let success = false
        let randomNumber = Math.floor(Math.random() * 9000) + 1000;
        let blog;
        if (req.body.url === undefined && req.body.favourite !== 'Favourite') {
            blog = await Blogger.create({
                blogid: randomNumber,
                user: req.user,
                author: req.body.author,
                title: req.body.title,
                description: req.body.description,
                publishedAt: req.body.publishedAt,
                image: req.body.image,
                category: req.body.category
            })
        } else {
            blog = await Saveblog.create({
                blogid: randomNumber,
                user: req.user,
                author: req.body.author,
                title: req.body.title,
                content: req.body.content,
                description: req.body.description,
                publishedAt: req.body.publishedAt,
                url: req.body.url,
                image: req.body.image,
                category: req.body.category
            })

        }
        const savebloges = await blog.save()
        success = true
        res.status(200).json(success)

    } catch (error) {
        console.log(error)
        res.status(500).send("Some Error Occurred")
    }
})
// Route 2 : For fetching blogges in User 
router.get("/fetchblog/:option", fetchuser, async (req, res) => {

    try {
        let blog;
        if (req.params.option === 'favourite') {

            blog = await Saveblog.find({ user: req.user }).sort({ _id: -1 }).select("-user -__v")
            res.json(blog)
        }
        else if (req.params.option === 'myblog') {
            blog = await Blogger.find({ user: req.user }).sort({ _id: -1 }).select("-user -__v")
            res.json(blog)
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Some Error Occurred")
    }
})
// ROUTE 3 FOR FETCHING ADD BLOGS ONLY
router.get('/fetchallblog', async (req, res) => {
    try {
        let blog = await Blogger.find().sort({ _id: -1 }).select('-user -__v')
        res.status(200).json(blog)
    }catch{
        res.status(404).json("Not Found")
    }
})
// Route 4 : For UPDATING BLOG
router.put('/updateblog/:id', fetchuser, async (req, res) => {
    const { title, description, category } = req.body
    const newblog = {}
    if (title) { newblog.title = title }
    if (description) { newblog.description = description }
    if (category) { newblog.category = category }
    console.log(newblog)
    let blog = await Blogger.findById(req.params.id)
    if (!blog) { return res.status(404).send(" Not found") }
    console.log(blog.user)
    if (blog.user.toString() !== req.user) { return res.status(401).send("Not ALlowed") }
    blog = await Blogger.findByIdAndUpdate(req.params.id, { $set: newblog }, { new: true })
    res.json({ blog })
})
// Route 5 : For DELETEING BLOG
router.delete("/deleteblog/:option/:id", fetchuser, async (req, res) => {
    let blog;
    console.log(req.params.option)
    if (req.params.option === 'favourtie') {
        blog = await Saveblog.findById(req.params.id)
        console.log(blog)
        if (!blog) { return res.status(404).send(" Not found") }
        if (blog.user.toString() !== req.user) { return res.status(401).send("Not ALlowed") }
        note = await Saveblog.findByIdAndDelete(req.params.id)
        blog = await Saveblog.find({ user: req.user }).sort({ _id: -1 }).select("-user -__v")
        res.json(blog)
    } else {
        blog = await Blogger.findById(req.params.id)
        if (!blog) { return res.status(404).send(" Not found") }
        if (blog.user.toString() !== req.user) { return res.status(401).send("Not ALlowed") }
        note = await Blogger.findByIdAndDelete(req.params.id)
        blog = await Blogger.find({ user: req.user }).sort({ _id: -1 }).select("-user -__v")
        res.json(blog)
    }
})
module.exports = router