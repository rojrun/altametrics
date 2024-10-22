// /backend/config/db.js
// Configuration for connecting to MySQL database.
// db from /backend/.env, to /backend/models/user.js

const mysql = require('mysql2/promise');  // Connecting to MySQL db
require('dotenv').config();  // Manage environment variables

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

const initDB = async () => {
  try {
    await db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    console.log(`Database ${process.env.DB_NAME} checked/created successfully`);

    await db.query(`USE ${process.env.DB_NAME}`);
    console.log(`Database ${process.env.DB_NAME} selected successfully`);
  } catch (err) {
    console.error('Error initializing the database: ', err);
    throw err;
  }
};

module.exports = { db, initDB };
