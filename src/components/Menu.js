// src/components/Menu.js
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Menu = () => {
  const location = useLocation();

  const getClassName = ({ isActive }) => (isActive ? "active" : "");

  return (
    <nav className="menu">
      <NavLink to="/dashboard" className={getClassName}>
        Dashboard
      </NavLink>
      <NavLink to="/clients" className={getClassName}>
        Clients
      </NavLink>
      <NavLink to="/products" className={getClassName}>
        Products
      </NavLink>
      <NavLink to="/profile" className={getClassName}>
        Profile
      </NavLink>
    </nav>
  );
};

export default Menu;
