# Invoice Management System

This is a full-stack web application built with Node.js, Express.js, MySQL, and React.js using Redux Toolkit for state management. The application allows users to authenticate, view invoices, and access detailed information about individual invoices.

## Tech Stack

- Backend: Node.js, Express.js, MySQL
- Frontend: React.js with Vite, Redux Toolkit
- Authentication: JSON Web Tokens (JWT)
- Database: MySQL

## Prerequisites

- Node.js and npm installed
- MySQL installed and running

## Installation

1. Clone the repository:
   git clone https://github.com/rojrun/invoice-management.git invoice-management
   cd invoice-management

2. Install backend dependencies:
   cd backend
   npm install

3. Install backend dependencies:   
   cd ../frontend
   npm install

4. Configure environment variables:
   Create .env file in /backend directory with the following variables:
        DB_HOST=localhost
        DB_USER=root
        DB_PASS=your_mysql_password
        DB_NAME=invoice_system
        JWT_SECRET=your_jwt_secret

## Run Application

1. Start backend:
   cd backend
   node server.js

2. Start frontend, in separate terminal window:
   cd frontend
   npm run dev   

3. Open the browser at http://localhost:5173 to access the application.           