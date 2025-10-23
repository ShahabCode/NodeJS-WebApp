const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Home Page')
})

// Export the User model for use in other files
module.exports = router