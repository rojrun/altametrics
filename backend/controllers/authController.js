// /backend/controllers/authController.js
// auth authentication to MySQL db.

const bcrypt = require('bcryptjs');  // Hashing passwords in user authentication
const jwt = require('jsonwebtoken');  // For generating and verifying JWT tokens
const { findUserByEmail } = require('../models/user');  // From /backend/models/user.js

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ 
      token,
      user: { name: user.name }
    });
  } catch (err) {
    console.error('Error during login: ', err);
    res.status(500).json({ message: 'Server error' });
  }
};
