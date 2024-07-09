import React, { useState, useEffect } from "react";
import ProductDetailsOverlay from "./ProductDetailsOverlay";
import AddProductForm from "./AddProductForm";
import "./Overlay.css"; // Import the CSS for overlay styles
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
    setOverlayOpen(false);
  };

  const handleProductDeleted = () => {
    refreshProducts(); // Refresh the product list
    setOverlayOpen(false);
  };

  const handleProductAdded = () => {
    refreshProducts(); // Refresh the product list when a new product is added
  };

  return (
    <div className="container-fluid m-5">
      <div className="row d-flex flex-row gap-5">
        <div
          className="col-5 p-3 ms-5 mb-5 border rounded-2"
          style={{ height: "auto" }}
        >
          <AddProductForm onProductAdded={handleProductAdded} />
        </div>
        <div className="col-5 p-3 border rounded-2" style={{ height: "85vh" }}>
          <h2>Your Products</h2>
          <ul className="list-unstyled">
            {products.map((product) => (
              <li
                className="p-2"
                key={product.id}
                onClick={() => handleProductClick(product)}
                style={{ cursor: "pointer" }}
              >
                <p className="ms-2">{product.name}</p>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {overlayOpen && selectedProduct && (
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
