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
    name: 'Starry Night Batman Tee',
    description: 'Premium cotton t-shirt featuring Batman silhouette against a Starry Night inspired backdrop. Limited edition design.',
    price: 34.99,
    discount: 29.99,
    category: 'DC Comics',
    brand: "TeeStyle",
    // tags: ['batman', 'dc comics', 'limited edition'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy Blue', 'Black', 'Royal Blue'],
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    countInStock: 50,
    rating: 4.9,
    numReviews: 42,
    isFeatured: true
  },
  {
    user: adminId,
    name: 'Iron Man Glow Tee',
    description: 'Ultra-comfortable t-shirt with Iron Man arc reactor design that glows in the dark. Perfect for Marvel fans.',
    price: 39.99,
    discount: 34.99,
    category: 'Marvel',
    brand: "TeeStyle",
    // tags: ['iron man', 'marvel', 'glow in dark'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Gold', 'Black'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    countInStock: 35,
    rating: 4.8,
    numReviews: 38,
    isFeatured: true
  },
  {
    user: adminId,
    name: 'Spider-Man Comic Tee',
    description: 'Vintage comic style Spider-Man t-shirt with classic comic panels. Made from premium cotton for maximum comfort.',
    price: 32.99,
    discount: 27.99,
    category: 'Marvel',
    brand: "TeeStyle",
    // tags: ['spider-man', 'marvel', 'vintage'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Blue', 'Black'],
    images: [
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583745089114-188c1aea73ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    countInStock: 45,
    rating: 4.7,
    numReviews: 35,
    isFeatured: true
  },
  {
    user: adminId,
    name: 'Wonder Woman Stars Tee',
    description: 'Empowering Wonder Woman t-shirt with starry night background. Made from sustainable organic cotton.',
    price: 34.99,
    discount: 29.99,
    category: 'DC Comics',
    brand: "TeeStyle",
    // tags: ['wonder woman', 'dc comics', 'stars'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Red', 'Gold'],
    images: [
      'https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    countInStock: 40,
    rating: 4.9,
    numReviews: 42,
    isFeatured: true
  },
  {
    user: adminId,
    name: 'Superman Galaxy Tee',
    description: 'Bold Superman logo against a cosmic galaxy background. Premium quality cotton blend for durability and comfort.',
    price: 33.99,
    discount: 28.99,
    category: 'DC Comics',
    brand: "TeeStyle",
    // tags: ['superman', 'dc comics', 'galaxy'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'Red', 'Black'],
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    countInStock: 30,
    rating: 4.6,
    numReviews: 28,
    isFeatured: true
  },
  {
    user: adminId,
    name: 'Black Panther Vibranium Tee',
    description: 'Limited edition Black Panther t-shirt with Vibranium-inspired metallic print details. Made from premium cotton blend.',
    price: 36.99,
    discount: 31.99,
    category: 'Marvel',
    brand: "TeeStyle",
    // tags: ['black panther', 'marvel', 'wakanda'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Purple', 'Silver'],
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598331668826-20cecc596b43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    countInStock: 25,
    rating: 4.9,
    numReviews: 33,
    isFeatured: true
  },
  {
    user: adminId,
    name: 'The Flash Lightning Tee',
    description: 'Dynamic Flash themed t-shirt with lightning bolt design and electric effect prints. Ultra-soft premium cotton for speed and comfort.',
    price: 32.99,
    discount: 27.99,
    category: 'DC Comics',
    brand: "TeeStyle",
    // tags: ['flash', 'dc comics', 'lightning'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Yellow', 'Black'],
    images: [
      'https://images.unsplash.com/photo-1583745089109-c7fb7b6174f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583745089803-a743deef7cc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1583745089109-c7fb7b6174f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    countInStock: 30,
    rating: 4.7,
    numReviews: 29,
    isFeatured: true
  },
  {
    user: adminId,
    name: 'Anime Hero Collection Tee',
    description: 'Limited edition t-shirt featuring iconic anime superheroes in a cosmic starry night setting. Premium quality material with vivid prints.',
    price: 34.99,
    discount: 29.99,
    category: 'Anime',
    brand: "TeeStyle",
    // tags: ['anime', 'manga', 'japan', 'hero'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'White'],
    images: [
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    countInStock: 40,
    rating: 4.8,
    numReviews: 37,
    isFeatured: true
  }
];

module.exports = { users, products };
