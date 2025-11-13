const express = require("express")
const router = express.Router()
const User = require("../models/user.model.js")
const jwt = require("jsonwebtoken")
const { requireAuth } = require("../middlewares/auth.middleware.js")
const multer = require("multer")
const { where } = require("sequelize")
const Post = require("../models/post.model.js")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "static/user-files/") // Set the directory for storing uploaded files
    }, 
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Keep the original filename
    }
})
const upload = multer({storage:storage})


router.get("/profile", requireAuth, async (req, res) => {
    const user = await User.findOne({
        where: {
            email: res.locals.decoded.email
        }
    })

    if (user) {
        res.render('profile', { user })
    } else {
        res.redirect("/auth/login")
    }
})


router.post("/profile", requireAuth, upload.single("profile_image"), async (req, res) => {
    const profile_image = req.file?.originalname
    const { firstName, lastName, bio } = req.body
    const { current_password, new_password, confirm_new_password } = req.body

    if (profile_image) {
        const static_path = `/user-files/${profile_image}`

        await User.update(
            {
               profile_image: static_path
            }, 
            {
                 where: {
                    email: res.locals.decoded.email
                 }
            }
        )
    } else if (current_password && new_password && confirm_new_password){
        const user = await User.findOne({
            where: {
                email: res.locals.decoded.email
            }
        })

        if (current_password == user.password){
            if (new_password == confirm_new_password){
                await User.update(
                {
                    password: new_password
                },
                {
                    where: {
                        email: res.locals.decoded.email
                    }
                }
            )
            res.redirect("/user/logout")

            } else {
                res.redirect("/user/profile")
            }
        } else {
            res.redirect("/user/profile")
        }

    } else {
        await User.update(
            req.body,
            {
                 where: {
                    email: res.locals.decoded.email
                 }
            }
            )
        res.redirect("/user/profile")
    }
})


router.get("/logout", requireAuth, (req, res) => {
    res.clearCookie("token").redirect("/auth/login")
})


router.get("/posts/create", requireAuth, (req, res) => {
    res.render("create_post")
})


router.post("/posts/create", upload.single("cover"), requireAuth, async (req, res) => {
    const { title, content } = req.body

    const user = await User.findOne({
        where: {email: res.locals.decoded.email}
    })
    await Post.create({
        userId: user.userId,
        title,
        content
    })

    res.redirect("/user/profile")
})


router.get("/posts", requireAuth, async (req, res) => {
    const user = await User.findOne({
        where: {email: res.locals.decoded.email}
    })
    const posts = await Post.findAll({
        where: {userId: user.userId}
    })
    res.send(posts)
})

module.exports = router