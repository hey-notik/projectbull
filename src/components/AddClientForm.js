import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import "./Form.css"; // Import the CSS

const AddClientForm = ({ onClientAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    vat: "",
    phone: "",
    email: "",
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.address || !formData.vat) {
      setMessage("Name, Address, and VAT Number are required fields.");
      setMessageType("error");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 3000); // Hide message after 3 seconds
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setMessage(null);
    setMessageType(null);
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user:", userError.message);
      setMessage(`Error fetching user: ${userError.message}`);
      setMessageType("error");
      return;
    }
    const user = userData.user;
    const { error } = await supabase
      .from("clients")
      .insert([{ ...formData, user_id: user.id }]);
    if (error) {
      console.error("Error adding client:", error.message);
      setMessage(`Error adding client: ${error.message}`);
      setMessageType("error");
    } else {
      console.log("Client added successfully!");
      setMessage("Client added successfully!");
      setMessageType("success");
      if (typeof onClientAdded === "function") {
        onClientAdded();
      }
      setFormData({
        name: "",
        address: "",
        vat: "",
        phone: "",
        email: "",
      });
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 3000); // Hide message after 3 seconds
    }
  };

  return (
    <div className="form-container">
      {message && <div className={`message ${messageType}`}>{message}</div>}
      <form onSubmit={handleSubmit} className="form">
        <h2>Add a Client</h2>
        <input
          type="text"
          name="name"
          placeholder="Client Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="vat"
          placeholder="VAT Number"
          value={formData.vat}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Add Client</button>
      </form>
    </div>
  );
};

export default AddClientForm;
