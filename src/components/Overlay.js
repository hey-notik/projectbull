import React, { useState, useEffect } from "react";
import "./Overlay.css";

const Overlay = ({ isOpen, onClose, children }) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setClosing(true);
      const timer = setTimeout(() => {
        setClosing(false);
      }, 300); // Duration of the closing animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className={`overlay ${isOpen ? "open" : closing ? "close" : ""}`}>
      <div className="overlay-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
