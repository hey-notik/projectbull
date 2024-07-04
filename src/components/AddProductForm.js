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
    <div>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit} className="form">
        <h2>Add a Product/Service</h2>
        <p className="text-secondary mb-5">
          Add the details of your Products/Services
        </p>
        <label className="form-label fw-bold">Name of Product/Service</label>
        <input
          className="form-control mb-3 w-100"
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />
        <label className="form-label fw-bold mt-3">
          Description of Product/Service
        </label>
        <textarea
          className="form-control mb-3 w-100"
          style={{ height: "150px" }}
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <label className="form-label fw-bold mt-3">
          Price of Product/Service
        </label>
        <input
          className="form-control mb-3 w-100"
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <label className="form-label fw-bold mt-3">
          GST/VAT/Tax Information (%)
        </label>
        <input
          className="form-control mb-3 w-100"
          type="number"
          name="tax"
          placeholder="Tax (%)"
          value={formData.tax}
          onChange={handleChange}
        />
        <button type="submit" className="rounded-2 mt-5 w-100">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
