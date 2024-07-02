import React from "react";
import { renderToString } from "react-dom/server";
import InvoiceTemplate from "./InvoiceTemplate";

const printInvoice = (invoiceData) => {
  const cssPath = `${window.location.origin}/path/to/InvoiceTemplate.css`; // Adjust the path to your actual CSS file location

  const htmlString = renderToString(
    <InvoiceTemplate
      invoiceData={invoiceData}
      companyDetails={invoiceData.companyDetails}
      clientDetails={invoiceData.clientDetails}
    />
  );

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Invoice</title>
        <link rel="stylesheet" type="text/css" href="${cssPath}">
      </head>
      <body>${htmlString}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
};

export default printInvoice;
