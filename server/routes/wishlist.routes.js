const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  getWishlist,
  addToWishlist,
  removeFromWishlist
} = require('../controllers/wishlist.controller');

// Get user's wishlist
router.get('/', protect, getWishlist);

// Add item to wishlist
router.post('/', protect, addToWishlist);

// Remove item from wishlist
router.delete('/:productId', protect, removeFromWishlist);

module.exports = router;
