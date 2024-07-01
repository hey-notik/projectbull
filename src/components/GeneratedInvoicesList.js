// src/components/GeneratedInvoicesList.js
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const GeneratedInvoicesList = () => {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    const { data, error } = await supabase.from("invoices").select("*");
    if (error) {
      console.error("Error fetching invoices:", error.message);
    } else {
      setInvoices(data);
    }
  };

  useEffect(() => {
    fetchInvoices();
    const interval = setInterval(() => {
      fetchInvoices();
    }, 5000); // Fetch invoices every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Generated Invoices</h2>
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

export default GeneratedInvoicesList;
