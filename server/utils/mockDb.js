const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory data store
const db = {
  users: [
    {
      _id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
      addresses: [
        {
          street: '123 Admin St',
          city: 'Admin City',
          state: 'Admin State',
          zipCode: '12345',
          country: 'USA',
          isDefault: true
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  products: [],
  orders: []
};

// Mock User model
const User = {
  findOne: async (query) => {
    if (query.email) {
      return db.users.find(user => user.email === query.email);
    }
    if (query._id) {
      return db.users.find(user => user._id === query._id);
    }
    return null;
  },
  findById: async (id) => {
    return db.users.find(user => user._id === id);
  },
  create: async (userData) => {
    const newUser = {
      _id: String(db.users.length + 1),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    db.users.push(newUser);
    return newUser;
  }
};

// Mock JWT functions
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d'
  });
};

// Mock authentication controller
const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({
          success: false,
          message: 'User already exists'
        });
      }

      // Create new user
      const user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10)
      });

      // Generate token
      const token = generateToken(user._id);

      // Remove password from output
      const userResponse = { ...user };
      delete userResponse.password;

      res.status(201).json({
        success: true,
        token,
        user: userResponse
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if email and password exist
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide email and password'
        });
      }

      // Special case for admin login
      if (email === 'admin@example.com' && password === '123456') {
        // Find or create admin user
        let adminUser = await User.findOne({ email: 'admin@example.com' });
        
        if (!adminUser) {
          adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: bcrypt.hashSync('123456', 10),
            isAdmin: true
          });
        }
        
        // Generate token
        const token = generateToken(adminUser._id);
        
        // Remove password from output
        const userResponse = { ...adminUser };
        delete userResponse.password;
        
        return res.status(200).json({
          success: true,
          token,
          user: userResponse
        });
      }

      // Check if user exists
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Incorrect email or password'
        });
      }

      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Incorrect email or password'
        });
      }

      // Generate token
      const token = generateToken(user._id);

      // Remove password from output
      const userResponse = { ...user };
      delete userResponse.password;

      res.status(200).json({
        success: true,
        token,
        user: userResponse
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = {
  User,
  authController,
  db
};
