import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./InvoiceDetails.css";

const ClientDetailsOverlay = ({ client, onClose, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({
    name: client.name,
    email: client.email,
    phone: client.phone,
    address: client.address,
    vat: client.vat,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedClient = {
        ...client,
        ...formData,
      };

      const { error } = await supabase
        .from("clients")
        .update(updatedClient)
        .eq("id", client.id);

      if (error) {
        throw new Error(error.message);
      } else {
        onUpdate();
        onClose();
      }
    } catch (err) {
      console.error("Error updating client:", err.message);
      setError(`Error updating client: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("clients")
        .delete()
        .eq("id", client.id);

      if (error) {
        throw new Error(error.message);
      } else {
        onDelete();
        onClose();
      }
    } catch (err) {
      console.error("Error deleting client:", err.message);
      setError(
        `Error deleting client: there are one or more invoices associated with this client. Please delete them or reassign them and then come back to delete this client.`
      );
    }
  };

  return (
    <div className="overlay open">
      <div className="overlay-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        {error && <p className="error">{error}</p>}
        {isEditing ? (
          <>
            <h3>Edit Client Details</h3>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <label>VAT Number</label>
            <input
              type="text"
              name="vat"
              placeholder="VAT Number"
              value={formData.vat}
              onChange={handleChange}
            />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <h3>Client Details</h3>
            <p>Name: {client.name}</p>
            <p>Email: {client.email}</p>
            <p>Phone: {client.phone}</p>
            <p>Address: {client.address}</p>
            <p>VAT: {client.vat}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientDetailsOverlay;
