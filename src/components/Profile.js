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
    <div className="container-fluid m-5">
      <div className="row">
        <div className="col-5 border rounded-2 p-2" style={{ height: "80vh" }}>
          <form onSubmit={handleSubmit} className="form">
            <h2 className="mb-5">Your Profile</h2>
            <label className="form-label fw-bold">Name</label>
            <input
              className="form-control mb-4 w-100"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <label className="form-label fw-bold mt-4">
              Registered Email Address
            </label>
            <input
              className="form-control mb-4 w-100"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <label className="form-label fw-bold mt-4">
              Registered Phone Number
            </label>
            <input
              className="form-control mb-4 w-100"
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            <label className="form-label fw-bold mt-4">
              Registered Company Name
            </label>
            <input
              className="form-control mb-4 w-100"
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary w-100 mt-5">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
