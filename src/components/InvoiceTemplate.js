// src/components/InvoiceTemplate.js
import React from "react";
import "./InvoiceTemplate.css";

const InvoiceTemplate = ({ invoiceData }) => {
  const {
    companyDetails = {},
    clientDetails = {},
    items = [],
    invoiceNumber,
    created_at,
    customMessage = "",
  } = invoiceData;

  const calculateSubTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateTax = (items) => {
    return items.reduce(
      (acc, item) => acc + (item.price * item.quantity * item.tax) / 100,
      0
    );
  };

  const calculateGrandTotal = (items) => {
    return items.reduce(
      (acc, item) =>
        acc +
        item.price * item.quantity +
        (item.price * item.quantity * item.tax) / 100,
      0
    );
  };

  const subTotal = calculateSubTotal(items);
  const taxAmount = calculateTax(items);
  const grandTotal = calculateGrandTotal(items);

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <div className="company-info">
          <h1>{companyDetails.name || "Company Name"}</h1>
          <p>{companyDetails.address || "Company Address"}</p>
          <p>Phone: {companyDetails.phone || "Company Phone"}</p>
          <p>Email: {companyDetails.email || "Company Email"}</p>
          <p>VAT: {companyDetails.vat || "Company VAT"}</p>
        </div>
        <div className="invoice-details">
          <h1>INVOICE</h1>
          <p>Invoice Number: {invoiceNumber}</p>
          <p>
            Invoice Date:{" "}
            {created_at ? new Date(created_at).toLocaleDateString() : ""}
          </p>
        </div>
      </div>
      <div className="invoice-to">
        <h2>Invoice To</h2>
        <p>{clientDetails.name || "Client Name"}</p>
        <p>{clientDetails.address || "Client Address"}</p>
        <p>Phone: {clientDetails.phone || "Client Phone"}</p>
        <p>Email: {clientDetails.email || "Client Email"}</p>
        <p>VAT: {clientDetails.vat || "Client VAT"}</p>
      </div>
      <table className="invoice-items">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Tax</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toFixed(2)}</td>
                <td>{item.tax}%</td>
                <td>
                  {(
                    item.price * item.quantity +
                    (item.price * item.quantity * item.tax) / 100
                  ).toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No items found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="invoice-summary">
        <table>
          <tbody>
            <tr>
              <th>SUB TOTAL</th>
              <td>{subTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <th>TAX</th>
              <td>{taxAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <th>GRAND TOTAL</th>
              <td>{grandTotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="custom-message">
        <p>{customMessage}</p>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
