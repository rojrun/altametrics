// /frontend/src/store/store.js
// Centralized redux store configuration

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import invoiceReducer from '../features/invoiceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    invoices: invoiceReducer,
  },
});
