const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../database/sequelize-connect.js")

// Define a User model (represents a table named 'Users' in the database)
const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false  // Field cannot be null
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false  // Store hashed passwords in real projects
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {})

// Export the User model for use in other files
module.exports = User
