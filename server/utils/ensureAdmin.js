const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

/**
 * Ensures an admin user exists in the database
 * Creates one with secure credentials if none exists
 */
const ensureAdminExists = async () => {
  try {
    // Check if any admin user already exists
    const adminExists = await User.findOne({ isAdmin: true });
    
    if (adminExists) {
      console.log('Admin user already exists in the database');
      return;
    }
    
    // Generate a secure password with higher cost factor
    const securePassword = 'Admin@123456'; // Should be environment variable in production
    const hashedPassword = await bcrypt.hash(securePassword, 12);
    
    // Create admin user with complete profile
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
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
    console.log('Admin credentials - Email: admin@example.com, Password: Admin@123456');
  } catch (error) {
    console.error('Error creating admin user:', error);
    // Don't throw error to prevent server startup failure
    // Just log the error and continue
  }
};

module.exports = ensureAdminExists;
