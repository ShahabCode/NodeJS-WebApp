const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../database/sequelize-connect.js")

// Define a User model (represents a table named 'Users' in the database)
const ResetPassword = sequelize.define('ResetPassword', {
    token: {
        type: DataTypes.STRING,
        allowNull: false, 
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
})

// Export the User model for use in other files
module.exports = ResetPassword
