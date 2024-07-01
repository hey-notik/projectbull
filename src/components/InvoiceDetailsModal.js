import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import printInvoice from "./InvoicePrinter"; // Import the print function

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
    printInvoice(invoice); // Call the print function with the invoice data
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
