require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    
    try {
      // Import the User model
      const User = require('../models/userModel');
      
      // Check if admin user already exists
      const adminExists = await User.findOne({ email: 'admin@example.com' });
      
      if (adminExists) {
        console.log('Admin user already exists');
      } else {
        // Create admin user
        const adminUser = new User({
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
          ]
        });
        
        await adminUser.save();
        console.log('Admin user created successfully!');
      }
      
      process.exit(0);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
