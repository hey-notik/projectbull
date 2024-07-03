import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import ProductDetailsOverlay from "./ProductDetailsOverlay";
import "./Overlay.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const fetchProducts = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user:", userError.message);
      return;
    }
    const user = userData.user;
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      console.error("Error fetching products:", error.message);
    } else {
      setProducts(data);
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(() => {
      fetchProducts();
    }, 5000); // Fetch products every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setOverlayOpen(false);
    setSelectedProduct(null);
  };

  const handleProductUpdated = () => {
    fetchProducts(); // Refresh the product list
  };

  const handleProductDeleted = () => {
    fetchProducts(); // Refresh the product list
  };

  return (
    <div className="list-container">
      <div className="list">
        <h2>Your Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id} onClick={() => handleProductClick(product)}>
              {product.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedProduct && (
        <ProductDetailsOverlay
          product={selectedProduct}
          onClose={handleCloseOverlay}
          onUpdate={handleProductUpdated}
          onDelete={handleProductDeleted}
        />
      )}
    </div>
  );
};

export default ProductList;
