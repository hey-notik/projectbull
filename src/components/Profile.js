import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // Add this line to import supabase
import { useProfile } from "../context/ProfileContext";

const Profile = () => {
  const { profile, refreshProfile } = useProfile();
  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("profiles")
      .upsert(formData, { returning: "minimal" });
    if (error) {
      console.error("Error saving profile:", error.message);
    } else {
      console.log("Profile saved successfully!");
      refreshProfile();
    }
  };

  return (
    <div className="profile-form-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <h2>Your Profile</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="vat"
          placeholder="VAT Number"
          value={formData.vat}
          onChange={handleChange}
        />
        <select
          name="invoiceTemplate"
          value={formData.invoiceTemplate}
          onChange={handleChange}
        >
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
          <option value="template3">Template 3</option>
        </select>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
