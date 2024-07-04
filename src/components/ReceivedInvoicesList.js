// src/components/ReceivedInvoicesList.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ReceivedInvoicesList = ({ invoices, onInvoiceClick }) => {
  return (
    <div className="received-invoices-list">
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          className="invoice-item"
          onClick={() => onInvoiceClick(invoice)}
        >
          <div className="d-flex flex-col justify-content-between p-2">
            <div>Invoice #{invoice.invoiceNumber}</div>
            <div>Total: {invoice.total}</div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ReceivedInvoicesList;
