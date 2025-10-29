const express = require("express")
const router = express.Router()
const User = require("../models/user.model.js")
const jwt = require("jsonwebtoken")

router.get("/profile", async (req, res) => {
    const {token} = req.cookies
    const secretKey = "secret"

    if (token) {
        try{
            const decoded = jwt.verify(token, secretKey)
            if (decoded) {
                const user = await User.findOne({
                    where: {
                        email: decoded.email
                    }
                })
                if (user) {
                    res.render("profile", {user: {name: user.firstName, email: user.email}}) // ./viws/profile.ejs
                } else {
                    res.redirect("/auth/login")
                }
            }
        } catch (error) {
            console.log(error)
            res.redirect("/auth/login")
        }
             
    } else {
    }
})

module.exports = router