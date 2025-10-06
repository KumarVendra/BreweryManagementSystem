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


// Render table
function renderTable(data) {
  productTable.innerHTML = "";
  let stockSum = 0;

  data.forEach(product => {
    stockSum += product.stock;

    const row = productTable.insertRow();
    row.insertCell(0).innerText = product.name;
    row.insertCell(1).innerText = product.category;
    row.insertCell(2).innerText = product.description;
    row.insertCell(3).innerText = product.price;
    row.insertCell(4).innerText = product.stock;
    row.insertCell(5).innerText = product.size;

    const actionCell = row.insertCell(6);
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => deleteProduct(product._id);
    actionCell.appendChild(deleteBtn);
  });

  totalProducts.innerText = data.length;
  totalStock.innerText = stockSum;
}

// Search and sort
searchInput.addEventListener("input", () => {
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  renderTable(filtered);
});

sortSelect.addEventListener("change", () => {
  let sorted = [...products];
  const criteria = sortSelect.value;

  if (criteria === "name") sorted.sort((a,b) => a.name.localeCompare(b.name));
  else if (criteria === "price") sorted.sort((a,b) => a.price - b.price);
  else if (criteria === "stock") sorted.sort((a,b) => a.stock - b.stock);

  renderTable(sorted);
});

// Delete product
async function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Error deleting product.");
    }
  }
}

// Initial load
loadProducts();
