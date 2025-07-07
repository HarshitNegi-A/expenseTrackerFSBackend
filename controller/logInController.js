// loginController.js
const db = require('../db'); // your MySQL connection

exports.login = (req, res) => {
  const { email, password } = req.body;

  // 1. Check if user exists
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    // 2. Match password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3. Success
    return res.status(200).json({ message: 'Login successful', user });
  });
};
