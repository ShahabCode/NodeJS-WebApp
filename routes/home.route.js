const express = require("express")
const router = express.Router()
const User = require("../models/user.model.js")

router.get("/", async (req, res) => {
    var users = await User.findAll({})
    if (req.query.search){
        var users = await User.findAll({
            where: {
                firstName: req.query.search
            }
        })
    } 
    res.render("home", {users})
}) 

module.exports = router