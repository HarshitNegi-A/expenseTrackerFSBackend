const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const app = express();

// ✅ Put CORS at the very top!
app.use(cors({
  origin: "http://localhost:3001", // Your frontend
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],  // OPTIONS is important!
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json()); // parse JSON bodies

// ✅ Routes
const signUpRoute = require('./router/signUpRoutes');
const logInRoute = require('./router/logInRoutes');
const expenseRoute = require('./router/expenseRouter');
const premiumRoutes = require('./router/premiumRouter');

app.use('/signup', signUpRoute);
app.use('/login', logInRoute);
app.use('/expenses', expenseRoute);
app.use('/premium', premiumRoutes);

// ✅ DB associations
const User = require('./models/usersModel');
const Expense = require('./models/expenseModel');
const Order=require('./models/orders')
User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// ✅ Sync DB and start server
sequelize.sync({force:true})
  .then(() => {
    console.log('All tables synced successfully');
    app.listen(3000, () => console.log("Server is running on port 3000..."));
  })
  .catch((err) => {
    console.error('Error syncing tables:', err);
  });
