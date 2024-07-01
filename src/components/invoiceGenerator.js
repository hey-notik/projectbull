// invoiceGenerator.js
function generateInvoice(invoiceData) {
  document.getElementById("invoice-number").textContent =
    invoiceData.invoiceNumber;
  document.getElementById("due-date").textContent = invoiceData.dueDate;
  document.getElementById("client-name").textContent = invoiceData.clientName;
  document.getElementById("client-address").textContent =
    invoiceData.clientAddress;

  const itemsList = document.getElementById("items-list");
  itemsList.innerHTML = ""; // Clear any existing items

  invoiceData.items.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${item.description}</td>
          <td>${item.quantity}</td>
          <td>${item.price}</td>
          <td>${item.total}</td>
      `;
    itemsList.appendChild(row);
  });

  document.getElementById("sub-total").textContent = invoiceData.subTotal;
  document.getElementById("tax-amount").textContent = invoiceData.taxAmount;
  document.getElementById("total-amount").textContent = invoiceData.totalAmount;
}

function printInvoice(invoiceData) {
  generateInvoice(invoiceData);
  window.print();
}
