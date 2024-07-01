// src/components/ReceivedInvoicesList.js
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const ReceivedInvoicesList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select("*")
        .eq("type", "received");

      if (error) console.error("Error fetching invoices:", error.message);
      else setInvoices(data);
    };

    fetchInvoices();
  }, []);

  return (
    <div>
      <h2>Received Invoices</h2>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            {invoice.client} - {invoice.product} - {invoice.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReceivedInvoicesList;
