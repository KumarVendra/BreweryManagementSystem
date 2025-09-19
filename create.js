const productForm = document.getElementById("productForm");
const API_URL = "http://localhost:3000/api/products";

// Handle form submission
productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const price = parseFloat(document.getElementById("price").value);
  const stock = parseInt(document.getElementById("stock").value) || 0;
  const size = document.getElementById("size").value;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category, description, price, stock, size })
    });

    if (res.ok) {
      alert("Product added successfully!");
      productForm.reset();
    } else {
      alert("Error adding product.");
    }
  } catch (err) {
    console.error(err);
    alert("Error connecting to server.");
  }
});
