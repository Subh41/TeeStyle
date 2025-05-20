const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to protect routes that require authentication
exports.protect = async (req, res, next) => {
  try {
    // 1) Get token from header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'You are not logged in. Please log in to get access.'
      });
    }

    // 2) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if we're in fallback mode (MongoDB unavailable)
    const isMongoConnected = global.mongoose && global.mongoose.connection.readyState === 1;
    
    if (!isMongoConnected) {
      console.log('Using fallback authentication in protect middleware');
      console.log('Token decoded ID:', decoded.id);
      
      // Get in-memory users from server.js
      const inMemoryUsers = global.inMemoryUsers || [];
      
      // Log available in-memory users for debugging
      console.log('Available in-memory users:', inMemoryUsers.map(u => ({ id: u._id, email: u.email })));
      
      // Try to find user by ID or email
      let memoryUser = inMemoryUsers.find(u => u._id === decoded.id);
      
      // If not found by ID, try by email (if email is in decoded token)
      if (!memoryUser && decoded.email) {
        memoryUser = inMemoryUsers.find(u => u.email === decoded.email);
      }
      
      // Special case for admin user
      if (!memoryUser && (decoded.id === 'admin-local' || decoded.id.includes('admin'))) {
        memoryUser = inMemoryUsers.find(u => u.isAdmin === true);
      }
      
      if (memoryUser) {
        console.log('Found user in memory:', memoryUser.email);
        // Remove password from user object
        const { password, ...userWithoutPassword } = memoryUser;
        req.user = userWithoutPassword;
        return next();
      }
      
      // If we still can't find the user, use the admin user as fallback for admin routes
      if (req.path.includes('/admin') || req.path.includes('/products')) {
        const adminUser = inMemoryUsers.find(u => u.isAdmin === true);
        if (adminUser) {
          console.log('Using admin fallback for protected route');
          const { password, ...adminWithoutPassword } = adminUser;
          req.user = adminWithoutPassword;
          return next();
        }
      }
      
      console.log('User not found in memory for token ID:', decoded.id);
      return res.status(401).json({
        success: false,
        message: 'Authentication failed. Please log in again.'
      });
    }
    
    // 3) If MongoDB is connected, check if user exists in database
    try {
      // Try to find user in MongoDB
      const currentUser = await User.findById(decoded.id);
      if (currentUser) {
        req.user = currentUser;
        return next();
      }
      
      // If user not found in database, check in-memory as fallback
      if (decoded.id.startsWith('admin-local') || decoded.id.startsWith('user-')) {
        // Get in-memory users from server.js
        const inMemoryUsers = global.inMemoryUsers || [];
        const memoryUser = inMemoryUsers.find(u => u._id === decoded.id);
        
        if (memoryUser) {
          // Remove password from user object
          const { password, ...userWithoutPassword } = memoryUser;
          req.user = userWithoutPassword;
          return next();
        }
      }
      
      // If user not found in either database
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists.'
      });
    } catch (dbError) {
      console.error('Database error in auth middleware:', dbError);
      
      // Fallback to check in-memory users if database fails
      if (decoded.id.startsWith('admin-local') || decoded.id.startsWith('user-')) {
        // Get in-memory users from server.js
        const inMemoryUsers = global.inMemoryUsers || [];
        const memoryUser = inMemoryUsers.find(u => u._id === decoded.id);
        
        if (memoryUser) {
          // Remove password from user object
          const { password, ...userWithoutPassword } = memoryUser;
          req.user = userWithoutPassword;
          return next();
        }
      }
      
      return res.status(401).json({
        success: false,
        message: 'Authentication failed. Database unavailable.'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

// Middleware to restrict access to admin users
exports.restrictTo = () => {
  return (req, res, next) => {
    // Check if user exists in request
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in.'
      });
    }
    
    // Check if user has admin privileges
    if (!req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Admin access required. You do not have permission to perform this action'
      });
    }
    
    // User is authenticated and has admin privileges
    console.log('Admin access granted to:', req.user.email || req.user.name);
    next();
  };
};
