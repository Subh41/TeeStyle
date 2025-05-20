require('dotenv').config();
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const { users, products } = require('./seedData');
const User = require('../models/User');
const Product = require('../models/Product');

// Set up mongoose connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 60000,
  family: 4,
  connectTimeoutMS: 30000
};

// Try to connect to MongoDB Atlas first, then fall back to local MongoDB
const connectToDatabase = async () => {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    const ATLAS_URI = 'mongodb+srv://subh:zidiomdb@cluster0.mkoolxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(ATLAS_URI, mongooseOptions);
    console.log('Connected to MongoDB Atlas successfully');
    return true;
  } catch (atlasError) {
    console.error('MongoDB Atlas connection error:', atlasError.message);
    console.log('Falling back to local MongoDB...');
    
    try {
      await mongoose.connect(process.env.MONGO_URI, mongooseOptions);
      console.log('Connected to local MongoDB successfully');
      return true;
    } catch (localError) {
      console.error('Local MongoDB connection error:', localError.message);
      return false;
    }
  }
};

// Import data to database
const importData = async () => {
  try {
    // Connect to the database
    const connected = await connectToDatabase();
    if (!connected) {
      console.error('Failed to connect to any database. Cannot proceed with seeding.');
      process.exit(1);
    }

    console.log('MongoDB connected...');

    // Delete existing data
    await User.deleteMany({});
    console.log('Users deleted...');
    
    await Product.deleteMany({});
    console.log('Products deleted...');

    // Create users
    const createdUsers = await User.insertMany(users);
    console.log('Users imported...');
    
    // Create products with proper user references
    const adminUser = createdUsers.find(user => user.isAdmin);
    
    // Update product user references
    const productsWithUpdatedRefs = products.map(product => ({
      ...product,
      user: adminUser._id
    }));
    
    // Create products in smaller batches to avoid timeouts
    const batchSize = 2;
    for (let i = 0; i < productsWithUpdatedRefs.length; i += batchSize) {
      const batch = productsWithUpdatedRefs.slice(i, i + batchSize);
      await Product.insertMany(batch);
      console.log(`Imported products ${i+1} to ${Math.min(i+batchSize, productsWithUpdatedRefs.length)}...`);
    }

    console.log('All data imported successfully!');
    await mongoose.disconnect();
    process.exit(0);
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
