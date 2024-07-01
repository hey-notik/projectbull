// src/components/Dashboard.js
import React from "react";
import InvoiceForm from "./InvoiceForm";
import GeneratedInvoicesList from "./GeneratedInvoicesList";
import ReceivedInvoicesList from "./ReceivedInvoicesList";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <InvoiceForm />
      <div className="lists-container">
        <div className="generated-list-container">
          <GeneratedInvoicesList />
        </div>
        <div className="received-list-container">
          <ReceivedInvoicesList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
