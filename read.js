const API_URL = "http://localhost:3000/api/products";
const productTable = document.getElementById("productTable").getElementsByTagName('tbody')[0];

async function loadProducts() {
  try {
    const res = await fetch(API_URL);
    const products = await res.json();