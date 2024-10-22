// /frontend/src/pages/invoicePage.jsx
// Invoice page
// createSlice: function that simplifies creation of reducer functions and action creators
// createAsyncThunk: generate three Redux action creators using createAction : pending, fulfilled, rejected

// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../features/invoiceSlice';
import InvoiceModal from '../components/invoiceModal';

const InvoicePage = () => {
  const dispatch = useDispatch();
  const { invoices, loading, error } = useSelector((state) => state.invoices);
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading invoices...</p>;

  return (
    <div>
      <h1>{`Invoices for ${user.name}`}</h1>
      { invoices.length === 0 ? (
          <p>No invoices found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Payee</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>
            { invoices.map((invoice) => (
                <tr key={ invoice.id }>
                  <td>{ invoice.vendor_name }</td>
                  <td>{ invoice.description }</td>
                  <td>{ new Date(invoice.due_date).toLocaleDateString() }</td>
                  <td>{ invoice.paid ? `` : `$ ${invoice.amount}` }</td>
                  <td>{ invoice.paid ? 'Paid' : 'Open' }</td>
                  <td><InvoiceModal invoiceId={invoice.id} /></td>
                </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoicePage;
