const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { protect, restrictTo } = require('../middleware/auth');

// All order routes are protected
router.use(protect);

// User routes
router.post('/', orderController.createOrder);
router.get('/myorders', orderController.getMyOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id/pay', orderController.updateOrderToPaid);

// Admin routes
router.get('/', restrictTo(), orderController.getAllOrders);
router.put('/:id/status', restrictTo(), orderController.updateOrderStatus);
router.put('/:id/approve', restrictTo(), orderController.approveOrder);

module.exports = router;
