const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); // Make sure to use the correct path

router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;
