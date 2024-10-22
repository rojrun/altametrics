// /frontend/src/components/invoiceList.js
// useDispatch: allows functional components to dispatch actions to the Redux store
// useSelector: defines which part of the Redux store state you want to extract and use

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../features/invoiceSlice';
import InvoiceModal from './invoiceModal';

const InvoiceList = () => {
  const dispatch = useDispatch();
  const { invoices, loading } = useSelector((state) => state.invoices);

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Invoices</h2>
      <ul>
        { invoices.map((invoice) => {
            <li key={ invoice.id }>
              { invoice.vendor_name } - { invoice.amount } - { invoice.due_date }
              <InvoiceModal id={ invoice.id } />
            </li>
        })}
      </ul>
    </div>
  );
};

export default InvoiceList;
