import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddClientForm from "./components/AddClientForm";
import ClientList from "./components/ClientList";
import AddProductForm from "./components/AddProductForm";
import ProductList from "./components/ProductList";
import InvoiceForm from "./components/InvoiceForm";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import "./styles.css";

const App = () => {
  return (
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
              <div className="container">
                <AddClientForm />
                <ClientList />
              </div>
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Layout>
              <div className="container">
                <AddProductForm />
                <ProductList />
              </div>
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
  );
};

export default App;
