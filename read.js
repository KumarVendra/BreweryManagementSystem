const API_URL = "http://localhost:3000/api/products";
const productTable = document.getElementById("productTable").getElementsByTagName('tbody')[0];

async function loadProducts() {
  try {
    const res = await fetch(API_URL);
    const products = await res.json();
    
    productTable.innerHTML = ""; // clear table

    products.forEach(product => {
      const row = productTable.insertRow();
      row.insertCell(0).innerText = product.name;
      row.insertCell(1).innerText = product.category;
      row.insertCell(2).innerText = product.description;
      row.insertCell(3).innerText = product.price;
      row.insertCell(4).innerText = product.stock;
      row.insertCell(5).innerText = product.size;
    });
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

// Initial load
loadProducts();
