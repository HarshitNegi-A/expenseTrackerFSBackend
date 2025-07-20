const { Cashfree, CFEnvironment } = require("cashfree-pg");
const Order = require("../models/orders");
const User = require("../models/usersModel");
const Expense=require('../models/expenseModel')
const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  "TEST430329ae80e0f32e41a393d78b923034",
  "TESTaf195616268bd6202eeb3bf8dc458956e7192a85"
);

exports.createOrder = async (req, res) => {
  const user = req.user;
  const orderId = `order_${Date.now()}_${user.id}`;

  const request = {
    order_id: orderId,
    order_amount: 499,
    order_currency: "INR",
    customer_details: {
      customer_id: `user_${user.id}`,
      customer_email: user.email || "test@example.com",
      customer_phone: "9999999999",
    },
    order_meta: {
      return_url: "http://localhost:3001/verify?order_id={order_id}",
    },
  };

  try {
    const response = await cashfree.PGCreateOrder(request);
    const sessionId = response.data.payment_session_id;

    // Save to DB
    await Order.create({
      orderId,
      userId: user.id,
      paymentStatus: "PENDING",
    });

    return res.status(200).json({ payment_session_id: sessionId });
  } catch (error) {
    console.error("Cashfree error:", error?.response?.data || error.message);
    return res.status(500).json({ message: "Payment initiation failed" });
  }
};
// controllers/paymentController.js
exports.verify = async (req, res) => {
  const { order_id } = req.query;
  if (!order_id) return res.status(400).send('Missing order ID');

  try {
    const cfOrder = await cashfree.PGFetchOrder(order_id);
    const status = cfOrder.data.order_status;

    const order = await Order.findOne({ where: { orderId: order_id } });
    if (!order) return res.status(404).send('Order not found');

    order.paymentStatus = status === 'PAID' ? 'SUCCESS' : 'FAILED';
    await order.save();

    if (status === 'PAID') {
      const user = await User.findByPk(order.userId);
      user.isPremium = true;
      await user.save();
    }

    return res.redirect(`/payment-status?success=${status === "PAID"}&order_id=${order_id}`);
  } catch (err) {
    console.error("Verification error:", err.message);
    return res.status(500).send('Verification failed');
  }
};


exports.getPremiumStatus = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'isPremium']
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error in getPremiumStatus:", err);
    res.status(500).json({ error: "Failed to fetch premium status" });
  }
};


exports.getLeaderboard = async (req, res) => {
  try {
    const user = req.user;

    if (!user.isPremium) {
      return res.status(403).json({ message: 'Access denied: Premium members only.' });
    }

    const leaderboard = await User.findAll({
      attributes: ['id', 'name', 'email'],
      include: [{
        model: Expense,
        attributes: ['amount']
      }]
    });

    const leaderboardData = leaderboard.map(user => {
      const totalExpenses = user.Expenses.reduce((sum, expense) => sum + expense.amount, 0);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        totalExpenses
      };
    });

    // Sort by totalExpenses descending
    leaderboardData.sort((a, b) => b.totalExpenses - a.totalExpenses);

    res.status(200).json(leaderboardData);
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};