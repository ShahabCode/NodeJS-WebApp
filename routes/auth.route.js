const express = require("express")
const router = express.Router()
const User = require("../models/user.model.js")
const ResetPassword = require("../models/reset-password.model.js")
const jwt = require("jsonwebtoken")
const crypto = require("crypto"); 
const Mailgun = require("mailgun.js");
const formData = require("form-data");

function generateResetToken(){
    return new Promise((resolve, reject) => {
        crypto.randomBytes(32, (err, buffer) => {
            if(err) {
                reject(err);
            } else {
                const token = buffer.toString("hex")
                resolve(token)
            }
        })
    })
}


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


router.get("/forget-password", (req, res) => {
    res.render("forget-password")
})


router.get("/forget-password/:token", (req, res) => {
    res.render("password-change", {token: req.params.token})
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


router.post("/forget-password", async (req, res) => {
    const {email} = req.body

     const user = await User.findOne({
        where: {
            email
        }
    })
    if (user){ 
        const token = await generateResetToken()
        console.log(token)
        
        await ResetPassword.create({
            email,
            token
        })
        console.log(token)
        res.send("ok, check your email!")
    } else {
        res.redirect("/auth/login")
    }
})


router.post("/forget-password/:token", async (req, res) => {
    const {token} = req.params
    const {password} = req.body

    const reset_password = await ResetPassword.findOne({
        where: {
            token
        }
    })
  
    if (reset_password){  
        const user = await User.findOne({
            where: {
                email: reset_password.email
            }
        })

        if (user) {
            user.password = password
            await user.save()
            res.redirect("/auth/login")
        } else {
            res.redirect("/auth/login")
        }
    }
})

// Export the router so it can be used in app.js
module.exports = router
