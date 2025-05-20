const mongoose = require('mongoose');
const User = require('../models/User');

// Get Product model if it exists, otherwise get it from mongoose models
let Product;
try {
  // Try to get existing model first
  Product = mongoose.model('Product');
} catch (error) {
  // If model doesn't exist yet, require it
  Product = require('../models/productModel');
}

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    // Check for fallback mode
    if (!mongoose.connection.readyState === 1) {
      return res.status(200).json([]);
    }

    const user = await User.findById(req.user._id).populate({
      path: 'wishlist',
      select: '_id name price discountPrice mainImage'
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.wishlist || []);
  } catch (error) {
    console.error('Error in getWishlist:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Add product to wishlist
// @route   POST /api/wishlist
// @access  Private
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check for fallback mode
    if (!mongoose.connection.readyState === 1) {
      return res.status(200).json([]);
    }

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find user and update wishlist
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Initialize wishlist array if it doesn't exist
    if (!user.wishlist) {
      user.wishlist = [];
    }

    // Check if product is already in wishlist
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    // Add product to wishlist
    user.wishlist.push(productId);
    await user.save();

    // Return updated wishlist with product details
    const updatedUser = await User.findById(req.user._id).populate({
      path: 'wishlist',
      select: '_id name price discountPrice mainImage'
    });

    res.status(200).json(updatedUser.wishlist);
  } catch (error) {
    console.error('Error in addToWishlist:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    // Check for fallback mode
    if (!mongoose.connection.readyState === 1) {
      return res.status(200).json([]);
    }

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Find user and update wishlist
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if product is in wishlist
    if (!user.wishlist || !user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Product not in wishlist' });
    }

    // Remove product from wishlist
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();

    // Return updated wishlist with product details
    const updatedUser = await User.findById(req.user._id).populate({
      path: 'wishlist',
      select: '_id name price discountPrice mainImage'
    });

    res.status(200).json(updatedUser.wishlist);
  } catch (error) {
    console.error('Error in removeFromWishlist:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist
};
