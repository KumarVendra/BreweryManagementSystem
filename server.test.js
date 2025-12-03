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
test('POST /api/products - should fail with missing name', async () => {
    const res = await request(app).post('/api/products').send({
      category: 'Tea',
      price: 2.0
    });
    expect(res.statusCode).toBe(400);
  });
test('POST /api/products - should fail with negative price', async () => {
    const res = await request(app).post('/api/products').send({
      name: 'Espresso',
      price: -1
    });
    expect(res.statusCode).toBe(400);
  });
   test('GET /api/products - should return array of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    createdProductId = res.body[0]._id;
  });
  test('PUT /api/products/:id - should update product', async () => {
    const res = await request(app).put(`/api/products/${createdProductId}`).send({
      name: 'Latte Large',
      price: 4.0,
      stock: 15,
      category: 'Coffee',
      description: 'Large milk coffee',
      size: 'Large'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Latte Large');
  });
 
  test('PUT /api/products/:id - should fail with invalid ID', async () => {
    const res = await request(app).put('/api/products/123456789012').send({
      name: 'Invalid'
    });
    expect(res.statusCode).toBe(404);
  });

  test('PUT /api/products/:id - should fail with negative stock', async () => {
    const res = await request(app).put(`/api/products/${createdProductId}`).send({
      stock: -5
    });
    expect(res.statusCode).toBe(400);
  });
