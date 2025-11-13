const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../database/sequelize-connect.js")

// Define a reset password model 
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

// Export the reset password model for use in other files
module.exports = ResetPassword
