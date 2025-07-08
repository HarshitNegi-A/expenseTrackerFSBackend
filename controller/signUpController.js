const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });

    if (results.length > 0) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // 🔐 Hash the password
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return res.status(500).json({ message: 'Hashing error' });

      // ✅ Use hashed password in the INSERT
      db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hash],
        (err, result) => {
          if (err) return res.status(500).json({ message: 'Insert error' });
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  });
};
