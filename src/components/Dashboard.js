import React, { useState, useEffect } from "react";
import InvoiceForm from "./InvoiceForm";
import GeneratedInvoicesList from "./GeneratedInvoicesList";
import ReceivedInvoicesList from "./ReceivedInvoicesList";
import { supabase } from "../supabaseClient";
import "./Dashboard.css";

const Dashboard = () => {
  const [generatedInvoices, setGeneratedInvoices] = useState([]);
  const [receivedInvoices, setReceivedInvoices] = useState([]);

  const fetchInvoices = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user:", userError.message);
      return;
    }
    const user = userData.user;
    console.log("Fetching all invoices for user:", user.id);
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      console.error("Error fetching invoices:", error.message);
    } else {
      console.log("Fetched invoices:", data);
      const generated = data.filter((invoice) => invoice.type !== "received");
      const received = data.filter((invoice) => invoice.type === "received");
      setGeneratedInvoices(generated);
      setReceivedInvoices(received);
    }
  };

  useEffect(() => {
    fetchInvoices();
    const invoiceInterval = setInterval(() => {
      fetchInvoices();
    }, 5000); // Fetch invoices every 5 seconds

    return () => clearInterval(invoiceInterval);
  }, []);

  const handleInvoiceAdded = () => {
    fetchInvoices(); // Refresh the invoice list
  };

  const handleInvoiceUpdated = () => {
    fetchInvoices(); // Refresh the invoice list
  };

  const handleInvoiceMarkedAsReceived = () => {
    fetchInvoices(); // Refresh the invoice list
  };

  const handleInvoiceDeleted = () => {
    fetchInvoices(); // Refresh the invoice list
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
          />
        </div>
        <div className="received-list-container">
          <h2>Received Invoices</h2>
          <ReceivedInvoicesList invoices={receivedInvoices} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
