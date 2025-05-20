const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// Create payment intent with Stripe
exports.createPaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.body;
    
    // Find order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Check if order belongs to user
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100), // Stripe requires amount in cents
      currency: 'usd',
      metadata: {
        orderId: order._id.toString(),
        userId: req.user.id
      }
    });
    
    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Webhook to handle Stripe events
exports.stripeWebhook = async (req, res) => {
  const signature = req.headers['stripe-signature'];
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }
  
  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    // Update order payment status
    const orderId = paymentIntent.metadata.orderId;
    
    try {
      const order = await Order.findById(orderId);
      
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.status = 'processing';
        order.paymentResult = {
          id: paymentIntent.id,
          status: paymentIntent.status,
          update_time: new Date().toISOString(),
          email_address: paymentIntent.receipt_email
        };
        
        await order.save();
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  }
  
  res.status(200).json({ received: true });
};

// Process refund
exports.processRefund = async (req, res) => {
  try {
    const { orderId, amount, reason } = req.body;
    
    // Find order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Check if order is paid
    if (!order.isPaid || !order.paymentResult || !order.paymentResult.id) {
      return res.status(400).json({
        success: false,
        message: 'Order is not paid yet'
      });
    }
    
    // Process refund through Stripe
    const refund = await stripe.refunds.create({
      payment_intent: order.paymentResult.id,
      amount: amount ? Math.round(amount * 100) : undefined, // If amount is not provided, refund the full amount
      metadata: {
        orderId: order._id.toString(),
        reason
      }
    });
    
    // Update order status
    order.status = 'cancelled';
    await order.save();
    
    res.status(200).json({
      success: true,
      refund
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
