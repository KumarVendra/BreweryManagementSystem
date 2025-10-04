const API_URL = "http://localhost:3000/api/products";
const productTable = document.getElementById("productTable").getElementsByTagName('tbody')[0];
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const totalProducts = document.getElementById("totalProducts");
const totalStock = document.getElementById("totalStock");

let products = [];

// Fetch all products
async function loadProducts() {
  try {
    const res = await fetch(API_URL);
    products = await res.json();
    renderTable(products);
  } catch (err) {
    console.error(err);
  }
}