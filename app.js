const express = require("express")
const birdsRoute = require("./routes/birds.route.js")
const sequelize = require("./database/sequelize-connect.js")
const User = require("./models/user.model.js")
const app = express()
const port = 3000

app.get('/', async (req, res) => {
    const users = await User.findAll();
    res.send(users)
})

app.get('/create-user', async (req, res) => {
    const user = await User.create({ firstName: "amir", lastName: "jalali", password:"1234" , email: "amir@g.com"})
    res.send(user)
})

// Mount birds routes under /birds endpoint
// app.use('/birds', birdsRoute)

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
