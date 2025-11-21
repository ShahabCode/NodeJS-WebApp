const { Sequelize, DataTypes } = require("sequelize")
const sequelize = require("../database/sequelize-connect.js")
const { Hooks } = require("sequelize/lib/hooks")

// Define a User model (represents a table named 'Users' in the database)
const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false  // Field cannot be null
    },
    lastName: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        require:true,
        set(value){
            this.setDataValue("userName", value ? value.toLowerCase() : "")
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false  // Store hashed passwords in real projects
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        require:true,
        set(value){
            this.setDataValue("email", value ? value.toLowerCase() : "")
        }
    },
    bio: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    profile_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM,
        values: ["user", "admin"],
        defaultValue: "user"
    }
}, { 
    tableName: "users",  
    timestamps: true     
})


User.sync().then(async () => {
    const user = await User.findOne({
        where: {email: 'admin@gmail.com'}
    })

    if (!user) {
        await User.create({
            firstName: 'admin',
            lastName: 'admin',
            email: 'admin@gmail.com',
            password: '1234',
            userName: 'admin',
            role: 'admin'
        })
    }
})

// Export the User model for use in other files
module.exports = User
