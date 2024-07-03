// src/components/InvoiceDetails.js
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import printInvoice from "./InvoicePrinter";
import "./InvoiceDetails.css";

const InvoiceDetails = ({
  invoice,
  isOpen,
  onClose,
  onUpdate,
  onMarkAsReceived,
  onDelete,
}) => {
  const [formData, setFormData] = useState({
    client: invoice.client,
    customMessage: invoice.customMessage,
    items: invoice.items,
  });
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [clientDetails, setClientDetails] = useState({});
  const [companyDetails, setCompanyDetails] = useState({});
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [total, setTotal] = useState(invoice.total);

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await supabase.from("clients").select("*");
      setClients(data);
    };

    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*");
      setProducts(data);
    };

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

    fetchClients();
    fetchProducts();
    fetchClientDetails();
    fetchCompanyDetails();
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = formData.items.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
    updateTotal(updatedItems);
  };

  const updateTotal = (items) => {
    const newTotal = items.reduce((acc, item) => {
      return acc + calculateTotal(item.price, item.quantity, item.tax);
    }, 0);
    setTotal(newTotal.toFixed(2));
  };

  const handleSave = async () => {
    try {
      const updatedInvoice = {
        ...invoice,
        ...formData,
        total,
      };

      const { error } = await supabase
        .from("invoices")
        .update(updatedInvoice)
        .eq("id", invoice.id);

      if (error) {
        throw new Error(error.message);
      } else {
        onUpdate();
        onClose();
      }
    } catch (err) {
      console.error("Error updating invoice:", err.message);
      setError(`Error updating invoice: ${err.message}`);
    }
  };

  const handleMarkAsReceived = async () => {
    try {
      const { error } = await supabase
        .from("invoices")
        .update({ ...invoice, type: "received" })
        .eq("id", invoice.id);

      if (error) {
        throw new Error(error.message);
      } else {
        onMarkAsReceived();
        onClose();
      }
    } catch (err) {
      console.error("Error marking invoice as received:", err.message);
      setError(`Error marking invoice as received: ${err.message}`);
    }
  };

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
      items: formData.items,
      customMessage: formData.customMessage,
    };

    console.log("Invoice Data to Print: ", invoiceData); // Debug log

    printInvoice(invoiceData);
  };

  const calculateTotal = (price, quantity, tax) => {
    const priceNum = parseFloat(price) || 0;
    const quantityNum = parseInt(quantity, 10) || 0;
    const taxNum = parseFloat(tax) || 0;
    return priceNum * quantityNum + priceNum * quantityNum * (taxNum / 100);
  };

  return (
    <div className={`overlay ${isOpen ? "open" : ""}`}>
      <div className="overlay-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        {error && <p className="error">{error}</p>}
        {isEditing ? (
          <>
            <div className="client-details">
              <h3>Client Details</h3>
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
            </div>
            <div className="products">
              <h3>Products</h3>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Tax</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <select
                          name="name"
                          value={product.name}
                          onChange={(e) => handleProductChange(index, e)}
                        >
                          <option value="">Select Product</option>
                          {products.map((prod) => (
                            <option key={prod.id} value={prod.name}>
                              {prod.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          name="quantity"
                          value={product.quantity}
                          min="1"
                          onChange={(e) => handleProductChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="price"
                          value={product.price}
                          onChange={(e) => handleProductChange(index, e)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="tax"
                          value={product.tax}
                          onChange={(e) => handleProductChange(index, e)}
                        />
                      </td>
                      <td>
                        {calculateTotal(
                          product.price,
                          product.quantity,
                          product.tax
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <textarea
              name="customMessage"
              placeholder="Enter a custom Message to be printed in your invoice."
              value={formData.customMessage}
              onChange={handleChange}
            />
            <div className="grand-total">
              <h3>Grand Total: {total}</h3>
            </div>
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <div className="details-container">
              <div className="client-details">
                <h3>Client Details</h3>
                <p>Name: {clientDetails.name}</p>
                <p>Address: {clientDetails.address}</p>
                <p>Phone: {clientDetails.phone}</p>
                <p>Email: {clientDetails.email}</p>
              </div>
              <div className="company-details">
                <h3>Company Details</h3>
                <p>Name: {companyDetails.name}</p>
                <p>Address: {companyDetails.address}</p>
                <p>Phone: {companyDetails.phone}</p>
                <p>Email: {companyDetails.email}</p>
                <p>VAT: {companyDetails.vat}</p>
              </div>
            </div>
            <div className="products">
              <h3>Products</h3>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Tax</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price}</td>
                      <td>{product.tax}%</td>
                      <td>
                        {calculateTotal(
                          product.price,
                          product.quantity,
                          product.tax
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

export default InvoiceDetails;
