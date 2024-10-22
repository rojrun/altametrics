// backend/middleware/authMiddleware.js
// Used to protect certain routes by verifying JWT token in the request headers.
// authMiddleware to /backend/routes/invoiceRoutes.js

const jwt = require('jsonwebtoken');  // For generating and verifying JWT tokens.
require('dotenv').config();  // Manage environment variables.

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach decoded user info to request object

    next();  // To next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
