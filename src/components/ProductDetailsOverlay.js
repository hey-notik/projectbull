import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./InvoiceDetails.css";

const ProductDetailsOverlay = ({ product, onClose, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    tax: product.tax,
    description: product.description,
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
      const updatedProduct = {
        ...product,
        ...formData,
      };

      const { error } = await supabase
        .from("products")
        .update(updatedProduct)
        .eq("id", product.id);

      if (error) {
        throw new Error(error.message);
      } else {
        onUpdate();
        onClose();
      }
    } catch (err) {
      console.error("Error updating product:", err.message);
      setError(`Error updating product: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);

      if (error) {
        throw new Error(error.message);
      } else {
        onDelete();
        onClose();
      }
    } catch (err) {
      console.error("Error deleting product:", err.message);
      setError(`Error deleting product: ${err.message}`);
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
            <h3>Edit Product Details</h3>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
            <label>Tax</label>
            <input
              type="number"
              name="tax"
              placeholder="Tax"
              value={formData.tax}
              onChange={handleChange}
            />
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <h3>Product Details</h3>
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
            <p>Tax: {product.tax}</p>
            <p>Description: {product.description}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsOverlay;
