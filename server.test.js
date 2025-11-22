const request = require('supertest');
const mongoose = require('mongoose');
const { app, Product } = require('../server');
beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/cafeTestDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase(); 
  await mongoose.connection.close();
});

describe('Cafe Management System - CRUD API Tests', () => {
  let createdProductId;

  test('POST /api/products - should create a product', async () => {
    const res = await request(app).post('/api/products').send({
      name: 'Latte',
      category: 'Coffee',
      description: 'Smooth milk coffee',
      price: 3.5,
      stock: 10,
      size: 'Medium'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Latte');
    createdProductId = res.body._id;
  });
