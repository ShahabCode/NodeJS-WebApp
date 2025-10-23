const express = require("express")
const birdsRoute = require("./routes/birds.route.js")
const sequelize = require("./database/sequelize-connect.js")
const User = require("./models/user.model.js")
const app = express()
const port = 3000
app.use(express.json())


app.get('/', async (req, res) => {
    const users = await User.findAll();
    res.send(users)
})


app.get('/create-user', async (req, res) => {
    const user = await User.create({ firstName: "amir", lastName: "jalali", password:"1234" , email: "amir@g.com"})
    res.send(user)
})


app.post('/login', async (req, res) => {
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
