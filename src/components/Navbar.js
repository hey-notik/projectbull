// src/components/Navbar.js
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Navbar.css";

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
      <div className="navbar-brand">Invoice App</div>
      <div className="navbar-links">
        <NavLink to="/dashboard" className="nav-link" activeClassName="active">
          Dashboard
        </NavLink>
        <NavLink to="/clients" className="nav-link" activeClassName="active">
          Clients
        </NavLink>
        <NavLink to="/products" className="nav-link" activeClassName="active">
          Products
        </NavLink>
        <NavLink to="/profile" className="nav-link" activeClassName="active">
          Profile
        </NavLink>
        <button className="nav-link sign-out-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
