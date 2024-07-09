import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import printInvoice from "./InvoicePrinter";
import "./ReceivedInvoiceDetails.css";

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

  const avatarUrls = [
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_1.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_2.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_3.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_4.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_6.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_7.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_8.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_9.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_10.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_11.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_12.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_13.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_14.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_15.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_16.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_17.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_18.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_19.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_20.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_21.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_22.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_23.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_24.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_25.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_26.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_27.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/3d_1.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/3d_2.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/3d_3.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/3d_4.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/3d_5.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_1.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_2.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_3.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_4.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_5.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_6.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_7.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_8.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_9.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_10.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_1.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_2.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_3.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_4.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_5.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_6.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_7.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_8.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_9.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_10.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_11.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_12.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_13.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_14.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_15.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_16.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_17.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_18.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_19.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_20.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_21.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_22.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_23.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_24.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_25.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_26.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_27.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_28.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_29.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_30.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_31.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_32.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_33.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_34.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_35.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_1.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_2.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_3.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_4.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_5.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_6.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_7.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_8.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_9.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_10.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_11.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_12.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_13.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_14.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_15.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_1.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_2.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_3.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_4.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_5.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_6.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_7.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_8.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_9.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_1.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_2.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_3.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_4.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_5.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_6.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_7.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_8.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_9.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_10.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_1.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_2.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_3.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_4.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_5.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_6.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_7.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_8.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_9.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_10.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_11.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_12.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_13.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_14.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_15.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_16.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_17.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_18.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_19.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_20.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_21.png",
    "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_22.png",
  ];

  const getAvatar = (index) => {
    return avatarUrls[index % avatarUrls.length];
  };

  if (!invoice || !clientDetails || !companyDetails) {
    return <></>; // Render nothing if invoice or required details are not available
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
            <p>Client Details</p>
            <div className="d-flex flex-col mb-3">
              <img src={getAvatar(2)} className="client-avatar mt-2" />
              <div className="ps-3">
                <span className="client-name d-block">
                  {clientDetails.name}
                </span>
                <span className="client-email">{clientDetails.email}</span>
              </div>
            </div>
            <p style={{ fontSize: "0.9rem" }}>
              Address: {clientDetails.address}
            </p>
            <p style={{ fontSize: "0.9rem" }}>Phone: {clientDetails.phone}</p>
            <p style={{ fontSize: "0.9rem" }}>VAT: {clientDetails.vat}</p>
          </div>
          <div className="details-column">
            <p>Company Details</p>
            <div className="d-flex flex-col mb-3">
              <img src={getAvatar(4)} className="client-avatar mt-2" />
              <div className="ps-3">
                <span className="client-name d-block">
                  {companyDetails.name}
                </span>
                <span className="client-email">{companyDetails.email}</span>
              </div>
            </div>
            <p style={{ fontSize: "0.9rem" }}>
              Address: {companyDetails.address}
            </p>
            <p style={{ fontSize: "0.9rem" }}>Phone: {companyDetails.phone}</p>
            <p style={{ fontSize: "0.9rem" }}>VAT: {companyDetails.vat}</p>
          </div>
        </div>
        <p>Products</p>
        <table className="table table-dark">
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
        <div>
          <p>Total: {invoice.total.toFixed(2)}</p>
        </div>
        <p>Custom Message: {invoice.customMessage}</p>
        <div className="button-container">
          <button onClick={handlePrint}>Print</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ReceivedInvoiceDetails;
