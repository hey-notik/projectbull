import React from "react";

const InvoiceTemplate2 = ({ invoiceData }) => {
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      border: "1px solid #ddd",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
    headerTitle: {
      margin: 0,
      fontSize: "32px",
    },
    companyDetails: {
      marginTop: 0,
    },
    clientDetails: {
      marginTop: "20px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    thTd: {
      border: "1px solid #ddd",
      padding: "8px",
      textAlign: "left",
    },
    th: {
      backgroundColor: "#f2f2f2",
    },
    totals: {
      marginTop: "20px",
      textAlign: "right",
    },
    customMessage: {
      marginTop: "20px",
      fontStyle: "italic",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>INVOICE</h1>
      </div>
      <div style={styles.companyDetails}>
        <h2>{invoiceData.companyDetails.name}</h2>
        <p>{invoiceData.companyDetails.address}</p>
        <p>Phone: {invoiceData.companyDetails.phone}</p>
        <p>Email: {invoiceData.companyDetails.email}</p>
        <p>VAT: {invoiceData.companyDetails.vat}</p>
      </div>
      <div style={styles.clientDetails}>
        <h2>Invoice To</h2>
        <p>{invoiceData.clientDetails.name}</p>
        <p>{invoiceData.clientDetails.address}</p>
        <p>Phone: {invoiceData.clientDetails.phone}</p>
        <p>Email: {invoiceData.clientDetails.email}</p>
        <p>VAT: {invoiceData.clientDetails.vat}</p>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{ ...styles.thTd, ...styles.th }}>#</th>
            <th style={{ ...styles.thTd, ...styles.th }}>Description</th>
            <th style={{ ...styles.thTd, ...styles.th }}>Price</th>
            <th style={{ ...styles.thTd, ...styles.th }}>Quantity</th>
            <th style={{ ...styles.thTd, ...styles.th }}>Tax</th>
            <th style={{ ...styles.thTd, ...styles.th }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td style={styles.thTd}>{index + 1}</td>
              <td style={styles.thTd}>{item.name}</td>
              <td style={styles.thTd}>{item.price?.toFixed(2)}</td>
              <td style={styles.thTd}>{item.quantity}</td>
              <td style={styles.thTd}>{item.tax?.toFixed(2)}%</td>
              <td style={styles.thTd}>
                {(item.price * item.quantity * (1 + item.tax / 100))?.toFixed(
                  2
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.totals}>
        <p>
          Sub Total:{" "}
          {invoiceData.items
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            ?.toFixed(2)}
        </p>
        <p>
          Tax:{" "}
          {invoiceData.items
            .reduce(
              (acc, item) =>
                acc + (item.price * item.quantity * item.tax) / 100,
              0
            )
            ?.toFixed(2)}
        </p>
        <p>Total: {invoiceData.total?.toFixed(2)}</p>
      </div>
      <div style={styles.customMessage}>
        <p>{invoiceData.customMessage}</p>
      </div>
    </div>
  );
};

export default InvoiceTemplate2;
