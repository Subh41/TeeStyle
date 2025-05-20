const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'A coupon must have a code'],
    unique: true,
    trim: true,
    uppercase: true
  },
  description: {
    type: String,
    required: [true, 'A coupon must have a description']
  },
  discountType: {
    type: String,
    required: [true, 'A coupon must have a discount type'],
    enum: ['percentage', 'fixed']
  },
  discountValue: {
    type: Number,
    required: [true, 'A coupon must have a discount value'],
    min: 0
  },
  minPurchase: {
    type: Number,
    default: 0,
    min: 0
  },
  maxDiscount: {
    type: Number,
    default: null
  },
  validFrom: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date,
    required: [true, 'A coupon must have an expiration date']
  },
  usageLimit: {
    type: Number,
    default: null // null means unlimited usage
  },
  usageCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Comic theme specific coupon
  comicTheme: {
    type: String,
    enum: [
      'Marvel Universe',
      'DC Comics',
      'Anime Superheroes',
      'Classic Comics',
      'Sci-Fi & Fantasy',
      'Video Game Characters',
      'Custom Fan Art',
      'All' // For general coupons
    ],
    default: 'All'
  },
  // First-time user, referral, seasonal, etc.
  couponType: {
    type: String,
    enum: ['standard', 'firstTime', 'referral', 'seasonal', 'birthday', 'loyalty'],
    default: 'standard'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Method to check if coupon is valid
couponSchema.methods.isValid = function() {
  const now = new Date();
  return (
    this.isActive &&
    now >= this.validFrom &&
    now <= this.validUntil &&
    (this.usageLimit === null || this.usageCount < this.usageLimit)
  );
};

// Method to apply coupon to a cart total
couponSchema.methods.applyDiscount = function(cartTotal) {
  if (!this.isValid() || cartTotal < this.minPurchase) {
    return { discountedTotal: cartTotal, discount: 0 };
  }

  let discount = 0;
  if (this.discountType === 'percentage') {
    discount = (cartTotal * this.discountValue) / 100;
    if (this.maxDiscount !== null && discount > this.maxDiscount) {
      discount = this.maxDiscount;
    }
  } else if (this.discountType === 'fixed') {
    discount = this.discountValue;
  }

  // Ensure discount doesn't exceed cart total
  if (discount > cartTotal) {
    discount = cartTotal;
  }

  return {
    discountedTotal: cartTotal - discount,
    discount: discount
  };
};

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
