const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    // Not required for Google OAuth users
    required: function() {
      return !this.googleId; // Password is required only if googleId doesn't exist
    },
    minlength: 6,
    select: false
  },
  // Google OAuth fields
  googleId: {
    type: String,
    unique: true,
    sparse: true // Allows null values and ensures uniqueness only for non-null values
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  // Superhero avatar feature
  avatar: {
    type: String, // URL to avatar image
    default: ''
  },
  superheroAvatar: {
    character: {
      type: String,
      default: ''
    },
    universe: {
      type: String,
      enum: ['Marvel', 'DC', 'Anime', 'Other'],
      default: 'Other'
    },
    customizations: {
      type: Map,
      of: String,
      default: {}
    }
  },
  addresses: [
    {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      isDefault: {
        type: Boolean,
        default: false
      }
    }
  ],
  // Notification preferences
  notifications: {
    email: {
      type: Boolean,
      default: true
    },
    orderUpdates: {
      type: Boolean,
      default: true
    },
    discounts: {
      type: Boolean,
      default: true
    }
  },
  // Referral program
  referralCode: {
    type: String,
    unique: true,
    sparse: true
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  referralCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash the password before saving (only if password is provided and modified)
userSchema.pre('save', async function(next) {
  // Skip if password is not modified or doesn't exist (Google auth)
  if (!this.password || !this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Generate unique referral code
userSchema.pre('save', function(next) {
  if (this.isNew && !this.referralCode) {
    // Generate a unique referral code based on name and random string
    const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.referralCode = `${this.name.substring(0, 3).toUpperCase()}-${randomString}`;
  }
  next();
});

// Method to check if password is correct
userSchema.methods.correctPassword = async function(candidatePassword) {
  if (!this.password) return false; // For Google users without password
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
