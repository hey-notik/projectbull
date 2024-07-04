import React, { useState, useEffect } from "react";
import ProductDetailsOverlay from "./ProductDetailsOverlay";
import AddProductForm from "./AddProductForm";
import "./Overlay.css";
import { useProducts } from "../context/ProductsContext";

const ProductList = () => {
  const { products, refreshProducts } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setOverlayOpen(false);
    setSelectedProduct(null);
  };

  const handleProductUpdated = () => {
    refreshProducts(); // Refresh the product list
  };

  const handleProductDeleted = () => {
    refreshProducts(); // Refresh the product list
  };

  const handleProductAdded = () => {
    refreshProducts(); // Refresh the product list when a new product is added
  };

  return (
    <div className="container">
      <div className="form-container">
        <AddProductForm onProductAdded={handleProductAdded} />
      </div>
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
    </div>
  );
};

export default ProductList;
