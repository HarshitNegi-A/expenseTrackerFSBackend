const mysql=require('mysql2')

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Harshit@123',
    database:'expenseTrackerFullStack'
})

connection.connect((err)=>{
    if(err) throw err;
    console.log("Connected to MySQL DB")
})

module.exports=connection;