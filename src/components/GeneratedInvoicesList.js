import React, { useState } from "react";
import InvoiceDetails from "./InvoiceDetails";

const GeneratedInvoicesList = ({
  invoices,
  clients,
  products,
  onInvoiceUpdated,
  onInvoiceMarkedAsReceived,
  onInvoiceDeleted,
}) => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const handleInvoiceClick = (invoice) => {
    setSelectedInvoice(invoice);
    setOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setOverlayOpen(false);
    setSelectedInvoice(null);
  };

  return (
    <div>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id} onClick={() => handleInvoiceClick(invoice)}>
            Invoice #{invoice.invoiceNumber} - Total: {invoice.total}
          </li>
        ))}
      </ul>
      {overlayOpen && selectedInvoice && (
        <InvoiceDetails
          invoice={selectedInvoice}
          clients={clients}
          products={products}
          isOpen={overlayOpen}
          onClose={handleCloseOverlay}
          onUpdate={onInvoiceUpdated}
          onMarkAsReceived={onInvoiceMarkedAsReceived}
          onDelete={onInvoiceDeleted}
        />
      )}
    </div>
  );
};

export default GeneratedInvoicesList;
