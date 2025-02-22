// src/components/ReceivedInvoicesList.js
import React from "react";

const ReceivedInvoicesList = ({ invoices, onInvoiceClick }) => {
  return (
    <div
      className="received-invoices-list pb-3"
      style={{ height: "32vh", overflow: "scroll" }}
    >
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          className="invoice-item"
          onClick={() => onInvoiceClick(invoice)}
          style={{ cursor: "pointer" }}
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
