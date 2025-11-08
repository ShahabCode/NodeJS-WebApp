const express = require("express")
const router = express.Router()
const User = require("../models/user.model.js")
const jwt = require("jsonwebtoken")
const { requireAuth } = require("../middlewares/auth.middleware.js")
const multer = require("multer")
const { where } = require("sequelize")


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
            res.redirect("/auth/login")

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
    
module.exports = router