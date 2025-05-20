const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { protect, restrictTo } = require('../middleware/auth');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/:id', productController.getProduct);

// Admin routes
router.post('/', protect, restrictTo(), productController.createProduct);
router.put('/:id', protect, restrictTo(), productController.updateProduct);
router.delete('/:id', protect, restrictTo(), productController.deleteProduct);

module.exports = router;
