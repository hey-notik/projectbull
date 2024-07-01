// src/components/InvoicePrinter.js
import React from "react";
import { renderToString } from "react-dom/server";
import InvoiceTemplate from "./InvoiceTemplate";
import "./InvoiceTemplate.css";

const printInvoice = (invoiceData) => {
  const invoiceHTML = renderToString(
    <InvoiceTemplate invoiceData={invoiceData} />
  );
  const printWindow = window.open("", "_blank");

  // Get the styles from the current document
  const styles = Array.from(document.styleSheets)
    .map((styleSheet) => {
      try {
        return Array.from(styleSheet.cssRules)
          .map((rule) => rule.cssText)
          .join("");
      } catch (e) {
        console.log(e);
        return "";
      }
    })
    .join("");

  printWindow.document.write(`
    <html>
      <head>
        <title>Invoice</title>
        <style>
          ${styles}
        </style>
      </head>
      <body>
        ${invoiceHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
};

export default printInvoice;
