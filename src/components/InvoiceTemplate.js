// src/components/InvoiceTemplate.js
import React from "react";
import "./InvoiceTemplate.css"; // Ensure styles are applied for print

const InvoiceTemplate = ({ invoiceData }) => {
  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <div>
          <h1>AGATHA.</h1>
          <p>Fashion Style</p>
        </div>
        <div className="invoice-details">
          <h1>INVOICE</h1>
          <p>Invoice Number: {invoiceData.invoiceNumber}</p>
          <p>Due Date: {invoiceData.dueDate}</p>
        </div>
      </div>
      <div className="invoice-to">
        <h2>Invoice To</h2>
        <p>{invoiceData.clientName}</p>
        <p>{invoiceData.clientAddress}</p>
      </div>
      <table className="invoice-items">
        <thead>
          <tr>
            <th>Item Description</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="invoice-summary">
        <table>
          <tr>
            <th>SUB TOTAL</th>
            <td>{invoiceData.subTotal}</td>
          </tr>
          <tr>
            <th>TAX</th>
            <td>{invoiceData.taxAmount}</td>
          </tr>
          <tr>
            <th>TOTAL</th>
            <td>{invoiceData.totalAmount}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
