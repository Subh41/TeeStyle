require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS to allow requests from the client
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://127.0.0.1:51028', 'https://tee-style.vercel.app', 'https://teestyle.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Add pre-flight OPTIONS response for all routes
app.options('*', cors());

app.use(morgan('dev'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes (to be implemented)
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/cart', require('./routes/cart.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/payment', require('./routes/payment.routes'));
app.use('/api/wishlist', require('./routes/wishlist.routes'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// MongoDB Connection Setup
console.log('Initializing database connection...');

// Set up mongoose connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Longer timeout for reliable connection
  socketTimeoutMS: 60000,
  family: 4, // Use IPv4, skip trying IPv6
  connectTimeoutMS: 30000, // Longer timeout for connection attempts
  keepAlive: true,
  keepAliveInitialDelay: 300000 // 5 minutes
};

// Create a variable to track connection status
let isConnectedToMongoDB = false;

// Start the server first to avoid blocking
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// In-memory user store for fallback authentication
global.inMemoryUsers = [
  {
    _id: 'admin-local',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$12$oMT7lXb3v0XvRQzC5EGDzOiF9cMDwPVnK3WUyEEXxFEHGV0uYCJJC', // Admin@123456
    isAdmin: true
  }
];

// Local reference for convenience
const inMemoryUsers = global.inMemoryUsers;

// Local authentication function for fallback
const localAuthenticate = async (email, password) => {
  const user = inMemoryUsers.find(u => u.email === email);
  if (!user) return null;
  
  // Use bcrypt to compare passwords
  const bcrypt = require('bcryptjs');
  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) return null;
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Add a middleware to handle database connection issues
app.use(async (req, res, next) => {
  // Skip connection check for static files
  if (req.path.startsWith('/images/') || req.path.includes('.png') || req.path.includes('.jpg')) {
    return next();
  }
  
  // If we're connected to MongoDB, proceed normally
  if (isConnectedToMongoDB || mongoose.connection.readyState === 1) {
    return next();
  }
  
  // Handle authentication endpoints with fallback
  if (req.path === '/api/auth/login' && req.method === 'POST') {
    try {
      const { email, password } = req.body;
      const user = await localAuthenticate(email, password);
      
      if (user) {
        console.log('Local authentication successful for:', email);
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        
        return res.status(200).json({
          success: true,
          token,
          user
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
    } catch (error) {
      console.error('Local authentication error:', error);
      return res.status(500).json({
        success: false,
        message: 'Authentication error'
      });
    }
  }
  
  // Handle registration with fallback
  if (req.path === '/api/auth/register' && req.method === 'POST') {
    try {
      const { name, email, password } = req.body;
      
      // Check if user already exists in memory
      if (inMemoryUsers.some(u => u.email === email)) {
        return res.status(400).json({
          success: false,
          message: 'User already exists'
        });
      }
      
      // Create new user
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = {
        _id: `user-${Date.now()}`,
        name,
        email,
        password: hashedPassword,
        isAdmin: false
      };
      
      // Add to in-memory store
      inMemoryUsers.push(newUser);
      
      // Create token
      const jwt = require('jsonwebtoken');
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = newUser;
      
      return res.status(201).json({
        success: true,
        token,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Local registration error:', error);
      return res.status(500).json({
        success: false,
        message: 'Registration error'
      });
    }
  }
  
  // For product-related endpoints, return mock data
  if (req.path.startsWith('/api/products')) {
    if (req.method === 'GET') {
      return res.status(200).json({
        success: true,
        products: [],
        count: 0,
        total: 0,
        totalPages: 0,
        currentPage: 1
      });
    }
  }
  
  // Allow all API requests to proceed in fallback mode
  // We'll handle fallback logic in individual controllers
  if (req.path.startsWith('/api/')) {
    console.log('Using fallback mode for:', req.path);
    // Just log the fallback mode, but allow the request to proceed
    // Don't block API requests anymore
  }
  
  next();
});

// Function to connect to MongoDB Atlas
const connectToMongoDBAtlas = () => {
  console.log('Attempting to connect to MongoDB Atlas...');
  global.mongoose = mongoose;
  const ATLAS_URI = 'mongodb+srv://subh:<PASSWORD>@cluster0.mkoolxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  mongoose.connect(ATLAS_URI, mongooseOptions)
    .then(async () => {
      console.log('Connected to MongoDB Atlas successfully');
      isConnectedToMongoDB = true;
      
      // Import ensure admin function
      const ensureAdminExists = require('./utils/ensureAdmin');
      
      // Ensure admin user exists
      await ensureAdminExists();
    })
    .catch(err => {
      console.error('MongoDB Atlas connection error:', err);
      console.log('Falling back to local MongoDB...');
      connectToLocalMongoDB();
    });
};

// Function to connect to local MongoDB as fallback
const connectToLocalMongoDB = () => {
  console.log('Attempting to connect to local MongoDB...');
  mongoose.connect(process.env.MONGO_URI, mongooseOptions)
    .then(async () => {
      console.log('Connected to local MongoDB successfully');
      isConnectedToMongoDB = true;
      
      // Import ensure admin function
      const ensureAdminExists = require('./utils/ensureAdmin');
      
      // Ensure admin user exists
      await ensureAdminExists();
    })
    .catch(err => {
      console.error('Local MongoDB connection error:', err);
      console.log('Falling back to in-memory mode only...');
    });
};

// Initial connection attempt to MongoDB Atlas
connectToMongoDBAtlas();