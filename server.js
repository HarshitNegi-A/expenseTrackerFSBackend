const express=require("express")
const cors = require("cors");
const sequelize=require('./db')
const app=express()
const signUpRoute=require('./router/signUpRoutes')
const logInRoute=require('./router/logInRoutes')
const expenseRoute=require('./router/expenseRouter')
const User=require('./models/usersModel')
const Expense=require('./models/expenseModel')
app.use(cors());    
app.use(express.json());    
app.use('/signup',signUpRoute)
app.use('/login',logInRoute)
app.use('/expenses',expenseRoute)

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize.sync()  
  .then(() => {
    console.log(' All tables synced successfully');
    app.listen(3000,()=>console.log("Server is running now..."))
  })
  .catch((err) => {
    console.error(' Error syncing tables:', err);
  });