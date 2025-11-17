const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/cafeDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0, min: 0 },
  size: { type: String }
});


const Product = mongoose.model("Product", productSchema);


// 1. Create product
app.post("/api/products", async (req, res) => {
  try {
    const { name, category, description, price, stock, size } = req.body;

    if (!name || price < 0 || stock < 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const product = new Product({ name, category, description, price, stock, size });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.put("/api/products/:id", async (req, res) => {
  try {
    const { name, category, description, price, stock, size } = req.body;

    // Validation
    if (!name || price < 0 || stock < 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

app.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = { app, Product };

