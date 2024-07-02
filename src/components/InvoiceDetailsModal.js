import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const InvoiceDetailsModal = ({
  invoice,
  clients,
  products,
  onClose,
  onUpdate,
  onMarkAsReceived,
  onDelete,
}) => {
  const [formData, setFormData] = useState({
    client: invoice.client,
    product: invoice.product,
    quantity: invoice.quantity,
    customMessage: invoice.customMessage,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({});
  const [clientDetails, setClientDetails] = useState({});

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .single();
      if (error) {
        console.error("Error fetching company details:", error.message);
      } else if (data) {
        setCompanyDetails(data);
      }
    };

    const fetchClientDetails = async () => {
      const client = clients.find((client) => client.id === invoice.client);
      if (client) {
        setClientDetails(client);
      }
    };

    fetchCompanyDetails();
    fetchClientDetails();
  }, [invoice.client, clients]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const updatedInvoice = {
      ...invoice,
      ...formData,
    };

    const { error } = await supabase
      .from("invoices")
      .update(updatedInvoice)
      .eq("id", invoice.id);

    if (error) {
      console.error("Error updating invoice:", error.message);
    } else {
      onUpdate();
      onClose();
    }
  };

  const handleMarkAsReceived = async () => {
    const { error } = await supabase
      .from("invoices")
      .update({ ...invoice, type: "received" })
      .eq("id", invoice.id);

    if (error) {
      console.error("Error marking invoice as received:", error.message);
    } else {
      onMarkAsReceived();
      onClose();
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase
      .from("invoices")
      .delete()
      .eq("id", invoice.id);

    if (error) {
      console.error("Error deleting invoice:", error.message);
    } else {
      onDelete();
      onClose();
    }
  };

  const handlePrint = () => {
    const invoiceData = {
      ...invoice,
      companyDetails,
      clientDetails,
      items: products.filter((product) => product.id === invoice.product),
    };

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .invoice-container {
              max-width: 800px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .invoice-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            .invoice-header div {
              width: 48%;
            }
            .invoice-header h1 {
              margin: 0 0 10px;
              font-size: 24px;
              color: #333;
            }
            .invoice-header p {
              margin: 4px 0;
              color: #666;
            }
            .invoice-details {
              text-align: right;
            }
            .invoice-to {
              margin-bottom: 20px;
            }
            .invoice-to h2 {
              margin: 0 0 10px;
              font-size: 20px;
              color: #333;
            }
            .invoice-items table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            .invoice-items th, .invoice-items td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            .invoice-items th {
              background-color: #f9f9f9;
              color: #333;
            }
            .invoice-summary table {
              width: 100%;
              border-collapse: collapse;
            }
            .invoice-summary th, .invoice-summary td {
              padding: 8px;
              text-align: right;
              color: #333;
            }
            .invoice-summary th {
              width: 80%;
              padding-right: 20px;
              font-weight: normal;
            }
            .custom-message {
              text-align: center;
              padding: 20px 0;
              font-style: italic;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="invoice-header">
              <div>
                <h1>${companyDetails.name}</h1>
                <p>${companyDetails.address}</p>
                <p>Phone: ${companyDetails.phone}</p>
                <p>Email: ${companyDetails.email}</p>
                <p>VAT: ${companyDetails.vat}</p>
              </div>
              <div class="invoice-details">
                <h1>INVOICE</h1>
                <p>Invoice Number: ${invoiceData.invoiceNumber}</p>
                <p>Invoice Date: ${new Date(
                  invoiceData.created_at
                ).toLocaleDateString()}</p>
              </div>
            </div>
            <div class="invoice-to">
              <h2>Invoice To</h2>
              <p>${clientDetails.name}</p>
              <p>${clientDetails.address}</p>
              <p>Phone: ${clientDetails.phone}</p>
              <p>Email: ${clientDetails.email}</p>
              <p>VAT: ${clientDetails.vat}</p>
            </div>
            <div class="invoice-items">
              <table>
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
                  ${invoiceData.items
                    .map(
                      (item, index) => `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${item.name}</td>
                      <td>${item.quantity}</td>
                      <td>${item.price}</td>
                      <td>${item.tax}%</td>
                      <td>${(
                        item.price * item.quantity +
                        (item.price * item.quantity * item.tax) / 100
                      ).toFixed(2)}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
            <div class="invoice-summary">
              <table>
                <tr>
                  <th>SUB TOTAL</th>
                  <td>${invoiceData.items
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}</td>
                </tr>
                <tr>
                  <th>TAX</th>
                  <td>${invoiceData.items
                    .reduce(
                      (acc, item) =>
                        acc + (item.price * item.quantity * item.tax) / 100,
                      0
                    )
                    .toFixed(2)}</td>
                </tr>
                <tr>
                  <th>TOTAL</th>
                  <td>${invoiceData.items
                    .reduce(
                      (acc, item) =>
                        acc +
                        item.price * item.quantity +
                        (item.price * item.quantity * item.tax) / 100,
                      0
                    )
                    .toFixed(2)}</td>
                </tr>
              </table>
            </div>
            <div class="custom-message">
              <p>${invoiceData.customMessage}</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {isEditing ? (
          <>
            <h2>Edit Invoice</h2>
            <select
              name="client"
              value={formData.client}
              onChange={handleChange}
            >
              <option value="">Select Client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
            <textarea
              name="customMessage"
              value={formData.customMessage}
              onChange={handleChange}
            />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <h2>Invoice Details</h2>
            <p>
              Client:{" "}
              {clients.find((client) => client.id === invoice.client)?.name}
            </p>
            <p>
              Product:{" "}
              {products.find((product) => product.id === invoice.product)?.name}
            </p>
            <p>Quantity: {invoice.quantity}</p>
            <p>Custom Message: {invoice.customMessage}</p>
            <p>Total: {invoice.total}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleMarkAsReceived}>Mark as Received</button>
            <button onClick={handlePrint}>Print</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default InvoiceDetailsModal;
