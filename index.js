const express = require('express');
const app = express();
const path = require('path');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
app.use(express.json());

// Use the route
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/orders', orderRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
