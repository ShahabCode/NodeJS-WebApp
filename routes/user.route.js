const express = require("express")
const router = express.Router()
const User = require("../models/user.model.js")
const jwt = require("jsonwebtoken")
const { requireAuth } = require("../middlewares/auth.middleware.js")

router.get('/profile', requireAuth, async (req, res) => {
    const user = await User.findOne({
        where: {
            email: res.locals.decoded.email
        }
    })

    console.log(user)

    if (user) {
        res.render('profile', { user })
    } else {
        res.redirect("/auth/login")
    }
})

module.exports = router