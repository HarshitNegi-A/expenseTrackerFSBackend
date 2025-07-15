const {Sequelize}=require('sequelize')

const sequelize=new Sequelize('expenseTrackerFullStack','root','Harshit@123',{
    host:'localhost',
    dialect:'mysql'
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection is created');
  } catch (err) {
    console.log('Unable to connect to the database:', err);
  }
})();


module.exports=sequelize;


// const mysql=require('mysql2')

// const connection=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'Harshit@123',
//     database:'expenseTrackerFullStack'
// })

// connection.connect((err)=>{
//     if(err) throw err;
//     console.log("Connected to MySQL DB")
// })

// module.exports=connection;