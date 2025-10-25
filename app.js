const express = require("express")
const sequelize = require("./database/sequelize-connect.js")
const User = require("./models/user.model.js")
const app = express()
const authRoute = require('./routes/auth.route.js')
const path = require("path")

const port = 3000
app.use(express.json())
// Mount authentication routes under /auth
app.use("/auth", authRoute)


app.get('/', async (req, res) => {
    res.send({"message": "welcome"})
})

// Set EJS as the template engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


app.listen(port, async() => {
    try {
        // Test database connection before starting the server
        await sequelize.authenticate()
        await sequelize.sync({force:true})
        console.log("Connected To Database Successfully!")
        console.log(`Web Application Listening On Port ${port}`)
    } catch (error) {
        // If database connection fails, show an error message
        console.error("Unable To Connect To The Database!")
    }
})
