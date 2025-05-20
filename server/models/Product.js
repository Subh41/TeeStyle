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
  // T-Shirt type categories
  tShirtType: {
    type: String,
    required: [true, 'A product must have a t-shirt type'],
    enum: [
      'Oversized',
      'Acid Wash',
      'Graphic Printed',
      'Solid Color',
      'Polo T-Shirts',
      'Sleeveless',
      'Long Sleeve',
      'Henley',
      'Hooded',
      'Crop Tops'
    ]
  },
  // Comic-based theme categories
  comicTheme: {
    type: String,
    required: [true, 'A product must have a comic theme'],
    enum: [
      'Marvel Universe',
      'DC Comics',
      'Anime Superheroes',
      'Classic Comics',
      'Sci-Fi & Fantasy',
      'Video Game Characters',
      'Custom Fan Art'
    ]
  },
  gender: {
    type: String,
    required: [true, 'A product must specify a gender category'],
    enum: ['men', 'women', 'unisex']
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
  // Additional fields for the superhero theme
  heroCharacter: {
    type: String,
    trim: true
  },
  universe: {
    type: String,
    trim: true
  },
  limitedEdition: {
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
