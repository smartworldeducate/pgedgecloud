const db = require('../db');  // Assuming you are using Knex or some ORM

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const {order_number } = req.body;
    // Create an order in the 'orders' table
    const order = await db('orders').insert({
      order_number,
      order_date:new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    }).returning('*');
    res.status(201).json({ message: 'Order created successfully', order: order[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await db('orders').select('*');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await db('orders').where('id', req.params.id).first();
    if (order) {
      const orderItems = await db('order_items').where('order_id', order.id);
      order.items = orderItems;
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Order
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, total_price, status } = req.body;

    const updatedOrder = await db('orders').where('id', id).update({
      user_id,
      total_price,
      status,
      updated_at: new Date(),
    }).returning('*');

    if (updatedOrder.length) {
      res.json({ message: 'Order updated successfully', order: updatedOrder[0] });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await db('orders').where('id', id).del();
    
    if (deleted) {
      await db('order_items').where('order_id', id).del();  // Delete related order items as well
      res.json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
