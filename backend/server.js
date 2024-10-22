// /backend/server.js
// Entry point of the backend, setting up the Express server and routes

const express = require('express');  // Framework for building backend APIs.
const bodyParser = require('body-parser');  // Middleware for parsing incoming request bodies in JSON format.
const invoiceRoutes = require('./routes/invoiceRoutes');  
const authRoutes = require('./routes/authRoutes');
const { initDB } = require('./config/db');
const { createUserTable } = require('./models/user');
const { createInvoiceTable } = require('./models/invoice');

const app = express();
app.use(bodyParser.json());

const initialize = async () => {
  try {
    await initDB();
    await createUserTable();
    await createInvoiceTable();
  } catch (err) {
    console.error('Error during database initialization: ', err);
  }
};
initialize();

app.use('/auth', authRoutes);
app.use('/invoices', invoiceRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
