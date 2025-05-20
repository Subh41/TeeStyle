const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { 
      shippingAddress, 
      paymentMethod 
    } = req.body;
    
    // Get user's cart
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: 'items.product',
      select: 'name price discountPrice mainImage stock'
    });
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }
    
    // Calculate prices
    const itemsPrice = cart.totalPrice;
    const taxPrice = itemsPrice * 0.15;
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;
    
    // Create order items from cart
    const orderItems = cart.items.map(item => {
      return {
        product: item.product._id,
        name: item.product.name,
        image: item.product.mainImage,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      };
    });
    
    // Create order
    const order = await Order.create({
      user: req.user.id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      status: 'awaiting_approval',
      isApproved: false
    });
    
    // Update product stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      product.stock -= item.quantity;
      await product.save();
    }
    
    // Clear cart after order is created
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    
    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate({
      path: 'user',
      select: 'name email'
    });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Check if order belongs to user or user is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }
    
    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get logged in user orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update order to paid
exports.updateOrderToPaid = async (req, res) => {
  try {
    const { paymentResult } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = paymentResult;
    order.status = 'processing';
    
    const updatedOrder = await order.save();
    
    res.status(200).json({
      success: true,
      order: updatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    order.status = status;
    
    // If status is delivered, update delivered status
    if (status === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }
    
    // If admin notes provided, update them
    if (adminNotes) {
      order.adminNotes = adminNotes;
    }
    
    const updatedOrder = await order.save();
    
    res.status(200).json({
      success: true,
      order: updatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate({
        path: 'user',
        select: 'name email'
      })
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Approve or reject an order (Admin only)
exports.approveOrder = async (req, res) => {
  try {
    const { approved, adminNotes } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Update order approval status
    order.isApproved = approved;
    order.approvedAt = Date.now();
    order.approvedBy = req.user.id;
    
    if (adminNotes) {
      order.adminNotes = adminNotes;
    }
    
    // Update order status based on approval
    if (approved) {
      order.status = 'approved';
      
      // If order is already paid, move to processing
      if (order.isPaid) {
        order.status = 'processing';
      }
    } else {
      order.status = 'rejected';
    }
    
    const updatedOrder = await order.save();
    
    res.status(200).json({
      success: true,
      message: approved ? 'Order approved successfully' : 'Order rejected',
      order: updatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
