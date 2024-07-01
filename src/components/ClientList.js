// src/components/ClientList.js
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase.from("clients").select("*");
      if (error) console.error("Error fetching clients:", error.message);
      else setClients(data);
    };

    fetchClients();
  }, []);

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  return (
    <div className="list-container">
      <div className="list">
        <h2>Your Clients</h2>
        <ul>
          {clients.map((client) => (
            <li key={client.id} onClick={() => handleClientClick(client)}>
              {client.name}
            </li>
          ))}
        </ul>
        {selectedClient && (
          <div>
            <h3>Client Details</h3>
            <p>Name: {selectedClient.name}</p>
            <p>Address: {selectedClient.address}</p>
            <p>VAT: {selectedClient.vat}</p>
            <p>Phone: {selectedClient.phone}</p>
            <p>Email: {selectedClient.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientList;
