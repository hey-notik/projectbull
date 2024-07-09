import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./Form.css"; // Import the CSS for form styles
import "./Overlay.css"; // Import the CSS for overlay styles
import "bootstrap/dist/css/bootstrap.min.css";

const pastelColors = [
  "#FFB3BA",
  "#FFDFBA",
  "#FFFFBA",
  "#BAFFC9",
  "#BAE1FF",
  "#D4A5A5",
  "#E1E1E1",
  "#D6C2C2",
  "#C2D6C2",
  "#C2C2D6",
];

const getPastelColor = (index) => {
  return pastelColors[index % pastelColors.length];
};

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    vat: "",
    phone: "",
    email: "",
  });
  const [selectedClient, setSelectedClient] = useState(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.address || !formData.vat) {
      setMessage("Name, Address, and VAT Number are required fields.");
      setMessageType("error");
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 3000); // Hide message after 3 seconds
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setMessage(null);
    setMessageType(null);
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Error fetching user:", userError.message);
      setMessage(`Error fetching user: ${userError.message}`);
      setMessageType("error");
      return;
    }
    const user = userData.user;
    const { error } = await supabase
      .from("clients")
      .insert([{ ...formData, user_id: user.id }]);
    if (error) {
      console.error("Error adding client:", error.message);
      setMessage(`Error adding client: ${error.message}`);
      setMessageType("error");
    } else {
      console.log("Client added successfully!");
      setMessage("Client added successfully!");
      setMessageType("success");
      fetchClients(); // Refresh client list
      setFormData({
        name: "",
        address: "",
        vat: "",
        phone: "",
        email: "",
      });
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 3000); // Hide message after 3 seconds
    }
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setOverlayOpen(true);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({
      name: selectedClient.name,
      email: selectedClient.email,
      phone: selectedClient.phone,
      address: selectedClient.address,
      vat: selectedClient.vat,
    });
  };

  const handleDeleteClick = async () => {
    try {
      const { data: invoices, error: invoicesError } = await supabase
        .from("invoices")
        .select("*")
        .eq("client_id", selectedClient.id);

      if (invoicesError) {
        console.error("Error checking invoices:", invoicesError.message);
        setMessage(`Error checking invoices: ${invoicesError.message}`);
        setMessageType("error");
        return;
      }

      if (invoices.length > 0) {
        setMessage(
          "Cannot delete this client as there are associated invoices. Please delete the invoices first or reassign them to another client."
        );
        setMessageType("error");
        setTimeout(() => {
          setMessage(null);
          setMessageType(null);
        }, 3000); // Hide message after 3 seconds
        return;
      }

      const { error } = await supabase
        .from("clients")
        .delete()
        .eq("id", selectedClient.id);

      if (error) {
        throw new Error(error.message);
      } else {
        console.log("Client deleted successfully!");
        setMessage("Client deleted successfully!");
        setMessageType("success");
        fetchClients(); // Refresh client list
        handleCloseOverlay();
      }
    } catch (err) {
      console.error("Error deleting client:", err.message);
      setMessage(`Error deleting client: ${err.message}`);
      setMessageType("error");
    }
  };

  const handleSaveClick = async () => {
    if (!validateForm()) return;

    try {
      const updatedClient = {
        ...selectedClient,
        ...formData,
      };

      const { error } = await supabase
        .from("clients")
        .update(updatedClient)
        .eq("id", selectedClient.id);

      if (error) {
        throw new Error(error.message);
      } else {
        console.log("Client updated successfully!");
        setMessage("Client updated successfully!");
        setMessageType("success");
        fetchClients(); // Refresh client list
        handleCloseOverlay();
      }
    } catch (err) {
      console.error("Error updating client:", err.message);
      setMessage(`Error updating client: ${err.message}`);
      setMessageType("error");
    }
  };

  const handleCloseOverlay = () => {
    setOverlayOpen(false);
    setSelectedClient(null);
  };

  return (
    <div className="container-fluid m-5">
      <div className="row d-flex flex-row gap-5">
        <div className="col-5 p-3 border rounded-2" style={{ height: "85vh" }}>
          {message && <div className={`message ${messageType}`}>{message}</div>}
          <form onSubmit={handleSubmit} className="form">
            <h2 className="mb-0">Add a Client</h2>
            <p className="text-secondary mt-2 mb-4">
              Add all the details of your client!
            </p>
            <label className="form-label fw-bold">Registered Name</label>
            <input
              className="form-control mb-2 mt-1 w-100"
              type="text"
              name="name"
              placeholder="Client Name"
              value={formData.name}
              onChange={handleChange}
            />
            <label className="form-label fw-bold mt-2">
              Registered Address
            </label>
            <textarea
              className="form-control mb-2 mt-1 w-100"
              style={{ height: "150px" }}
              type="text"
              name="address"
              placeholder="Enter the registered address of the client"
              value={formData.address}
              onChange={handleChange}
            ></textarea>
            <label className="form-label fw-bold mt-2">VAT Number</label>
            <input
              className="form-control w-100"
              type="text"
              name="vat"
              placeholder="VAT Number"
              value={formData.vat}
              onChange={handleChange}
            />
            <label className="form-label fw-bold mt-2">
              Registered Phone Number
            </label>
            <input
              className="form-control w-100"
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            <label className="form-label fw-bold mt-2">Email Address</label>
            <input
              className="form-control w-100 mt-1 mb-4"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <button type="submit" className="rounded-2 w-100">
              Add Client
            </button>
          </form>
        </div>
        <div className="col-6 p-3 border rounded-2" style={{ height: "85vh" }}>
          <h2>Your Clients</h2>
          <ul className="client-list">
            {clients.map((client, index) => (
              <li
                key={client.id}
                className="client-list-item"
                onClick={() => handleClientClick(client)}
              >
                <div
                  className="client-avatar"
                  style={{ backgroundColor: getPastelColor(index) }}
                ></div>
                <div className="client-details">
                  <span className="client-name">{client.name}</span>
                  <span className="client-email">{client.email}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {overlayOpen && selectedClient && (
        <div className={`overlay ${overlayOpen ? "open" : ""}`}>
          <div className="overlay-content">
            <span className="close-button" onClick={handleCloseOverlay}>
              &times;
            </span>
            {message && (
              <div className={`message ${messageType}`}>{message}</div>
            )}
            {isEditing ? (
              <>
                <h3>Edit Client Details</h3>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
                <label>VAT Number</label>
                <input
                  type="text"
                  name="vat"
                  placeholder="VAT Number"
                  value={formData.vat}
                  onChange={handleChange}
                />
                <button onClick={handleSaveClick}>Save</button>
              </>
            ) : (
              <>
                <h3>Client Details</h3>
                <p>Name: {selectedClient.name}</p>
                <p>Email: {selectedClient.email}</p>
                <p>Phone: {selectedClient.phone}</p>
                <p>Address: {selectedClient.address}</p>
                <p>VAT: {selectedClient.vat}</p>
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleDeleteClick}>Delete</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;
