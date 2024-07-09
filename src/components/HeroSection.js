import React from "react";
import "../styles.css";

const HeroSection = () => {
  return (
    <div
      className="hero-section text-center py-5"
      style={{
        background: "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
        color: "hsl(var(--foreground))",
      }}
    >
      <div className="container">
        <h1 className="font-sans text-5xl font-medium max-w-[680px] mt-6 mx-auto drop-shadow-lg leading-none">
          Make your productized service shine
        </h1>
        <p className="mt-6 max-w-[680px] mx-auto">
          Accept payments, manage tasks, communicate and offer the best service
          possible with your very own client portal under 5 minutes.
        </p>
        <div className="mt-4">
          <input
            type="email"
            className="form-control d-inline-block w-auto"
            placeholder="Email address"
          />
          <button className="btn btn-primary ml-2">Sign up for free</button>
        </div>
        <p className="mt-2">
          Free until first subscriber - No credit card needed
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
