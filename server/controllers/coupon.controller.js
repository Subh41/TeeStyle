const Coupon = require('../models/Coupon');
const { catchAsync } = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Get all coupons (admin only)
exports.getAllCoupons = catchAsync(async (req, res) => {
  const coupons = await Coupon.find();

  res.status(200).json({
    status: 'success',
    results: coupons.length,
    data: {
      coupons
    }
  });
});

// Get single coupon by ID (admin only)
exports.getCouponById = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new AppError('No coupon found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      coupon
    }
  });
});

// Validate coupon code (for users)
exports.validateCouponCode = catchAsync(async (req, res, next) => {
  const { code } = req.body;
  
  if (!code) {
    return next(new AppError('Please provide a coupon code', 400));
  }

  const coupon = await Coupon.findOne({ code: code.toUpperCase() });

  if (!coupon) {
    return next(new AppError('Invalid coupon code', 404));
  }

  if (!coupon.isValid()) {
    return next(new AppError('This coupon is expired or inactive', 400));
  }

  // If coupon is specific to a comic theme, check if cart contains items from that theme
  if (coupon.comicTheme !== 'All' && req.body.cartItems) {
    const hasMatchingItem = req.body.cartItems.some(item => 
      item.comicTheme === coupon.comicTheme
    );
    
    if (!hasMatchingItem) {
      return next(new AppError(`This coupon is only valid for ${coupon.comicTheme} items`, 400));
    }
  }

  // Apply discount calculation
  let cartTotal = req.body.cartTotal || 0;
  const { discountedTotal, discount } = coupon.applyDiscount(cartTotal);

  res.status(200).json({
    status: 'success',
    data: {
      coupon,
      discount,
      discountedTotal,
      original: cartTotal
    }
  });
});

// Create new coupon (admin only)
exports.createCoupon = catchAsync(async (req, res, next) => {
  // Ensure discount value is reasonable
  if (req.body.discountType === 'percentage' && req.body.discountValue > 100) {
    return next(new AppError('Percentage discount cannot exceed 100%', 400));
  }

  // Convert code to uppercase
  if (req.body.code) {
    req.body.code = req.body.code.toUpperCase();
  }

  const newCoupon = await Coupon.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      coupon: newCoupon
    }
  });
});

// Update coupon (admin only)
exports.updateCoupon = catchAsync(async (req, res, next) => {
  // Prevent changing code to avoid conflicts
  if (req.body.code) {
    req.body.code = req.body.code.toUpperCase();
  }

  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!coupon) {
    return next(new AppError('No coupon found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      coupon
    }
  });
});

// Delete coupon (admin only)
exports.deleteCoupon = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.id);

  if (!coupon) {
    return next(new AppError('No coupon found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Get coupon usage statistics (admin only)
exports.getCouponStats = catchAsync(async (req, res) => {
  const stats = await Coupon.aggregate([
    {
      $group: {
        _id: { discountType: '$discountType' },
        count: { $sum: 1 },
        avgDiscount: { $avg: '$discountValue' },
        totalUsage: { $sum: '$usageCount' }
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});
