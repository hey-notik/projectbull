// src/components/ProductList.js
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) console.error("Error fetching products:", error.message);
      else setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
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
        {selectedProduct && (
          <div>
            <h3>Product Details</h3>
            <p>Name: {selectedProduct.name}</p>
            <p>Description: {selectedProduct.description}</p>
            <p>Price: {selectedProduct.price}</p>
            <p>Tax: {selectedProduct.tax}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
