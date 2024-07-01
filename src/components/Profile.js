import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    vat: "",
    invoiceTemplate: "template1",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .single();
      if (error) {
        console.error("Error fetching profile:", error.message);
      } else if (data) {
        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("profiles")
      .upsert(profile, { returning: "minimal" });
    if (error) {
      console.error("Error saving profile:", error.message);
    } else {
      console.log("Profile saved successfully!");
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
          value={profile.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={profile.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={profile.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="vat"
          placeholder="VAT Number"
          value={profile.vat}
          onChange={handleChange}
        />
        <select
          name="invoiceTemplate"
          value={profile.invoiceTemplate}
          onChange={handleChange}
        >
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
        </select>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
