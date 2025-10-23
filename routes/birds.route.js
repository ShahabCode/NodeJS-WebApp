const express = require("express")
const router = express.Router()

// Define a simple route for the home page
router.get('/', (req, res) => {
    res.send('Home Page')
})

// Export the router so it can be used in app.js
module.exports = router
