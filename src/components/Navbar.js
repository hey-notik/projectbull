import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Navbar.css";
import logo from "../assets/logo.png"; // Import the logo image

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Logo" className="navbar-logo" />{" "}
        {/* Add the logo */}
      </div>
      <div className="navbar-links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active" : "nav-link")}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/clients"
          className={({ isActive }) => (isActive ? "active" : "nav-link")}
        >
          Clients
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "active" : "nav-link")}
        >
          Products
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "active" : "nav-link")}
        >
          Profile
        </NavLink>
        <NavLink to="/login" className="nav-link" onClick={handleSignOut}>
          Sign Out
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
