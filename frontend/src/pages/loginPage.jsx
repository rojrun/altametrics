// /front/src/pages/loginPage.jsx
// Login page
// createSlice: function that simplifies creation of reducer functions and action creators
// createAsyncThunk: generate three Redux action creators using createAction : pending, fulfilled, rejected

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/invoices');
    } else {
      console.error('Login failed: ', result.error);
    }
  };

  return (
    <div>
      <h1>Welcome, please login</h1>
      <form onSubmit={ handleSubmit }>
        <input
          type='email'
          value={ email }
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          type='password'
          value={ password }
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button type='submit' disabled={loading}>
          { loading ? 'Logging in...' : 'Login' }
        </button>
        { error && <p>{ error }</p>}
      </form>
    </div>
  );
};

export default LoginPage;
