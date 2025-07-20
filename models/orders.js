// models/orders.js

const { DataTypes } = require("sequelize");
const sequelize = require("../db"); // adjust path as needed

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  paymentStatus: {
    type: DataTypes.STRING, // could be 'PENDING', 'SUCCESS', 'FAILED'
    defaultValue: "PENDING"
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Order;
