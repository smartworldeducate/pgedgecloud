const express = require('express');
const app = express();
const serverless = require('serverless-http');
const path = require('path');
const categoryRoutes = require('../routes/categoryRoutes');
const userRoutes = require('../routes/userRoutes');
const productRoutes = require('../routes/productRoutes');
const orderRoutes = require('../routes/orderRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Parse JSON
app.use(bodyParser.json());
app.use(express.json());

// Serve static files (Consider using cloud storage for production)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Basic route for health check
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Use Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/orders', orderRoutes);

// Export serverless handler
module.exports.handler = serverless(app);
