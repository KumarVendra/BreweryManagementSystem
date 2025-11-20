const request = require('supertest');
const mongoose = require('mongoose');
const { app, Product } = require('../server');
beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/cafeTestDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});