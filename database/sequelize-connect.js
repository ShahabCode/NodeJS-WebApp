const { Sequelize } = require('sequelize')

// Create a new Sequelize instance for connecting to the MySQL database
const sequelize = new Sequelize("modern", "modern", "sh", {
    host: '172.17.0.2',  // MySQL container IP address
    dialect: "mysql"     // Database dialect
})

// Export the Sequelize instance to be used in other files (models, etc.)
module.exports = sequelize
