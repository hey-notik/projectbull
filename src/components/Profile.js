import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useProfile } from "../context/ProfileContext";
import InvoiceTemplate1 from "./InvoiceTemplate1";
import InvoiceTemplate2 from "./InvoiceTemplate2";
import InvoiceTemplate3 from "./InvoiceTemplate3";

const Profile = () => {
  const { profile, refreshProfile } = useProfile();
  const [formData, setFormData] = useState(profile);
  const [selectedTemplate, setSelectedTemplate] = useState("");

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

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = { ...formData, template: selectedTemplate };
    const { error } = await supabase
      .from("profiles")
      .upsert(profileData, { returning: "minimal" });
    if (error) {
      console.error("Error saving profile:", error.message);
    } else {
      console.log("Profile saved successfully!");
      refreshProfile();
    }
  };

  const renderSelectedTemplate = () => {
    const invoiceData = {
      companyDetails: formData.companyDetails || {},
      clientDetails: formData.clientDetails || {},
      items: formData.items || [],
    };

    switch (selectedTemplate) {
      case "InvoiceTemplate1":
        return <InvoiceTemplate1 invoiceData={invoiceData} />;
      case "InvoiceTemplate2":
        return <InvoiceTemplate2 invoiceData={invoiceData} />;
      case "InvoiceTemplate3":
        return <InvoiceTemplate3 invoiceData={invoiceData} />;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid m-5">
      <div className="row">
        <div
          className="col-md-6 col-lg-5 border rounded-2 p-4"
          style={{ height: "auto", width: "50%" }}
        >
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
              Template Selection
            </label>
            <select
              className="form-control mb-4 w-100"
              name="template"
              value={selectedTemplate}
              onChange={handleTemplateChange}
            >
              <option value="">Select Template</option>
              <option value="InvoiceTemplate1">Template 1</option>
              <option value="InvoiceTemplate2">Template 2</option>
              <option value="InvoiceTemplate3">Template 3</option>
            </select>
            <button type="submit" className="btn btn-primary w-100 mt-5">
              Save
            </button>
          </form>
          {renderSelectedTemplate()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
