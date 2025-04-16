const db = require('../db');

exports.createUser = async (req, res) => {
  try {
    const user = await db('users').insert(req.body).returning('*');
    res.status(201).json(user[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await db('users').select('*');
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const user = await db('users').where({ id: req.params.id }).first();
  if (user) res.json(user);
  else res.status(404).json({ error: 'User not found' });
};

exports.updateUser = async (req, res) => {
  const updated = await db('users').where({ id: req.params.id }).update(req.body).returning('*');
  if (updated.length) res.json(updated[0]);
  else res.status(404).json({ error: 'User not found' });
};

exports.deleteUser = async (req, res) => {
  const deleted = await db('users').where({ id: req.params.id }).del();
  if (deleted) res.json({ message: 'User deleted' });
  else res.status(404).json({ error: 'User not found' });
};
