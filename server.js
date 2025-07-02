const express=require("express")
const cors = require("cors");
const app=express()
const signUpRoute=require('./router/signUpRoutes')
app.use(cors());    
app.use(express.json());    
app.use('/signup',signUpRoute)

app.listen(3000,()=>console.log("Server started"))