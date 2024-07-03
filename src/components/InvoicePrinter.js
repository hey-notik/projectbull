import React from "react";
import { renderToString } from "react-dom/server";
import InvoiceTemplate1 from "./InvoiceTemplate1";
import InvoiceTemplate2 from "./InvoiceTemplate2";
import InvoiceTemplate3 from "./InvoiceTemplate3";

const printInvoice = (invoiceData) => {
  const { invoiceTemplate } = invoiceData.companyDetails;
  let TemplateComponent;

  switch (invoiceTemplate) {
    case "template2":
      TemplateComponent = InvoiceTemplate2;
      break;
    case "template3":
      TemplateComponent = InvoiceTemplate3;
      break;
    case "template1":
    default:
      TemplateComponent = InvoiceTemplate1;
      break;
  }

  const htmlString = renderToString(
    <TemplateComponent invoiceData={invoiceData} />
  );

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Invoice</title>
        <style>
          ${
            TemplateComponent === InvoiceTemplate1 &&
            `
            .invoice-template1-container {
              font-family: Arial, sans-serif;
              padding: 20px;
              border: 1px solid #ddd;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 20px;
            }
            .company-details {
              margin: 0;
              font-size: 24px;
            }
            .invoice-details {
              margin: 0;
              font-size: 32px;
              text-align: right;
            }
            .client-details {
              margin-top: 0;
            }
            .items {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .items th,
            .items td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            .items th {
              background-color: #f2f2f2;
            }
            .totals {
              margin-top: 20px;
              text-align: right;
            }
            .custom-message {
              margin-top: 20px;
              font-style: italic;
            }
          `
          }
          ${
            TemplateComponent === InvoiceTemplate2 &&
            `
            .invoice-template2-container {
              font-family: Arial, sans-serif;
              padding: 20px;
              border: 1px solid #ddd;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .header h1 {
              margin: 0;
              font-size: 32px;
            }
            .company-details h2 {
              margin-top: 0;
            }
            .client-details h2 {
              margin-top: 20px;
            }
            .items {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .items th,
            .items td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            .items th {
              background-color: #f2f2f2;
            }
            .totals {
              margin-top: 20px;
              text-align: right;
            }
            .custom-message {
              margin-top: 20px;
              font-style: italic;
            }
          `
          }
          ${
            TemplateComponent === InvoiceTemplate3 &&
            `
            .invoice-template3-container {
              font-family: Arial, sans-serif;
              padding: 20px;
              border: 1px solid #ddd;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .header h1 {
              margin: 0;
              font-size: 32px;
            }
            .company-details h2 {
              margin-top: 0;
            }
            .client-details h2 {
              margin-top: 20px;
            }
            .items {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .items th,
            .items td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            .items th {
              background-color: #f2f2f2;
            }
            .totals {
              margin-top: 20px;
              text-align: right;
            }
            .custom-message {
              margin-top: 20px;
              font-style: italic;
            }
          `
          }
        </style>
      </head>
      <body>${htmlString}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
};

export default printInvoice;
