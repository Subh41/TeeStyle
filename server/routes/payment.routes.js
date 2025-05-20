const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const { protect, restrictTo } = require('../middleware/auth');

// Protected routes
router.post('/create-payment-intent', protect, paymentController.createPaymentIntent);

// Admin routes
router.post('/refund', protect, restrictTo('admin'), paymentController.processRefund);

// Webhook route (unprotected)
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.stripeWebhook);

module.exports = router;
