// src/App.js
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ClientsProvider } from "./context/ClientsContext";
import { ProductsProvider } from "./context/ProductsContext";
import { ProfileProvider } from "./context/ProfileContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ClientList from "./components/ClientList";
import ProductList from "./components/ProductList";
import InvoiceForm from "./components/InvoiceForm";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import { useTheme } from "./ThemeContext";
import "./styles.css";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <AuthProvider>
      <ClientsProvider>
        <ProductsProvider>
          <ProfileProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/clients"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ClientList />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ProductList />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/invoices"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <InvoiceForm />
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ProfileProvider>
        </ProductsProvider>
      </ClientsProvider>
    </AuthProvider>
  );
};

export default App;
