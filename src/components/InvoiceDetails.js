// src/components/InvoiceDetails.js
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import printInvoice from "./InvoicePrinter";
import "./InvoiceDetails.css";
import "./Form.css"; // Import the CSS for form styles
import "bootstrap/dist/css/bootstrap.min.css";

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
              <p>Client Details</p>
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
              <p>Products</p>
              <table className="table table-dark">
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
              <p>Grand Total: {total}</p>
            </div>
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <div className="details-container">
              <div className="client-details me-2">
                <p>Client Details</p>
                <div>
                  <div className="d-flex flex-col mb-3">
                    <img src={getAvatar(2)} className="client-avatar mt-2" />
                    <div className="ps-3">
                      <span className="client-name d-block">
                        {clientDetails.name}
                      </span>
                      <span className="client-email">
                        {clientDetails.email}
                      </span>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: "0.9rem" }}>
                  Address: {clientDetails.address}
                </p>
                <p style={{ fontSize: "0.9rem" }}>
                  Phone: {clientDetails.phone}
                </p>
                <p style={{ fontSize: "0.9rem" }}>VAT: {clientDetails.vat}</p>
              </div>
              <div className="company-details">
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
                <p style={{ fontSize: "0.9rem" }}>
                  Phone: {companyDetails.phone}
                </p>
                <p style={{ fontSize: "0.9rem" }}>VAT: {companyDetails.vat}</p>
              </div>
            </div>
            <div className="products">
              <p>Products</p>
              <table className="table table-dark">
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
                    <tr key={index} style={{ fontSize: "0.9rem" }}>
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
