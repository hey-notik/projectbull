// src/HomePage.js
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="header">
        <div className="logo">Breeew</div>
        <nav>
          <ul>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <Link to="/login" className="btn">
            Sign in
          </Link>
          <Link to="/signup" className="btn btn-signup">
            Sign up
          </Link>
        </div>
      </header>

      <main>
        <section className="hero">
          <h1>Create your invoices in 3 simple steps</h1>
          <p>
            Create invoices, manage invoices, manage your clients and products
            and make the your admin work fun!
          </p>
          <div className="email-signup">
            <input type="email" placeholder="Email address" />
            <button>Sign up for free</button>
          </div>
          <p className="note">
            Make your invoice generation fun! Sign up today!
          </p>
        </section>

        <section className="features" id="features">
          <div className="feature">
            <h2>Feature One</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="feature">
            <h2>Feature Two</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="feature">
            <h2>Feature Three</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Breeew. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
