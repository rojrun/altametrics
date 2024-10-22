// backend/routes/invoiceRoutes.js
// Defines API routes for authentication.
// Exports to /backend/controllers/invoiceController.js

const express = require('express');  // Framework for building backend APIs.
const { getInvoices, getInvoice, getTotalAmount } = require('../controllers/invoiceController');
const authMiddleware = require('../middleware/authMiddleware');  // Used to protect certain routes by verifying JWT token in the request headers.
const router = express.Router();  // Creates new router object to handle requests.

router.get('/', authMiddleware, getInvoices);
router.get('/:id', authMiddleware, getInvoice);
router.get('/total', getTotalAmount);

module.exports = router;
