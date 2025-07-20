const bcrypt = require('bcrypt');
const Users  = require('../models/usersModel'); // Adjust this path if needed
const saltRounds = 10;

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  try {
    const existingUser = await Users.findOne({ where: { email: normalizedEmail } });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await Users.create({
      name:name,
      email:normalizedEmail,
      password:hashedPassword,
      isPremium: false 
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
