// /backend/routes/authRoutes.js
// Defines API routes for authentication, /auth/login

const express = require('express');  // Framework for building backend APIs
const { login } = require('../controllers/authController');  // Returns JWT token
const router = express.Router();  // Creates new router object to handle requests

router.post('/login', login);

module.exports = router;
