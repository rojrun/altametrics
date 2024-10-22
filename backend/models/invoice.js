// /backend/models/invoice.js
// Create invoice db table definitions and queries.
// Exports to /backend/controllers/invoiceController.js

const { db } = require('../config/db');  // Configuration for connecting to MySQL database.

const createInvoiceTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS invoices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vendor_name VARCHAR(255),
        amount DECIMAL(10, 2),
        due_date DATE,
        description TEXT,
        user_id INT,
        paid BOOLEAN,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    console.log('Invoices table created or exists already.');

    // Check if any invoices exist in the table
    const [rows] = await db.query('SELECT COUNT(*) as count FROM invoices');
    if (rows[0].count === 0) {
      await db.query(`
        INSERT INTO invoices (vendor_name, amount, due_date, description, user_id, paid)
          VALUES
            ('Amazon', '226.55', '2024-10-20', 'Sales', 1, 1),
            ('Sysco', '229.08', '2024-10-20', 'Rental', 1, 0),
            ('US Foods', '76.22', '2024-10-31', 'Sales', 1, 1),
            ('Rental Inc', '48.74', '2024-10-31', 'Rental', 1, 0),
            ('Fiber Optics', '150.00', '2024-10-20', 'Rental', 1, 0),
            ('Ikea', '651.44', '2024-10-31', 'Sales', 1, 1),
            ('Amazon', '42.33', '2024-10-31', 'Rental', 2, 1),
            ('Sysco', '121.10', '2024-10-31', 'Sales', 2, 0),
            ('US Foods', '49.88', '2024-10-14', 'Rental', 2, 1),
            ('Rental Inc', '84.88', '2024-10-31', 'Rental', 2, 0),
            ('Fiber Optics', '200.00', '2024-10-14', 'Sales', 2, 0),
            ('Ikea', '989.24', '2024-10-14', 'Rental', 2, 1)
      `);
    } else {
      console.log('Invoices table already contains data.');
    }
    
  } catch (err) {
    console.error('Error creating/seeding invoices table: ', err);
    throw err;
  }
};

const getInvoicesByUserId = async (userId) => {
  const [rows] = await db.query('SELECT * FROM invoices WHERE user_id = ?', [userId]);
  return rows;
};

const getInvoiceById = async (id) => {
  const [rows] = await db.query('SELECT * FROM invoices WHERE id = ?', [id]);
  return rows;
};

const getTotalInvoiceAmountByDueDate = async () => {
  const [rows] = await db.query('SELECT SUM(amount) as total, due_date FROM invoices GROUP BY due_date');
  return rows;
};

module.exports = { createInvoiceTable, getInvoicesByUserId, getInvoiceById, getTotalInvoiceAmountByDueDate };
