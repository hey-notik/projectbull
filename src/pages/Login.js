// src/pages/Login.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src="/login.jpg" alt="Login Illustration" />
      </div>
      <div className="form-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          {error && <div className="error">{error}</div>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <Link to="/signup">
            <button type="button" className="signup-button">
              Sign Up
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
