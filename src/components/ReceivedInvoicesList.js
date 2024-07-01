import React from "react";

const ReceivedInvoicesList = ({ invoices }) => {
  return (
    <div>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            Invoice #{invoice.invoiceNumber} - Total: {invoice.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReceivedInvoicesList;
