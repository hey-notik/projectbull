// src/components/InvoiceTemplate.js
import React from "react";
import "./InvoiceTemplate.css";

const InvoiceTemplate = ({
  invoiceData,
  companyDetails = {},
  clientDetails = {},
}) => {
  console.log("Rendering InvoiceTemplate with:", {
    companyDetails,
    clientDetails,
  });

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

  const subTotal = calculateSubTotal(invoiceData.items);
  const taxAmount = calculateTax(invoiceData.items);
  const grandTotal = calculateGrandTotal(invoiceData.items);

  console.log("Company Details:", companyDetails);
  console.log("Client Details:", clientDetails);
  console.log("Invoice Data:", invoiceData);

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <div>
          <h1>{companyDetails.name || "Company Name"}</h1>
          <p>{companyDetails.address || "Company Address"}</p>
          <p>Phone: {companyDetails.phone || "Company Phone"}</p>
          <p>Email: {companyDetails.email || "Company Email"}</p>
          <p>VAT: {companyDetails.vat || "Company VAT"}</p>
        </div>
        <div className="invoice-details">
          <h1>INVOICE</h1>
          <p>Invoice Number: {invoiceData.invoiceNumber}</p>
          <p>
            Invoice Date:{" "}
            {new Date(invoiceData.created_at).toLocaleDateString()}
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
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.tax}%</td>
              <td>
                {(
                  item.price * item.quantity +
                  (item.price * item.quantity * item.tax) / 100
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="invoice-summary">
        <table>
          <tr>
            <th>SUB TOTAL</th>
            <td>{subTotal.toFixed(2)}</td>
          </tr>
          <tr>
            <th>TAX</th>
            <td>{taxAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <th>TOTAL</th>
            <td>{grandTotal.toFixed(2)}</td>
          </tr>
        </table>
      </div>
      <div
        className="custom-message"
        style={{ textAlign: "center", padding: "20px 0", fontStyle: "italic" }}
      >
        <p>{invoiceData.customMessage}</p>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
