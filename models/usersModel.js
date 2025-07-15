const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../db')
const bcrypt = require('bcrypt');

const Users=sequelize.define('Users',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false
})



module.exports=Users