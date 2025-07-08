const db = require('../db');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  const { email, password } = req.body;

 
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

   
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Password compare error' });

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }


      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email
         
        }
      });
    });
  });
};
