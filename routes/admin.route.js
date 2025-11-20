const express = require("express")
const User = require("../models/user.model")
const Post = require("../models/post.model")
const router = express.Router()


router.get("/", (req, res) => {
    res.render("admin")
})


router.get("/users", async (req, res) => {
    res.send(await User.findAll({}))
})


router.get("/users/:id", async (req, res) => {
    const user = await User.findOne({where: {userId: req.params.id} })
    res.render("edit-user", {user})
})


router.post("/users/:id", async (req, res) => {
    await User.update(
        req.body, 
        { where: {userId: req.params.id} }
    )
    res.redirect("/admin")
})


router.get("/posts", async (req, res) => {
    res.send(await Post.findAll({}))
})


router.delete("/posts/:id", async (req, res) => {
    try {
        await Post.destroy({ where: { userId: req.params.id }})
        res.send({ message: "User deleted" })
    }
    catch (err) {
        console.log(err)
        res.send({ error: "Something went wrong" })
    }
})


router.delete("/users/:id", async (req, res) => {
    try {
        await User.destroy({ where: { userId: req.params.id }})
        res.send({ message: "User deleted" })
    }
    catch (err) {
        console.log(err)
        res.send({ error: "Something went wrong" })
    }
})


module.exports = router