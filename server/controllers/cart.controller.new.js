const Cart = require('../models/Cart');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

// In-memory cart store
if (!global.inMemoryCarts) {
  global.inMemoryCarts = [];
}

// Make sure in-memory products exist
if (!global.inMemoryProducts) {
  global.inMemoryProducts = [];
}

// Get user cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    
    // Check if MongoDB is connected
    if (!isMongoConnected()) {
      console.log('Using fallback cart for user:', userId);
      
      // Find cart in memory
      let cart = global.inMemoryCarts.find(cart => cart.user === userId);
      
      // If no cart found, create one
      if (!cart) {
        cart = {
          _id: `cart-${Date.now()}`,
          user: userId,
          items: [],
          totalPrice: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        global.inMemoryCarts.push(cart);
      }
      
      // Populate product details from in-memory products
      if (cart.items && cart.items.length > 0) {
        cart.items = cart.items.map(item => {
          const product = global.inMemoryProducts.find(p => p._id === item.product);
          if (product) {
            return {
              ...item,
              product: {
                _id: product._id,
                name: product.name,
                price: product.price,
                discountPrice: product.discountPrice,
                mainImage: product.mainImage,
                stock: product.stock
              }
            };
          }
          return item;
        });
      }
      
      return res.status(200).json({
        success: true,
        cart
      });
    }
    
    // If MongoDB is connected, proceed with normal database query
    try {
      let cart = await Cart.findOne({ user: userId }).populate({
        path: 'items.product',
        select: 'name price discountPrice mainImage stock'
      });
      
      if (!cart) {
        cart = await Cart.create({
          user: userId,
          items: [],
          totalPrice: 0
        });
      }
      
      return res.status(200).json({
        success: true,
        cart
      });
    } catch (dbError) {
      console.error('Database error in getCart:', dbError);
      
      // Fallback to in-memory if database operation fails
      let cart = global.inMemoryCarts.find(cart => cart.user === userId);
      
      // If no cart found, create one
      if (!cart) {
        cart = {
          _id: `cart-${Date.now()}`,
          user: userId,
          items: [],
          totalPrice: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        global.inMemoryCarts.push(cart);
      }
      
      return res.status(200).json({
        success: true,
        cart
      });
    }
  } catch (error) {
    console.error('Cart controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving cart'
    });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body;
    const userId = req.user.id || req.user._id;
    const parsedQuantity = parseInt(quantity) || 1;
    
    // Check if MongoDB is connected
    if (!isMongoConnected()) {
      console.log('Using fallback addToCart for user:', userId);
      
      // Find product in memory
      const product = global.inMemoryProducts.find(p => p._id === productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      if (product.stock < parsedQuantity) {
        return res.status(400).json({
          success: false,
          message: 'Not enough stock available'
        });
      }
      
      // Find cart in memory
      let cart = global.inMemoryCarts.find(cart => cart.user === userId);
      
      // If no cart found, create one
      if (!cart) {
        cart = {
          _id: `cart-${Date.now()}`,
          user: userId,
          items: [],
          totalPrice: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        global.inMemoryCarts.push(cart);
      }
      
      // Find item in cart
      const itemIndex = cart.items.findIndex(item => 
        item.product === productId && 
        item.size === size && 
        item.color === color
      );
      
      // If product exists in cart, update quantity
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += parsedQuantity;
      } else {
        // Add new item to cart
        const price = product.discountPrice || product.price;
        cart.items.push({
          _id: `item-${Date.now()}`,
          product: productId,
          quantity: parsedQuantity,
          price,
          size,
          color
        });
      }
      
      // Recalculate total price
      cart.totalPrice = cart.items.reduce((total, item) => {
        return total + (parseFloat(item.price) * parseInt(item.quantity));
      }, 0);
      
      // Update cart's updatedAt timestamp
      cart.updatedAt = new Date();
      
      return res.status(200).json({
        success: true,
        cart
      });
    } else {
      // MongoDB is connected, proceed with database operations
      try {
        // Find the product
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({
            success: false,
            message: 'Product not found'
          });
        }
        
        // Check stock availability
        if (product.stock < parsedQuantity) {
          return res.status(400).json({
            success: false,
            message: 'Not enough stock available'
          });
        }
        
        // Find user's cart
        let cart = await Cart.findOne({ user: userId });
        
        // If no cart exists, create a new one
        if (!cart) {
          cart = new Cart({
            user: userId,
            items: [],
            totalPrice: 0
          });
        }
        
        // Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(item => 
          item.product.toString() === productId && 
          item.size === size && 
          item.color === color
        );
        
        const price = product.discountPrice || product.price;
        
        if (existingItemIndex !== -1) {
          // Update existing item
          cart.items[existingItemIndex].quantity += parsedQuantity;
        } else {
          // Add new item to cart
          cart.items.push({
            product: productId,
            quantity: parsedQuantity,
            price,
            size,
            color
          });
        }
        
        // Recalculate total price
        cart.totalPrice = cart.items.reduce((total, item) => {
          return total + (parseFloat(item.price) * parseInt(item.quantity));
        }, 0);
        
        // Save cart to database
        await cart.save();
        
        // Populate product details
        await cart.populate({
          path: 'items.product',
          select: 'name price discountPrice mainImage stock'
        });
        
        return res.status(200).json({
          success: true,
          cart
        });
      } catch (dbError) {
        console.error('Database error in addToCart:', dbError);
        
        // Fallback to in-memory if database operation fails
        const product = global.inMemoryProducts.find(p => p._id === productId);
        if (!product) {
          return res.status(404).json({
            success: false,
            message: 'Product not found'
          });
        }
        
        // Find cart in memory
        let cart = global.inMemoryCarts.find(cart => cart.user === userId);
        
        // If no cart found, create one
        if (!cart) {
          cart = {
            _id: `cart-${Date.now()}`,
            user: userId,
            items: [],
            totalPrice: 0,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          global.inMemoryCarts.push(cart);
        }
        
        // Add item to cart
        const price = product.discountPrice || product.price;
        cart.items.push({
          _id: `item-${Date.now()}`,
          product: productId,
          quantity: parsedQuantity,
          price,
          size,
          color
        });
        
        // Recalculate total price
        cart.totalPrice = cart.items.reduce((total, item) => {
          return total + (parseFloat(item.price) * parseInt(item.quantity));
        }, 0);
        
        return res.status(200).json({
          success: true,
          cart
        });
      }
    }
  } catch (error) {
    console.error('Cart controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding item to cart'
    });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const userId = req.user.id || req.user._id;
    const parsedQuantity = parseInt(quantity) || 1;
    
    // Check if MongoDB is connected
    if (!isMongoConnected()) {
      console.log('Using fallback updateCartItem for user:', userId);
      
      // Find cart in memory
      let cart = global.inMemoryCarts.find(cart => cart.user === userId);
      
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart not found'
        });
      }
      
      // Find item in cart
      const itemIndex = cart.items.findIndex(item => item._id === itemId);
      
      if (itemIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Item not found in cart'
        });
      }
      
      // Update quantity
      cart.items[itemIndex].quantity = parsedQuantity;
      
      // Recalculate total price
      cart.totalPrice = cart.items.reduce((total, item) => {
        return total + (parseFloat(item.price) * parseInt(item.quantity));
      }, 0);
      
      // Update cart's updatedAt timestamp
      cart.updatedAt = new Date();
      
      return res.status(200).json({
        success: true,
        cart
      });
    } else {
      // MongoDB is connected, proceed with database operations
      try {
        // Find user's cart
        let cart = await Cart.findOne({ user: userId });
        
        if (!cart) {
          return res.status(404).json({
            success: false,
            message: 'Cart not found'
          });
        }
        
        // Find item in cart
        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
        
        if (itemIndex === -1) {
          return res.status(404).json({
            success: false,
            message: 'Item not found in cart'
          });
        }
        
        // Check product stock
        const product = await Product.findById(cart.items[itemIndex].product);
        
        if (!product) {
          return res.status(404).json({
            success: false,
            message: 'Product not found'
          });
        }
        
        if (product.stock < parsedQuantity) {
          return res.status(400).json({
            success: false,
            message: 'Not enough stock available'
          });
        }
        
        // Update quantity
        cart.items[itemIndex].quantity = parsedQuantity;
        
        // Recalculate total price
        cart.totalPrice = cart.items.reduce((total, item) => {
          return total + (parseFloat(item.price) * parseInt(item.quantity));
        }, 0);
        
        // Save cart to database
        await cart.save();
        
        // Populate product details
        await cart.populate({
          path: 'items.product',
          select: 'name price discountPrice mainImage stock'
        });
        
        return res.status(200).json({
          success: true,
          cart
        });
      } catch (dbError) {
        console.error('Database error in updateCartItem:', dbError);
        
        // Fallback to in-memory if database operation fails
        let cart = global.inMemoryCarts.find(cart => cart.user === userId);
        
        if (!cart) {
          return res.status(404).json({
            success: false,
            message: 'Cart not found'
          });
        }
        
        // Find item in cart
        const itemIndex = cart.items.findIndex(item => item._id === itemId);
        
        if (itemIndex === -1) {
          return res.status(404).json({
            success: false,
            message: 'Item not found in cart'
          });
        }
        
        // Update quantity
        cart.items[itemIndex].quantity = parsedQuantity;
        
        // Recalculate total price
        cart.totalPrice = cart.items.reduce((total, item) => {
          return total + (parseFloat(item.price) * parseInt(item.quantity));
        }, 0);
        
        // Update cart's updatedAt timestamp
        cart.updatedAt = new Date();
        
        return res.status(200).json({
          success: true,
          cart
        });
      }
    }
  } catch (error) {
    console.error('Cart controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating cart item'
    });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.id || req.user._id;
    
    // Check if MongoDB is connected
    if (!isMongoConnected()) {
      console.log('Using fallback removeFromCart for user:', userId);
      
      // Find cart in memory
      let cart = global.inMemoryCarts.find(cart => cart.user === userId);
      
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart not found'
        });
      }
      
      // Remove item from cart
      cart.items = cart.items.filter(item => item._id !== itemId);
      
      // Recalculate total price
      cart.totalPrice = cart.items.reduce((total, item) => {
        return total + (parseFloat(item.price) * parseInt(item.quantity));
      }, 0);
      
      // Update cart's updatedAt timestamp
      cart.updatedAt = new Date();
      
      return res.status(200).json({
        success: true,
        cart
      });
    } else {
      // MongoDB is connected, proceed with database operations
      try {
        // Find user's cart
        let cart = await Cart.findOne({ user: userId });
        
        if (!cart) {
          return res.status(404).json({
            success: false,
            message: 'Cart not found'
          });
        }
        
        // Remove item from cart
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        
        // Recalculate total price
        cart.totalPrice = cart.items.reduce((total, item) => {
          return total + (parseFloat(item.price) * parseInt(item.quantity));
        }, 0);
        
        // Save cart to database
        await cart.save();
        
        // Populate product details
        await cart.populate({
          path: 'items.product',
          select: 'name price discountPrice mainImage stock'
        });
        
        return res.status(200).json({
          success: true,
          cart
        });
      } catch (dbError) {
        console.error('Database error in removeFromCart:', dbError);
        
        // Fallback to in-memory if database operation fails
        let cart = global.inMemoryCarts.find(cart => cart.user === userId);
        
        if (!cart) {
          return res.status(404).json({
            success: false,
            message: 'Cart not found'
          });
        }
        
        // Remove item from cart
        cart.items = cart.items.filter(item => item._id !== itemId);
        
        // Recalculate total price
        cart.totalPrice = cart.items.reduce((total, item) => {
          return total + (parseFloat(item.price) * parseInt(item.quantity));
        }, 0);
        
        // Update cart's updatedAt timestamp
        cart.updatedAt = new Date();
        
        return res.status(200).json({
          success: true,
          cart
        });
      }
    }
  } catch (error) {
    console.error('Cart controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Error removing item from cart'
    });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    
    // Check if MongoDB is connected
    if (!isMongoConnected()) {
      console.log('Using fallback clearCart for user:', userId);
      
      // Find cart in memory
      let cart = global.inMemoryCarts.find(cart => cart.user === userId);
      
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart not found'
        });
      }
      
      // Clear cart items
      cart.items = [];
      cart.totalPrice = 0;
      
      // Update cart's updatedAt timestamp
      cart.updatedAt = new Date();
      
      return res.status(200).json({
        success: true,
        message: 'Cart cleared successfully',
        cart
      });
    } else {
      // MongoDB is connected, proceed with database operations
      try {
        // Find user's cart
        let cart = await Cart.findOne({ user: userId });
        
        if (!cart) {
          return res.status(404).json({
            success: false,
            message: 'Cart not found'
          });
        }
        
        // Clear cart items
        cart.items = [];
        cart.totalPrice = 0;
        
        // Save cart to database
        await cart.save();
        
        return res.status(200).json({
          success: true,
          message: 'Cart cleared successfully',
          cart
        });
      } catch (dbError) {
        console.error('Database error in clearCart:', dbError);
        
        // Fallback to in-memory if database operation fails
        let cart = global.inMemoryCarts.find(cart => cart.user === userId);
        
        if (!cart) {
          return res.status(404).json({
            success: false,
            message: 'Cart not found'
          });
        }
        
        // Clear cart items
        cart.items = [];
        cart.totalPrice = 0;
        
        // Update cart's updatedAt timestamp
        cart.updatedAt = new Date();
        
        return res.status(200).json({
          success: true,
          message: 'Cart cleared successfully',
          cart
        });
      }
    }
  } catch (error) {
    console.error('Cart controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Error clearing cart'
    });
  }
};
