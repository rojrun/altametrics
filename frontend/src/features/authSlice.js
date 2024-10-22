// /frontend/src/features/authSlice.js
// Redux slices for managing authenication
// authSlice exports to /frontend/src/store/store.js
// createSlice: function that simplifies creation of reducer functions and action creators
// createAsyncThunk: generate three Redux action creators using createAction : pending, fulfilled, rejected

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: null,
  loading: false,
  error: null,
  user: null,
};

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const resp = await axios.post('/auth/login', credentials);
  return {
    token: resp.data.token,
    user: resp.data.user,
  };
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.error = 'Invalid credentials';
      });
  },
});

export default authSlice.reducer;
