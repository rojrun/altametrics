// /frontend/src/features/invoiceSlice.js
// Redux slices for managing invoices
// createSlice: function that simplifies creation of reducer functions and action creators
// createAsyncThunk: generate three Redux action creators using createAction : pending, fulfilled, rejected

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  invoices: [],
  selectedInvoice: null,
  loading: false,
  error: null,
};

export const fetchInvoices = createAsyncThunk('invoices/fetchInvoices', async (_, { getState }) => {
  const state = getState();
  const resp = await axios.get('/invoices', {
    headers: {
      Authorization: `Bearer ${state.auth.token}`,
    },
  });
  return resp.data;
});

export const fetchInvoiceById = createAsyncThunk('invoices/fetchById', async (id, { getState }) => {
  const state = getState();
  const resp = await axios.get(`/invoices/${id}`, {
    headers: {
      Authorization: `Bearer ${state.auth.token}`,
    },
  });
  return resp.data;
});

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading= true;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch invoices';
      })
      .addCase(fetchInvoiceById.fulfilled, (state, action) => {
        state.selectedInvoice = action.payload;
      });
  },
});

export default invoiceSlice.reducer;
