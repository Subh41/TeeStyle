require('dotenv').config();
const mongoose = require('mongoose');
const { users, products } = require('./seedData');
const User = require('../models/userModel');
const Product = require('../models/productModel');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/e-commerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Import data into DB
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    
    console.log('Data cleared');
    
    // Insert new data
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });
    
    await Product.insertMany(sampleProducts);
    
    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

// Delete all data from DB
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    
    console.log('Data destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

// Determine which function to run based on command line args
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
