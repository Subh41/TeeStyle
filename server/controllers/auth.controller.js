const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library');
const Coupon = require('../models/Coupon');

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT token
const signToken = (id, email, isAdmin = false) => {
  return jwt.sign({ id, email, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Try fallback registration if MongoDB is not connected
    if (global.inMemoryUsers && (mongoose.connection.readyState !== 1)) {
      console.log('Using fallback registration for:', email);
      
      // Check if user already exists in memory
      if (global.inMemoryUsers.some(u => u.email === email)) {
        return res.status(400).json({
          success: false,
          message: 'User already exists'
        });
      }
      
      // Create new user in memory
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const userId = `user-${Date.now()}`;
      const newUser = {
        _id: userId,
        name,
        email,
        password: hashedPassword,
        isAdmin: false
      };
      
      global.inMemoryUsers.push(newUser);
      
      // Generate token with email and isAdmin
      const token = signToken(userId, email, false);
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = newUser;
      
      return res.status(201).json({
        success: true,
        token,
        user: userWithoutPassword
      });
    }

    // If MongoDB is connected, try database registration
    try {
      // Check if user already exists in database
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'User already exists'
        });
      }

      // Create new user in database
      const user = await User.create({
        name,
        email,
        password
      });

      // Generate token
      const token = signToken(user._id);

      // Remove password from output
      user.password = undefined;

      return res.status(201).json({
        success: true,
        token,
        user
      });
    } catch (dbError) {
      console.error('Database registration error:', dbError);
      return res.status(500).json({
        success: false,
        message: 'Registration failed. Database unavailable.'
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred during registration'
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Try fallback authentication first if MongoDB is not connected
    if (global.inMemoryUsers && (mongoose.connection.readyState !== 1)) {
      console.log('Using fallback authentication for:', email);
      
      // Find user in memory
      const inMemoryUser = global.inMemoryUsers.find(u => u.email === email);
      
      if (inMemoryUser) {
        // Verify password
        const bcrypt = require('bcryptjs');
        const isMatch = await bcrypt.compare(password, inMemoryUser.password);
        
        if (isMatch) {
          // Generate token with email and isAdmin
          const token = signToken(inMemoryUser._id, inMemoryUser.email, inMemoryUser.isAdmin);
          
          // Return user without password
          const { password: _, ...userWithoutPassword } = inMemoryUser;
          
          return res.status(200).json({
            success: true,
            token,
            user: userWithoutPassword
          });
        }
      }
      
      // Special case for admin login
      if (email === 'admin@example.com' && password === 'Admin@123456') {
        console.log('Admin login with hardcoded credentials');
        
        // Create admin user
        const adminUser = {
          _id: 'admin-local-' + Date.now(),
          name: 'Admin User',
          email: 'admin@example.com',
          isAdmin: true
        };
        
        // Generate token with email and isAdmin flag
        const token = signToken(adminUser._id, adminUser.email, true);
        
        // Add to in-memory users if not already there
        if (!global.inMemoryUsers.find(u => u.email === 'admin@example.com')) {
          global.inMemoryUsers.push({
            ...adminUser,
            password: '$2a$12$oMT7lXb3v0XvRQzC5EGDzOiF9cMDwPVnK3WUyEEXxFEHGV0uYCJJC' // Admin@123456
          });
        }
        
        // Log admin login for debugging
        console.log('Admin logged in with ID:', adminUser._id);
        
        return res.status(200).json({
          success: true,
          token,
          user: adminUser
        });
      }
    }

    // If fallback didn't work or MongoDB is connected, try database
    try {
      // Find user by email in database
      const user = await User.findOne({ email }).select('+password');
      
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({
          success: false,
          message: 'Incorrect email or password'
        });
      }

      // Generate token
      const token = signToken(user._id);

      // Remove password from output
      user.password = undefined;

      return res.status(200).json({
        success: true,
        token,
        user
      });
    } catch (dbError) {
      console.error('Database login error:', dbError);
      
      // If we reach here and haven't returned yet, authentication failed
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login'
    });
  }
};

// Get current user profile
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Google Login functionality
exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;
    
    if (!tokenId) {
      return res.status(400).json({
        success: false,
        message: 'Google token ID is required'
      });
    }

    // Verify the Google token
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const { email_verified, name, email, picture } = response.payload;
    
    if (!email_verified) {
      return res.status(400).json({
        success: false,
        message: 'Google email not verified'
      });
    }
    
    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (user) {
      // User exists, log them in
      const token = signToken(user._id, user.email, user.role === 'admin');
      
      return res.status(200).json({
        success: true,
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar || picture,
          superheroAvatar: user.superheroAvatar
        }
      });
    } else {
      // Create new user with Google info
      const newUser = new User({
        name,
        email,
        googleId: response.payload.sub,
        avatar: picture,
        role: 'user',
        // No password required for Google login
      });
      
      await newUser.save();
      
      const token = signToken(newUser._id, newUser.email, false);
      
      return res.status(201).json({
        success: true,
        token,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          avatar: newUser.avatar,
          superheroAvatar: newUser.superheroAvatar
        }
      });
    }
  } catch (error) {
    console.error('Google login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Google authentication failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
    });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      // Only allow email update for non-Google users
      if (!user.googleId) {
        user.email = req.body.email || user.email;
      }

      // Update superhero avatar if provided
      if (req.body.superheroAvatar) {
        user.superheroAvatar = {
          ...user.superheroAvatar,
          ...req.body.superheroAvatar
        };
      }

      // Update avatar URL if provided
      if (req.body.avatar) {
        user.avatar = req.body.avatar;
      }

      // Update notification preferences if provided
      if (req.body.notifications) {
        user.notifications = {
          ...user.notifications,
          ...req.body.notifications
        };
      }

      // Update password only for non-Google users
      if (req.body.password && !user.googleId) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        success: true,
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          avatar: updatedUser.avatar,
          superheroAvatar: updatedUser.superheroAvatar,
          notifications: updatedUser.notifications,
          referralCode: updatedUser.referralCode,
          isAdmin: updatedUser.role === 'admin'
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add user address
exports.addAddress = async (req, res) => {
  try {
    const { street, city, state, zipCode, country, isDefault } = req.body;
    
    const user = await User.findById(req.user.id);
    
    // If this address is set as default, unset any existing default
    if (isDefault) {
      user.addresses.forEach(addr => {
        addr.isDefault = false;
      });
    }
    
    // Add new address
    user.addresses.push({
      street,
      city,
      state,
      zipCode,
      country,
      isDefault: isDefault || false
    });
    
    await user.save();
    
    res.status(200).json({
      success: true,
      addresses: user.addresses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
