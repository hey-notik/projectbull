import React, { useState } from "react";
import InvoiceDetails from "./InvoiceDetails";

const GeneratedInvoicesList = ({
  invoices,
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
    <div style={{ height: "33vh", overflowY: "scroll" }} className="pb-3">
      <ul className="list-unstyled">
        {invoices.map((invoice) => (
          <li
            key={invoice.id}
            onClick={() => handleInvoiceClick(invoice)}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex flex-col justify-content-between p-2">
              <div>Invoice #{invoice.invoiceNumber}</div>
              <div>Total: {invoice.total}</div>
            </div>
            <hr />
          </li>
        ))}
      </ul>
      {overlayOpen && selectedInvoice && (
        <InvoiceDetails
          invoice={selectedInvoice}
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
