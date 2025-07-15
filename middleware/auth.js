const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, '3453245sdfsdfsdfrf345df343'); // Replace with env in prod

    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user.get({ plain: true }); // ✅ fixed
    next();
  } catch (err) {
    console.error('Token error:', err);
    return res.status(401).json({ message: 'Unauthorized: Token error' });
  }
};

module.exports = authenticateToken;
