const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, {
  timestamps: true
});

// Create index for quick user lookup
wishlistSchema.index({ user: 1 });

// Limit products shown to last 20 added (most recent first)
wishlistSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'products.product',
    select: 'name price mainImage tShirtType comicTheme heroCharacter'
  });
  next();
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
