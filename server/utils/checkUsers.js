require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    
    try {
      // Import the User model
      const User = require('../models/User');
      
      // Check if any users exist
      const users = await User.find({});
      console.log(`Total users in database: ${users.length}`);
      
      if (users.length > 0) {
        console.log('Users found in database:');
        users.forEach(user => {
          console.log(`- ${user.name} (${user.email}) - Admin: ${user.isAdmin}`);
        });
      } else {
        console.log('No users found in database. Creating admin user...');
        
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
      
      process.exit();
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
