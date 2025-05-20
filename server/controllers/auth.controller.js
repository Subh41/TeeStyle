const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

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

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Find user and update
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      user: updatedUser
    });
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
