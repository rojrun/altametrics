// /backend/models/user.js
// Add users to db
// findUserByEmail exports to /backend/controllers/authController.js
// createUserTable exports to /backend/server.js

const { db } = require('../config/db');  // Configuration for connecting to MySQL database
const bcrypt = require('bcryptjs');  // Hashing passwords in user authentication

const createUserTable = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        name VARCHAR(255)
      )
    `);
    console.log('Users table created or exists already.');

    // Check if any users exist in the table
    const [rows] = await db.query('SELECT COUNT(*) as count FROM users');
    if (rows[0].count === 0) {
      // If no users exist, insert two default users
      const hashedPassword1 = await bcrypt.hash('morty', 10);
      const hashedPassword2 = await bcrypt.hash('rick', 10);
      
      await db.query(`
        INSERT INTO users (email, password, name)
          VALUES
            ('morty@example.com', ?, 'Morty'),
            ('rick@example.com', ?, 'Rick')
      `, [hashedPassword1, hashedPassword2]);

      console.log('Two users added to the users table.');
    } else {
      console.log('Users table already contains data.');
    }
  } catch (err) {
    console.error('Error creating/seeding users table:', err);
    throw err;
  }
};

const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

module.exports = { createUserTable, findUserByEmail };
