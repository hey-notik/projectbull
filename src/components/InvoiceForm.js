import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const InvoiceForm = ({ onInvoiceAdded }) => {
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    client: "",
    product: "",
    quantity: 1,
    customMessage: "",
  });
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await supabase.from("clients").select("*");
      setClients(data);
    };

    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*");
      setProducts(data);
    };

    const fetchCompanyDetails = async () => {
      const { data } = await supabase.from("profiles").select("*").single();
      setCompanyDetails(data);
    };

    fetchClients();
    fetchProducts();
    fetchCompanyDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductSelect = (e) => {
    const selectedProduct = products.find(
      (product) => product.id === parseInt(e.target.value)
    );
    setSelectedProducts((prev) => [
      ...prev,
      { ...selectedProduct, quantity: 1 },
    ]);
    setFormData((prev) => ({
      ...prev,
      product: "",
    }));
  };

  const handleQuantityChange = (index, quantity) => {
    setSelectedProducts((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, quantity: parseInt(quantity) || 1 } : item
      )
    );
  };

  const calculateTotal = (price, quantity, tax) => {
    const priceNum = parseFloat(price) || 0;
    const quantityNum = parseInt(quantity, 10) || 0;
    const taxNum = parseFloat(tax) || 0;
    return priceNum * quantityNum + priceNum * quantityNum * (taxNum / 100);
  };

  const grandTotal = selectedProducts.reduce(
    (acc, item) => acc + calculateTotal(item.price, item.quantity, item.tax),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage("User not authenticated.");
      return;
    }

    const invoiceData = {
      invoiceNumber: formData.invoiceNumber,
      client: parseInt(formData.client, 10) || null,
      product: formData.product,
      quantity: parseInt(formData.quantity, 10) || 1,
      customMessage: formData.customMessage,
      total: grandTotal,
      items: selectedProducts.map((item) => ({
        ...item,
        quantity: parseInt(item.quantity, 10) || 1,
        price: parseFloat(item.price) || 0,
        tax: parseFloat(item.tax) || 0,
      })),
      user_id: user.id,
    };

    if (!invoiceData.client) {
      setMessage("Client is required.");
      return;
    }

    const { error } = await supabase.from("invoices").insert([invoiceData]);
    if (error) {
      console.error("Error generating invoice:", error.message);
      setMessage(`Error generating invoice: ${error.message}`);
    } else {
      console.log("Invoice generated successfully!");
      setMessage("Invoice generated successfully!");

      setFormData({
        invoiceNumber: "",
        client: "",
        product: "",
        quantity: 1,
        customMessage: "",
      });
      setSelectedProducts([]);
      onInvoiceAdded();
    }
  };

  return (
    <div className="border rounded-2">
      <form onSubmit={handleSubmit} className="invoice-form">
        <h2>Generate an Invoice!</h2>
        {message && <p>{message}</p>}
        <input
          type="text"
          name="invoiceNumber"
          placeholder="Invoice Number"
          value={formData.invoiceNumber}
          onChange={handleChange}
        />
        <select name="client" value={formData.client} onChange={handleChange}>
          <option value="">Select Your Client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        {companyDetails && (
          <div className="company-details">
            <p>{companyDetails.name}</p>
            <p>{companyDetails.address}</p>
            <p>Tax: {companyDetails.vat}</p>
          </div>
        )}
        <select
          name="product"
          value={formData.product}
          onChange={handleProductSelect}
        >
          <option value="">
            {selectedProducts.length === 0
              ? "Add a Product"
              : "Add Another Product"}
          </option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Tax</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>
                  <input
                    type="number"
                    value={product.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                  />
                </td>
                <td>{product.price}</td>
                <td>{product.tax}</td>
                <td>
                  {calculateTotal(product.price, product.quantity, product.tax)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="grand-total">
          <h3>Grand Total: {grandTotal}</h3>
        </div>
        <textarea
          name="customMessage"
          placeholder="Enter a custom Message to be printed in your invoice."
          value={formData.customMessage}
          onChange={handleChange}
        />
        <button type="submit">Generate</button>
      </form>
    </div>
  );
};

export default InvoiceForm;
