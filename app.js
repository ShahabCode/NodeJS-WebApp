const express = require("express")
const birdsRoute = require("./routes/birds.route.js")
const sequelize = require("./database/sequelize-connect.js")

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("Hello World!")
})

// Mount birds routes under /birds endpoint
app.use('/birds', birdsRoute)

app.listen(port, async() => {
    try {
        // Test database connection before starting the server
        await sequelize.authenticate()
        console.log("Connected To Database Successfully!")

        console.log(`Web Application Listening On Port ${port}`)
    } catch (error) {
        // If database connection fails, show an error message
        console.error("Unable To Connect To The Database!")
    }
})
