const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'A product must have a description']
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price']
  },
  discountPrice: {
    type: Number,
    validate: {
      validator: function(val) {
        // discountPrice should be less than price
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price'
    }
  },
  category: {
    type: String,
    required: [true, 'A product must have a category'],
    enum: ['men', 'women', 'accessories', 'footwear', 'electronics']
  },
  tags: [String],
  sizes: [String],
  colors: [String],
  images: [String],
  mainImage: {
    type: String,
    required: [true, 'A product must have a main image']
  },
  stock: {
    type: Number,
    required: [true, 'A product must have stock information'],
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// Virtual property for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (!this.discountPrice) return 0;
  return Math.round(((this.price - this.discountPrice) / this.price) * 100);
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
