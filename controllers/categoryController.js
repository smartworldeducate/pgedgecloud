const db = require('../db');

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const category = await db('categories').insert(req.body).returning('*');
    res.status(201).json(category[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await db('categories').select('*');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await db('categories').where({ id: req.params.id }).first();
    if (category) res.json(category);
    else res.status(404).json({ error: 'Category not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  try {
    const updated = await db('categories').where({ id: req.params.id }).update(req.body).returning('*');
    if (updated.length) res.json(updated[0]);
    else res.status(404).json({ error: 'Category not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await db('categories').where({ id: req.params.id }).del();
    if (deleted) res.json({ message: 'Category deleted' });
    else res.status(404).json({ error: 'Category not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
