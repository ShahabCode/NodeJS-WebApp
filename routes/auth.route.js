const express = require("express")
const router = express.Router()

router.get("/login", (req, res) => {
      res.render("login") // ./viws/login.ejs
})
 

router.post("/login", async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({
        where: {
            email
        }
    })
    if (user) {
        if (user.password == password){
            res.send("Hi To Panel!")
        } else {
            res.send("The Password is Incorrent")
        }
    } else {
        res.send("User Not Found!")
    }
})


router.get('/register', async (req, res) => {
    const user = await User.create({ firstName: "amir", lastName: "jalali", password:"1234" , email: "amir@g.com"})
    res.send(user)
})

// Export the router so it can be used in app.js
module.exports = router
