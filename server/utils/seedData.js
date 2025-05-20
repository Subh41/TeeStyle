const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// Create a fixed admin user ID for reference in products
const adminId = new mongoose.Types.ObjectId();

const users = [
  {
    _id: adminId,
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
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    addresses: [
      {
        street: '123 Main St',
        city: 'Boston',
        state: 'MA',
        zipCode: '02108',
        country: 'USA',
        isDefault: true
      }
    ]
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    addresses: [
      {
        street: '456 Park Ave',
        city: 'New York',
        state: 'NY',
        zipCode: '10022',
        country: 'USA',
        isDefault: true
      }
    ]
  }
];

// Convert product data to match our model
const products = [
  {
    user: adminId,
    name: 'Classic Black T-Shirt',
    description: 'A comfortable and versatile black t-shirt made from 100% organic cotton. Perfect for everyday wear.',
    price: 29.99,
    discount: 24.99,
    category: 'men',
    brand: "Brand Name",
    // tags: ['t-shirt', 'basic', 'cotton'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['black', 'white', 'gray'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    countInStock: 50,
    rating: 4.5,
    numReviews: 12,
    isFeatured: true
  },
  {
    user: adminId,
    name: 'Slim Fit Jeans',
    description: 'Classic slim fit jeans with a modern touch. Made from high-quality denim that provides comfort and durability.',
    price: 59.99,
    discount: 49.99,
    category: 'men',
    brand: "Brand Name",
    // tags: ['jeans', 'denim', 'slim fit'],
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['blue', 'black', 'gray'],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    countInStock: 35,
    rating: 4.2,
    numReviews: 8,
    isFeatured: false
  },
  {
    user: adminId,
    name: 'Floral Summer Dress',
    description: 'A beautiful floral dress perfect for summer days. Made from lightweight fabric with a flattering cut.',
    price: 49.99,
    discount: 39.99,
    category: 'women',
    brand: "Brand Name",
    // tags: ['dress', 'summer', 'floral'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['blue', 'pink', 'yellow'],
    images: [
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    countInStock: 25,
    rating: 4.8,
    numReviews: 15,
    isFeatured: true
  },
  {
    user: adminId,
    name: 'Leather Crossbody Bag',
    description: 'A stylish and practical leather crossbody bag with multiple compartments. Perfect for everyday use.',
    price: 79.99,
    discount: 69.99,
    category: 'accessories',
    brand: "Brand Name",
    // tags: ['bag', 'leather', 'crossbody'],
    sizes: [],
    colors: ['black', 'brown', 'tan'],
    images: [
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    countInStock: 20,
    rating: 4.6,
    numReviews: 10,
    isFeatured: true
  },
  {
    user: adminId,
    name: 'Running Shoes',
    description: 'Lightweight and comfortable running shoes with excellent cushioning and support. Perfect for daily runs and workouts.',
    price: 89.99,
    discount: 79.99,
    category: 'footwear',
    brand: "Brand Name",
    // tags: ['shoes', 'running', 'athletic'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['black', 'blue', 'red'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    countInStock: 30,
    rating: 4.7,
    numReviews: 18,
    isFeatured: false
  },
  {
    user: adminId,
    name: 'Wireless Earbuds',
    description: 'High-quality wireless earbuds with excellent sound quality and long battery life. Perfect for music and calls on the go.',
    price: 129.99,
    discount: 99.99,
    category: 'electronics',
    brand: "Brand Name",
    // tags: ['earbuds', 'wireless', 'audio'],
    sizes: [],
    colors: ['black', 'white'],
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598331668826-20cecc596b43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    countInStock: 15,
    rating: 4.9,
    numReviews: 25,
    isFeatured: true
  },
  {
    user: adminId,
    name: 'Denim Jacket',
    description: 'Classic denim jacket with a modern fit. Versatile and durable, perfect for layering in any season.',
    price: 69.99,
    discount: 59.99,
    category: 'men',
    brand: "Brand Name",
    // tags: ['jacket', 'denim', 'outerwear'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['blue', 'black'],
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591213954196-2d0ccb3f8d4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    countInStock: 22,
    rating: 4.3,
    numReviews: 9,
    isFeatured: false
  },
  {
    user: adminId,
    name: 'Yoga Mat',
    description: 'Premium non-slip yoga mat made from eco-friendly materials. Provides excellent cushioning and support for all yoga styles.',
    price: 39.99,
    discount: 34.99,
    category: 'accessories',
    brand: "Brand Name",
    // tags: ['yoga', 'fitness', 'exercise'],
    sizes: [],
    colors: ['purple', 'blue', 'green', 'pink'],
    images: [
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    countInStock: 40,
    rating: 4.4,
    numReviews: 12,
    isFeatured: false
  }
];

module.exports = { users, products };
