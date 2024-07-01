import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const AddProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    tax: "",
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
      .from("products")
      .insert([{ ...formData, user_id: user.id }]);
    if (error) {
      console.error("Error adding product:", error.message);
      setError(`Error adding product: ${error.message}`);
    } else {
      console.log("Product added successfully!");
      setSuccess("Product added successfully!");
      if (typeof onProductAdded === "function") {
        onProductAdded();
      }
      setFormData({
        name: "",
        description: "",
        price: "",
        tax: "",
      });
    }
  };

  return (
    <div className="form-container">
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit} className="form">
        <h2>Add a Product/Service</h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="tax"
          placeholder="Tax (%)"
          value={formData.tax}
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
