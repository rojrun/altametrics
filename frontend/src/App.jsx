// /frontend/src/App.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import InvoicePage from './pages/invoicePage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <LoginPage /> } />
        <Route path='/invoices' element={ <InvoicePage /> } />
      </Routes>
    </Router>
  );
}

export default App;
