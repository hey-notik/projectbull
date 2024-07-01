import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const AddClientForm = ({ onClientAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    vat: "",
    phone: "",
    email: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setSuccess(null); // Reset success state
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user:", userError.message);
      setError(`Error fetching user: ${userError.message}`);
      return;
    }
    const user = userData.user;
    const { error } = await supabase
      .from("clients")
      .insert([{ ...formData, user_id: user.id }]);
    if (error) {
      console.error("Error adding client:", error.message);
      setError(`Error adding client: ${error.message}`);
    } else {
      console.log("Client added successfully!");
      setSuccess("Client added successfully!");
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
    }
  };

  return (
    <div className="form-container">
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
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
