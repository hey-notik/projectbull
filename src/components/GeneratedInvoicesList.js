// src/components/GeneratedInvoicesList.js
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import InvoiceDetailsModal from "./InvoiceDetailsModal";
import printInvoice from "./InvoicePrinter";

const GeneratedInvoicesList = ({
  invoices,
  onInvoiceUpdated,
  onInvoiceMarkedAsReceived,
  onInvoiceDeleted,
}) => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchClients = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user:", userError.message);
      return;
    }
    const user = userData.user;
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      console.error("Error fetching clients:", error.message);
    } else {
      setClients(data);
    }
  };

  const fetchProducts = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user:", userError.message);
      return;
    }
    const user = userData.user;
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      console.error("Error fetching products:", error.message);
    } else {
      setProducts(data);
    }
  };

  useEffect(() => {
    fetchClients();
    fetchProducts();
  }, []);

  return (
    <div>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id} onClick={() => setSelectedInvoice(invoice)}>
            Invoice #{invoice.invoiceNumber} - Total: {invoice.total}
          </li>
        ))}
      </ul>
      {selectedInvoice && (
        <InvoiceDetailsModal
          invoice={selectedInvoice}
          clients={clients}
          products={products}
          onClose={() => setSelectedInvoice(null)}
          onUpdate={onInvoiceUpdated}
          onMarkAsReceived={onInvoiceMarkedAsReceived}
          onDelete={onInvoiceDeleted}
          onPrint={printInvoice}
        />
      )}
    </div>
  );
};

export default GeneratedInvoicesList;
