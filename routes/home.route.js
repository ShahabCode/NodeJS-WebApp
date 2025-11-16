const express = require("express")
const router = express.Router()
const User = require("../models/user.model.js")
const Post = require("../models/post.model.js")

router.get("/", async (req, res) => {
    var users = await User.findAll({})
    const posts = await Post.findAll({
        limit:10, order: [["createdAt", "DESC"]] 
    })

    if (req.query.q){
        var users = await User.findAll({
            where: {
                firstName: req.query.q
            }
        })
    } 
    res.render("home", {
        users, posts: posts.map((item, index) => {
            return {
                id: item.id,
                title: item.title,
                cover: item.cover,
                content: item.content.substring(0, 50)
            }
        })
    })
}) 
 
// router.get("home/posts", async (req, res) => {
   
// })

module.exports = router