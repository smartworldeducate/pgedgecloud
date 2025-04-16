const db = require('../db');

// Create Product
exports.createProduct = async (req, res) => {
    try {
      const { name, price, category_id } = req.body;
      const image = req.file ? req.file.filename : null;
  
      const newProduct = await db('products')
        .insert({ name, price, category_id, image })
        .returning('*');
  
      res.status(201).json(newProduct[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await db('products').select('*');

    const fullProducts = products.map(product => ({
      ...product,
      image: product.image ? `${req.protocol}://${req.get('host')}/uploads/${product.image}` : null
    }));

    res.json(fullProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await db('products').where({ id: req.params.id }).first();
    if (product) res.json(product);
    else res.status(404).json({ error: 'Product not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const updated = await db('products')
      .where({ id: req.params.id })
      .update(req.body)
      .returning('*');
    if (updated.length) res.json(updated[0]);
    else res.status(404).json({ error: 'Product not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await db('products').where({ id: req.params.id }).del();
    if (deleted) res.json({ message: 'Product deleted' });
    else res.status(404).json({ error: 'Product not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const products = await db('products').where({ category_id: categoryId });
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
