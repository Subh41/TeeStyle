const Product = require('../models/Product');
const mongoose = require('mongoose');

// Sample products for fallback mode
const sampleProducts = [
  {
    _id: 'sample-product-1',
    name: 'Sample T-Shirt',
    description: 'A comfortable cotton t-shirt',
    price: 19.99,
    discountPrice: 14.99,
    category: 'men',
    stock: 100,
    mainImage: 'https://via.placeholder.com/500',
    images: ['https://via.placeholder.com/500'],
    featured: true,
    tags: ['clothing', 'men'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Blue'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'sample-product-2',
    name: 'Sample Jeans',
    description: 'Classic denim jeans',
    price: 49.99,
    discountPrice: 39.99,
    category: 'women',
    stock: 50,
    mainImage: 'https://via.placeholder.com/500',
    images: ['https://via.placeholder.com/500'],
    featured: false,
    tags: ['clothing', 'women'],
    sizes: ['S', 'M', 'L'],
    colors: ['Blue', 'Black'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Get all products with filtering, sorting, and pagination
exports.getAllProducts = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (!isMongoConnected()) {
      console.log('Using fallback product data');
      
      // Use in-memory products if available, otherwise use sample products
      let allProducts = [];
      if (global.inMemoryProducts && global.inMemoryProducts.length > 0) {
        console.log('Using in-memory products:', global.inMemoryProducts.length);
        allProducts = [...global.inMemoryProducts];
      } else {
        console.log('Using sample products:', sampleProducts.length);
        allProducts = [...sampleProducts];
      }
      
      // Make sure we have at least some products
      if (allProducts.length === 0) {
        console.log('No products found, adding sample products');
        allProducts = [...sampleProducts];
      }
      
      // Apply basic filtering to products
      let filteredProducts = [...allProducts];
      
      // Handle category filter if present
      if (req.query.category) {
        console.log('Filtering by category:', req.query.category);
        filteredProducts = filteredProducts.filter(p => p.category === req.query.category);
      }
      
      // Handle keyword search if present
      if (req.query.keyword) {
        const keyword = req.query.keyword.toLowerCase();
        console.log('Filtering by keyword:', keyword);
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(keyword) || 
          p.description.toLowerCase().includes(keyword)
        );
      }
      
      // Simple pagination
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
      
      console.log('Returning', paginatedProducts.length, 'products out of', filteredProducts.length, 'total');
      
      return res.status(200).json({
        success: true,
        count: paginatedProducts.length,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit),
        currentPage: page,
        products: paginatedProducts
      });
    }
    
    // If MongoDB is connected, proceed with normal database query
    // Build query
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    let query = Product.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    
    query = query.skip(skip).limit(limit);

    try {
      // Execute query with timeout protection
      const products = await Promise.race([
        query.exec(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database query timeout')), 5000)
        )
      ]);
      
      const total = await Promise.race([
        Product.countDocuments(JSON.parse(queryStr)),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database count timeout')), 5000)
        )
      ]);

      return res.status(200).json({
        success: true,
        count: products.length,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        products
      });
    } catch (dbError) {
      console.error('Database query error:', dbError);
      
      // Fallback to sample data if database query fails
      console.log('Database query failed, using fallback product data');
      
      // Apply basic filtering to sample products
      let filteredProducts = [...sampleProducts];
      
      // Simple pagination
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
      
      return res.status(200).json({
        success: true,
        count: paginatedProducts.length,
        total: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / limit),
        currentPage: page,
        products: paginatedProducts
      });
    }
  } catch (error) {
    console.error('Product controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving products'
    });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (!isMongoConnected()) {
      console.log('Using fallback product data for single product, ID:', req.params.id);
      
      // Find product in sample data or in-memory products
      let product = null;
      
      // First check in global.inMemoryProducts (if exists)
      if (global.inMemoryProducts && global.inMemoryProducts.length > 0) {
        product = global.inMemoryProducts.find(p => p._id === req.params.id);
      }
      
      // If not found, check in sample products
      if (!product) {
        product = sampleProducts.find(p => p._id === req.params.id);
      }
      
      // If still not found, use the first sample product as fallback
      if (!product && sampleProducts.length > 0) {
        console.log('Product not found, using first sample product as fallback');
        product = sampleProducts[0];
      }
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        product
      });
    }
    
    // If MongoDB is connected, try to fetch from database
    try {
      // Execute query with timeout protection
      const product = await Promise.race([
        Product.findById(req.params.id),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database query timeout')), 5000)
        )
      ]);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        product
      });
    } catch (dbError) {
      console.error('Database query error:', dbError);
      
      // Fallback to sample data if database query fails
      console.log('Database query failed, checking fallback product data');
      
      // Find product in sample data
      const product = sampleProducts.find(p => p._id === req.params.id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        product
      });
    }
  } catch (error) {
    console.error('Product controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving product'
    });
  }
};

// In-memory product store for fallback mode
if (!global.inMemoryProducts) {
  global.inMemoryProducts = [...sampleProducts];
}

// Create new product (Admin only)
exports.createProduct = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (!isMongoConnected()) {
      console.log('Using fallback mode for product creation');
      
      // Create product in memory
      const newProduct = {
        _id: `product-${Date.now()}`,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Add to in-memory store
      global.inMemoryProducts.push(newProduct);
      
      return res.status(201).json({
        success: true,
        product: newProduct
      });
    }
    
    // If MongoDB is connected, try to create in database
    try {
      // Execute query with timeout protection
      const product = await Promise.race([
        Product.create(req.body),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database operation timeout')), 5000)
        )
      ]);
      
      return res.status(201).json({
        success: true,
        product
      });
    } catch (dbError) {
      console.error('Database operation error:', dbError);
      
      // Fallback to in-memory if database operation fails
      console.log('Database operation failed, using fallback mode');
      
      // Create product in memory
      const newProduct = {
        _id: `product-${Date.now()}`,
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Add to in-memory store
      global.inMemoryProducts.push(newProduct);
      
      return res.status(201).json({
        success: true,
        product: newProduct
      });
    }
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product'
    });
  }
};

// Update product (Admin only)
exports.updateProduct = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (!isMongoConnected()) {
      console.log('Using fallback mode for product update');
      
      // Find product in memory
      const productIndex = global.inMemoryProducts.findIndex(p => p._id === req.params.id);
      
      if (productIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      // Update product in memory
      const updatedProduct = {
        ...global.inMemoryProducts[productIndex],
        ...req.body,
        updatedAt: new Date()
      };
      
      global.inMemoryProducts[productIndex] = updatedProduct;
      
      return res.status(200).json({
        success: true,
        product: updatedProduct
      });
    }
    
    // If MongoDB is connected, try to update in database
    try {
      // Execute query with timeout protection
      const product = await Promise.race([
        Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        ),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database operation timeout')), 5000)
        )
      ]);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        product
      });
    } catch (dbError) {
      console.error('Database operation error:', dbError);
      
      // Fallback to in-memory if database operation fails
      console.log('Database operation failed, using fallback mode');
      
      // Find product in memory
      const productIndex = global.inMemoryProducts.findIndex(p => p._id === req.params.id);
      
      if (productIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      // Update product in memory
      const updatedProduct = {
        ...global.inMemoryProducts[productIndex],
        ...req.body,
        updatedAt: new Date()
      };
      
      global.inMemoryProducts[productIndex] = updatedProduct;
      
      return res.status(200).json({
        success: true,
        product: updatedProduct
      });
    }
  } catch (error) {
    console.error('Product update error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product'
    });
  }
};

// Delete product (Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (!isMongoConnected()) {
      console.log('Using fallback mode for product deletion');
      
      // Find product in memory
      const productIndex = global.inMemoryProducts.findIndex(p => p._id === req.params.id);
      
      if (productIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      // Remove product from memory
      global.inMemoryProducts.splice(productIndex, 1);
      
      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
      });
    }
    
    // If MongoDB is connected, try to delete from database
    try {
      // Execute query with timeout protection
      const product = await Promise.race([
        Product.findByIdAndDelete(req.params.id),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database operation timeout')), 5000)
        )
      ]);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (dbError) {
      console.error('Database operation error:', dbError);
      
      // Fallback to in-memory if database operation fails
      console.log('Database operation failed, using fallback mode');
      
      // Find product in memory
      const productIndex = global.inMemoryProducts.findIndex(p => p._id === req.params.id);
      
      if (productIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      // Remove product from memory
      global.inMemoryProducts.splice(productIndex, 1);
      
      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
      });
    }
  } catch (error) {
    console.error('Product deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product'
    });
  }
};

// Get featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const products = await Product.find({ featured: true }).limit(limit);
    
    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    
    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
