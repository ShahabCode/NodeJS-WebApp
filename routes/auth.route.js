const express = require("express")
const router = express.Router()
const User = require("../models/user.model.js")
const jwt = require("jsonwebtoken")

router.get("/login", (req, res) => {
      res.render("login") // ./viws/login.ejs
})
 

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const secretKey = "secret"

    if (!user) {
        return res.render("login", { error: "User not found!" });
    }

    if (user.password !== password) {
        return res.render("login", { error: "Password is incorrect!" });
    } else {
        const payload = {
            "id": user._id,
            "email": user.email
        }
        const token = jwt.sign(payload, secretKey, {
            expiresIn: "1h"
        })
        res.cookie("token", token, {
            maxAge: 3 * 60 * 60 * 1 * 1000,
            path: '/'
        })

        res.redirect("/user/profile")
    }
})


router.get('/register', async (req, res) => {
    res.render("register")
})


router.post('/register', async (req, res) => {
    const {firstName, lastName , email, password} = req.body
    const user = await User.findOne({
        where: {
            email
        }
    })
    if (user){
        res.render("register", {"error": "User Already Exists!"})
    } else {
        const user = await User.create({
            firstName,
            lastName,
            password,
            email
        })

        res.send("User Registred!")
    }
})


// Export the router so it can be used in app.js
module.exports = router
