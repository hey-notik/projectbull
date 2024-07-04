// src/context/ClientsContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";

const ClientsContext = createContext();

export const ClientsProvider = ({ children }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase.from("clients").select("*");
      if (!error) {
        setClients(data);
      }
    };

    fetchClients();
  }, []);

  const refreshClients = async () => {
    const { data, error } = await supabase.from("clients").select("*");
    if (!error) {
      setClients(data);
    }
  };

  return (
    <ClientsContext.Provider value={{ clients, refreshClients }}>
      {children}
    </ClientsContext.Provider>
  );
};

export const useClients = () => useContext(ClientsContext);
