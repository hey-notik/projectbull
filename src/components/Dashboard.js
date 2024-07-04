import React, { useState, useEffect } from "react";
import InvoiceForm from "./InvoiceForm";
import GeneratedInvoicesList from "./GeneratedInvoicesList";
import ReceivedInvoicesList from "./ReceivedInvoicesList";
import Overlay from "./Overlay";
import InvoiceDetails from "./InvoiceDetails";
import ReceivedInvoiceDetails from "./ReceivedInvoiceDetails";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const [generatedInvoices, setGeneratedInvoices] = useState([]);
  const [receivedInvoices, setReceivedInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isGenerated, setIsGenerated] = useState(true);
  const { user } = useAuth();

  const fetchInvoices = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      console.error("Error fetching invoices:", error.message);
    } else {
      const generated = data.filter((invoice) => invoice.type !== "received");
      const received = data.filter((invoice) => invoice.type === "received");
      setGeneratedInvoices(generated);
      setReceivedInvoices(received);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [user]);

  const handleInvoiceAdded = () => {
    fetchInvoices();
  };

  const handleInvoiceUpdated = () => {
    fetchInvoices();
  };

  const handleInvoiceMarkedAsReceived = () => {
    fetchInvoices();
  };

  const handleInvoiceDeleted = () => {
    fetchInvoices();
  };

  const handleInvoiceClick = (invoice, isGenerated) => {
    setSelectedInvoice(invoice);
    setIsGenerated(isGenerated);
    setOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setOverlayOpen(false);
    setSelectedInvoice(null);
  };

  return (
    <div className="dashboard-container">
      <div className="invoice-form-container">
        <InvoiceForm onInvoiceAdded={handleInvoiceAdded} />
      </div>
      <div className="lists-container">
        <div className="generated-list-container">
          <h2>Generated Invoices</h2>
          <GeneratedInvoicesList
            invoices={generatedInvoices}
            onInvoiceUpdated={handleInvoiceUpdated}
            onInvoiceMarkedAsReceived={handleInvoiceMarkedAsReceived}
            onInvoiceDeleted={handleInvoiceDeleted}
            onInvoiceClick={(invoice) => handleInvoiceClick(invoice, true)}
          />
        </div>
        <div className="received-list-container">
          <h2>Received Invoices</h2>
          <ReceivedInvoicesList
            invoices={receivedInvoices}
            onInvoiceClick={(invoice) => handleInvoiceClick(invoice, false)}
          />
        </div>
      </div>
      <Overlay isOpen={overlayOpen} onClose={handleCloseOverlay}>
        {selectedInvoice && isGenerated ? (
          <InvoiceDetails
            invoice={selectedInvoice}
            onClose={handleCloseOverlay}
            onUpdate={handleInvoiceUpdated}
            onMarkAsReceived={handleInvoiceMarkedAsReceived}
            onDelete={handleInvoiceDeleted}
          />
        ) : (
          <ReceivedInvoiceDetails
            invoice={selectedInvoice}
            onClose={handleCloseOverlay}
            onDelete={handleInvoiceDeleted}
          />
        )}
      </Overlay>
    </div>
  );
};

export default Dashboard;
