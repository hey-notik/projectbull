// src/context/ProfileContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    vat: "",
    invoiceTemplate: "template1",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .single();
      if (!error) {
        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  const refreshProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .single();
    if (!error) {
      setProfile(data);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, refreshProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
