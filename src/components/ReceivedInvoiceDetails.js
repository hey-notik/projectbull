import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import printInvoice from "./InvoicePrinter";
import "./InvoiceDetails.css";

const ReceivedInvoiceDetails = ({ invoice, onClose, onDelete }) => {
  const [clientDetails, setClientDetails] = useState({});
  const [companyDetails, setCompanyDetails] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (!invoice) return;

    const fetchClientDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("clients")
          .select("*")
          .eq("id", invoice.client)
          .single();
        if (error) {
          throw new Error(error.message);
        }
        setClientDetails(data);
      } catch (err) {
        console.error("Error fetching client details:", err.message);
        setError(`Error fetching client details: ${err.message}`);
      }
    };

    const fetchCompanyDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .single();
        if (error) {
          throw new Error(error.message);
        }
        setCompanyDetails(data);
      } catch (err) {
        console.error("Error fetching company details:", err.message);
        setError(`Error fetching company details: ${err.message}`);
      }
    };

    fetchClientDetails();
    fetchCompanyDetails();
  }, [invoice]);

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("invoices")
        .delete()
        .eq("id", invoice.id);

      if (error) {
        throw new Error(error.message);
      } else {
        onDelete();
        onClose();
      }
    } catch (err) {
      console.error("Error deleting invoice:", err.message);
      setError(`Error deleting invoice: ${err.message}`);
    }
  };

  const handlePrint = () => {
    const invoiceData = {
      ...invoice,
      clientDetails,
      companyDetails,
      items: invoice.items || [], // Add default empty array if items is null
    };

    console.log("Invoice Data to Print: ", invoiceData); // Debug log

    printInvoice(invoiceData);
  };

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="received-invoice-details-overlay open">
      <div className="received-invoice-details-content">
        <span className="received-close-button" onClick={onClose}>
          &times;
        </span>
        {error && <p className="error">{error}</p>}
        <div className="details-section">
          <div className="details-column">
            <h3>Client Details</h3>
            <p>Name: {clientDetails.name || "N/A"}</p>
            <p>Address: {clientDetails.address || "N/A"}</p>
            <p>Phone: {clientDetails.phone || "N/A"}</p>
            <p>Email: {clientDetails.email || "N/A"}</p>
            <p>VAT: {clientDetails.vat || "N/A"}</p>
          </div>
          <div className="details-column">
            <h3>Company Details</h3>
            <p>Name: {companyDetails.name || "N/A"}</p>
            <p>Address: {companyDetails.address || "N/A"}</p>
            <p>Phone: {companyDetails.phone || "N/A"}</p>
            <p>Email: {companyDetails.email || "N/A"}</p>
            <p>VAT: {companyDetails.vat || "N/A"}</p>
          </div>
        </div>
        <h3>Products</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Tax</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {(invoice.items || []).map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.tax}</td>
                <td>
                  {(item.price * item.quantity * (1 + item.tax / 100)).toFixed(
                    2
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="grand-total">
          <h3>
            Sub Total:{" "}
            {invoice.items
              ? invoice.items
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)
              : "0.00"}
          </h3>
          <h3>
            Tax:{" "}
            {invoice.items
              ? invoice.items
                  .reduce(
                    (acc, item) =>
                      acc + item.price * item.quantity * (item.tax / 100),
                    0
                  )
                  .toFixed(2)
              : "0.00"}
          </h3>
          <h3>Total: {invoice.total.toFixed(2)}</h3>
        </div>
        <p>{invoice.customMessage}</p>
        <button onClick={handlePrint}>Print</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ReceivedInvoiceDetails;
