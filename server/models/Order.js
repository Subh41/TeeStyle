const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
      size: { type: String },
      color: { type: String },
      // Add comic-specific metadata
      tShirtType: { type: String },
      comicTheme: { type: String },
      heroCharacter: { type: String }
    }
  ],
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String },
    addressName: { type: String } // e.g., "Home", "Work", etc.
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit_card', 'paypal', 'stripe', 'razorpay', 'cash_on_delivery']
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
    // Additional payment gateway response data
    gateway_response: { type: Object }
  },
  // Coupon applied to this order
  coupon: {
    couponId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coupon'
    },
    code: { type: String },
    discountType: { type: String, enum: ['percentage', 'fixed'] },
    discountValue: { type: Number },
    discountAmount: { type: Number, default: 0 } // Actual amount saved
  },
  // Referral information if order came from a referral
  referral: {
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    referralCode: { type: String },
    referralDiscount: { type: Number, default: 0 }
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  discountAmount: {
    type: Number,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  // Enhanced order tracking
  tracking: {
    carrier: { type: String },
    trackingNumber: { type: String },
    trackingUrl: { type: String },
    estimatedDelivery: { type: Date },
    lastUpdated: { type: Date }
  },
  status: {
    type: String,
    required: true,
    enum: [
      'pending',
      'awaiting_approval',
      'approved',
      'processing',
      'packed',
      'shipped',
      'out_for_delivery',
      'delivered',
      'cancelled',
      'returned',
      'refunded',
      'rejected'
    ],
    default: 'awaiting_approval'
  },
  statusHistory: [
    {
      status: { type: String },
      timestamp: { type: Date, default: Date.now },
      note: { type: String },
      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  isApproved: {
    type: Boolean,
    required: true,
    default: false
  },
  approvedAt: {
    type: Date
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  adminNotes: {
    type: String
  },
  // Customer notes and feedback
  customerNotes: {
    type: String
  },
  // If customer has rated their order experience
  orderRating: {
    rating: { type: Number, min: 1, max: 5 },
    feedback: { type: String },
    ratedAt: { type: Date }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add status change to history
orderSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.statusHistory.push({
      status: this.status,
      timestamp: Date.now(),
      note: 'Status updated'
    });
  }
  next();
});

// Calculate savings (virtual field)
orderSchema.virtual('totalSavings').get(function() {
  let savings = this.discountAmount || 0;
  if (this.coupon && this.coupon.discountAmount) {
    savings += this.coupon.discountAmount;
  }
  if (this.referral && this.referral.referralDiscount) {
    savings += this.referral.referralDiscount;
  }
  return savings;
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
