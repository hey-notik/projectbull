import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./Form.css"; // Import the CSS for form styles
import "./Overlay.css"; // Import the CSS for overlay styles
import "bootstrap/dist/css/bootstrap.min.css";

const avatarUrls = [
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_1.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_2.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_3.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_4.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_5.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_6.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_7.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_8.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_9.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_10.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_11.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_12.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_13.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_14.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_15.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_16.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_17.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_18.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_19.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_20.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_21.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_22.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_23.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_24.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_25.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_26.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_27.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/3d_1.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/3d_2.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/3d_3.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/3d_4.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/3d_5.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_1.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_2.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_3.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_4.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_5.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_6.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_7.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_8.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_9.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/bluey_10.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_1.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_2.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_3.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_4.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_5.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_6.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_7.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_8.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_9.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_10.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_11.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_12.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_13.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_14.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_15.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_16.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_17.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_18.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_19.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_20.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_21.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_22.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_23.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_24.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_25.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_26.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_27.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_28.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_29.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_30.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_31.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_32.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_33.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_34.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_35.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_1.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_2.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_3.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_4.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_5.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_6.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_7.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_8.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_9.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_10.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_11.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_12.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_13.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_14.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/notion_15.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_1.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_2.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_3.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_4.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_5.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_6.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_7.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_8.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/teams_9.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_1.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_2.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_3.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_4.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_5.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_6.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_7.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_8.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_9.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/toon_10.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_1.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_2.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_3.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_4.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_5.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_6.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_7.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_8.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_9.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_10.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_11.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_12.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_13.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_14.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_15.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_16.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_17.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_18.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_19.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_20.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_21.png",
  "https://cdn.jsdelivr.net/gh/alohe/avatars/png/upstream_22.png",
];

const getAvatar = (index) => {
  return avatarUrls[index % avatarUrls.length];
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
  const [overlayFormData, setOverlayFormData] = useState({
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

  const handleOverlayChange = (e) => {
    const { name, value } = e.target;
    setOverlayFormData((prev) => ({
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
    setOverlayFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      vat: client.vat,
    });
    setOverlayOpen(true);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
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
    try {
      const updatedClient = {
        ...selectedClient,
        ...overlayFormData,
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
        <div
          className="col-5 p-3 ms-5 mb-5 border rounded-2"
          style={{ height: "auto" }}
        >
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
        <div className="col-5 p-3 border rounded-2" style={{ height: "85vh" }}>
          <h2>Your Clients</h2>
          <ul className="client-list">
            {clients.map((client, index) => (
              <li
                key={client.id}
                className="client-list-item d-flex flex-col align-items-center"
                onClick={() => handleClientClick(client)}
              >
                {/* <div
                  className="client-avatar"
                  style={{ background: getAvatar(index) }}
                ></div> */}
                <img src={getAvatar(index)} className="client-avatar" />
                <div className="client-details pt-3 ps-2">
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
                  value={overlayFormData.name}
                  onChange={handleOverlayChange}
                />
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={overlayFormData.email}
                  onChange={handleOverlayChange}
                />
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={overlayFormData.phone}
                  onChange={handleOverlayChange}
                />
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={overlayFormData.address}
                  onChange={handleOverlayChange}
                />
                <label>VAT Number</label>
                <input
                  type="text"
                  name="vat"
                  placeholder="VAT Number"
                  value={overlayFormData.vat}
                  onChange={handleOverlayChange}
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
