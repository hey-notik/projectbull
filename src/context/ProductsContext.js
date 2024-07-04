// src/context/ProductsContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (!error) {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  const refreshProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (!error) {
      setProducts(data);
    }
  };

  return (
    <ProductsContext.Provider value={{ products, refreshProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
