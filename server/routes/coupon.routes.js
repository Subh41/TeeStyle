const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/authMiddleware');
const {
  getAllCoupons,
  getCouponById,
  validateCouponCode,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCouponStats
} = require('../controllers/coupon.controller');

// Public routes
router.post('/validate', validateCouponCode);

// Protected routes (admin only)
router.use(protect);
router.use(restrictTo('admin'));

router.route('/')
  .get(getAllCoupons)
  .post(createCoupon);

router.route('/stats')
  .get(getCouponStats);

router.route('/:id')
  .get(getCouponById)
  .patch(updateCoupon)
  .delete(deleteCoupon);

module.exports = router;
