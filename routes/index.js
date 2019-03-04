var express = require('express');
var router = express.Router();

const clients = require('./clients');
const users = require('./users');
const products = require('./products');
const categories = require('./categories');
const stores = require('./stores');
const storeProducts = require('./storeProducts');
const orders = require('./orders');
const payments = require('./payments');

module.exports = (app) => {
  app.use('/api/product', products);
  app.use('/api/client', clients);
  app.use('/api/user', users);
  app.use('/api/category', categories);
  app.use('/api/storeProducts', storeProducts);
  app.use('/api/orders', orders);
  app.use('/api/payments', payments);
};

