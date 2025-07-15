const {Sequelize,DataTypes}=require('sequelize')
const sequelize=require('../db')

const Expenses=sequelize.define('Expenses',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
},
{
    timestamps:false
})

module.exports=Expenses;