const express = require("express")
const sequelize = require("./database/sequelize-connect.js")
const authRoute = require('./routes/auth.route.js')
const userRoute = require("./routes/user.route.js")
const homeRoute = require("./routes/home.route.js")
const adminRoute = require("./routes/admin.route.js")
const cookieParser = require("cookie-parser");
const path = require("path")

const app = express()
const port = 3000
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());
// Mount authentication routes under /auth
app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/admin", adminRoute)
app.use("/", homeRoute)

app.use(express.static(path.join(__dirname, "static")))
 
// Set EJS as the template engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


app.listen(port, async() => {
    try {
        // Test database connection before starting the server
        await sequelize.authenticate()
        await sequelize.sync({
            // force:true
        })
        console.log("Connected To Database Successfully!")
        console.log(`Web Application Listening On Port ${port}`)
    } catch (error) {
        // If database connection fails, show an error message
        console.error("Unable To Connect To The Database!")
    }
})
