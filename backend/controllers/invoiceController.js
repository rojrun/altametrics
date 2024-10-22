// /backend/controllers/invoiceController.js
// invoice authentication to MySQL db.
// Exports to /backend/controllers/invoiceRoutes.js

const { getInvoicesByUserId, getInvoiceById, getTotalInvoiceAmountByDueDate } = require('../models/invoice');  // From /backend/models/invoice.js

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await getInvoicesByUserId(req.user.id);
    res.json(invoices);
  } catch (err) {
    console.error('Error fetching invoices: ', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getInvoice = async (req, res) => {
  try {
    const invoice = await getInvoiceById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.json(invoice);
  } catch (err) {
    console.error('Error fetching invoice: ', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTotalAmount = async (req, res) => {
  try {
    const total = await getTotalInvoiceAmountByDueDate();
    res.json(total);
  } catch (err) {
    console.error('Error fetching total invoice amount: ', err);
    res.status(500).json({ message: 'Server error' });
  }
};
