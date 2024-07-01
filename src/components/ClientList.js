import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const ClientList = () => {
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user:", userError.message);
      return;
    }
    const user = userData.user;
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      console.error("Error fetching clients:", error.message);
    } else {
      setClients(data);
    }
  };

  useEffect(() => {
    fetchClients();
    const interval = setInterval(() => {
      fetchClients();
    }, 5000); // Fetch clients every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="list-container">
      <div className="list">
        <h2>Your Clients</h2>
        <ul>
          {clients.map((client) => (
            <li key={client.id}>{client.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientList;
