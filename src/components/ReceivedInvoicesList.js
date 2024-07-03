// src/components/ReceivedInvoicesList.js
import React from "react";

const ReceivedInvoicesList = ({ invoices, onInvoiceClick }) => {
  return (
    <div className="received-invoices-list">
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          className="invoice-item"
          onClick={() => onInvoiceClick(invoice)}
        >
          <p>
            Invoice #{invoice.invoiceNumber} - Total: {invoice.total}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReceivedInvoicesList;
