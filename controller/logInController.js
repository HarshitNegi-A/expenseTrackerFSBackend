const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/usersModel');

function generateAccessToken(id) {
  return jwt.sign({ userId: id }, '3453245sdfsdfsdfrf345df343'); 
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // 1. Find user by email
    const user = await Users.findOne({ where: { email: normalizedEmail } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 2. Compare password using bcrypt
    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      console.log("Entered password:", password);
      console.log("Stored hashed password:", user.password);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3. Return success with token
    return res.status(200).json({
      message: 'Login successful',
      token: generateAccessToken(user.id),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isPremium: user.isPremium
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
