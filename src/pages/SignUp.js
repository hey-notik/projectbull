// src/pages/SignUp.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Login.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src="/signup.jpg" alt="Sign Up Illustration" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSignUp} className="login-form">
          <h2>Sign Up</h2>
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
          <button type="submit">Sign Up</button>
          <Link to="/login">
            <button type="button" className="signup-button">
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
