import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Navbar.css";
import logo from "./logo.png";
import { useTheme } from "../ThemeContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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
      <img src={logo} alt="Logo" className="navbar-logo" />
      <div className="navbar-links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/clients"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Clients
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Profile
        </NavLink>
        <NavLink to="/login" className="nav-link" onClick={handleSignOut}>
          Sign Out
        </NavLink>
        <div className="toggle-theme-btn" onClick={toggleTheme}>
          <div className="icon"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
