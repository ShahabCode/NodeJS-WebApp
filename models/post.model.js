const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../database/sequelize-connect.js")
const { Hooks } = require("sequelize/lib/hooks")

// Define a Post model (represents a table named 'posts' in the database)
const Post = sequelize.define('Post', {
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "userId"
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    cover: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    content: { 
        type: DataTypes.STRING,
        allowNull: false
    }
}, { 
    tableName: "posts",  
    timestamps: true     
})

// Export the Post model for use in other files
module.exports = Post
