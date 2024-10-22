// /frontend/src/components/invoiceModal.js
// useDispatch: allows functional components to dispatch actions to the Redux store
// useSelector: defines which part of the Redux store state you want to extract and use

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoiceById } from '../features/invoiceSlice';

const InvoiceModal = (invoice) => {
  const dispatch = useDispatch();
  const { selectedInvoice } = useSelector((state) => state.invoices);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = (id) => {
    dispatch(fetchInvoiceById(id));
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button onClick={() => handleOpen(invoice.invoiceId) }>View invoice</button>
      { isOpen && selectedInvoice && (
          <div id='invoiceModal' className={`modal ${isOpen ? 'open' : 'close'}`}>
            <div className='modal-content'>
              <p><strong>Payee: </strong>{ selectedInvoice[0].vendor_name }</p>
              <p><strong>Description: </strong>{ selectedInvoice[0].description }</p>
              <p><strong>Amount: </strong>{ selectedInvoice[0].amount }</p>
              <p><strong>Due Date: </strong>{ new Date(selectedInvoice[0].due_date).toLocaleDateString() }</p>
              <p><strong>Status: </strong>{ selectedInvoice[0].paid ? 'Paid' : 'Open' }</p>
              <button onClick={ () => handleClose() }>Close</button>
            </div>
          </div>
      )}
    </>
  );
};

export default InvoiceModal;