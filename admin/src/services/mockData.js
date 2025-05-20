// Mock data service for the admin panel
// This provides sample data to showcase the UI until the real backend is connected

export const mockProducts = [
  {
    _id: 'p1',
    name: 'Iron Man T-Shirt',
    price: 29.99,
    category: 'Marvel',
    description: 'Premium quality t-shirt featuring Iron Man in action. Made with breathable fabric and vibrant colors that won\'t fade.',
    colors: ['red', 'gold', 'black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://via.placeholder.com/500x500?text=Iron+Man+Front',
      'https://via.placeholder.com/500x500?text=Iron+Man+Back'
    ],
    countInStock: 45,
    featured: true,
    createdAt: '2025-04-01T10:30:00Z'
  },
  {
    _id: 'p2',
    name: 'Batman T-Shirt',
    price: 27.99,
    category: 'DC',
    description: 'High-quality Batman logo t-shirt in dark colors. Perfect for fans of the Dark Knight.',
    colors: ['black', 'grey', 'navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://via.placeholder.com/500x500?text=Batman+Front',
      'https://via.placeholder.com/500x500?text=Batman+Back'
    ],
    countInStock: 38,
    featured: true,
    createdAt: '2025-04-02T14:20:00Z'
  },
  {
    _id: 'p3',
    name: 'Spider-Man T-Shirt',
    price: 25.99,
    category: 'Marvel',
    description: 'Comfortable Spider-Man themed t-shirt for everyday wear. Features the iconic web-slinger in action.',
    colors: ['red', 'blue', 'black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://via.placeholder.com/500x500?text=Spider-Man+Front',
      'https://via.placeholder.com/500x500?text=Spider-Man+Back'
    ],
    countInStock: 52,
    featured: true,
    createdAt: '2025-04-03T09:15:00Z'
  },
  {
    _id: 'p4',
    name: 'Wonder Woman T-Shirt',
    price: 28.99,
    category: 'DC',
    description: 'Stylish Wonder Woman t-shirt with iconic logo. Empowering design for fans of all ages.',
    colors: ['red', 'blue', 'gold'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://via.placeholder.com/500x500?text=Wonder+Woman+Front',
      'https://via.placeholder.com/500x500?text=Wonder+Woman+Back'
    ],
    countInStock: 29,
    featured: false,
    createdAt: '2025-04-04T16:45:00Z'
  },
  {
    _id: 'p5',
    name: 'Hulk T-Shirt',
    price: 26.99,
    category: 'Marvel',
    description: 'Durable Hulk themed t-shirt that stretches with you. Perfect for fans who want to show their incredible side.',
    colors: ['green', 'purple', 'grey'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    images: [
      'https://via.placeholder.com/500x500?text=Hulk+Front',
      'https://via.placeholder.com/500x500?text=Hulk+Back'
    ],
    countInStock: 33,
    featured: false,
    createdAt: '2025-04-05T11:30:00Z'
  },
  {
    _id: 'p6',
    name: 'Captain America T-Shirt',
    price: 28.99,
    category: 'Marvel',
    description: 'Show your patriotic side with this Captain America shield design t-shirt. Made with premium cotton for comfort.',
    colors: ['blue', 'red', 'white'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://via.placeholder.com/500x500?text=Captain+America+Front',
      'https://via.placeholder.com/500x500?text=Captain+America+Back'
    ],
    countInStock: 42,
    featured: true,
    createdAt: '2025-04-06T08:45:00Z'
  },
  {
    _id: 'p7',
    name: 'Superman T-Shirt',
    price: 27.99,
    category: 'DC',
    description: 'Classic Superman logo t-shirt that never goes out of style. Be the hero in your story with this iconic design.',
    colors: ['blue', 'red', 'black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://via.placeholder.com/500x500?text=Superman+Front',
      'https://via.placeholder.com/500x500?text=Superman+Back'
    ],
    countInStock: 47,
    featured: true,
    createdAt: '2025-04-07T13:20:00Z'
  },
  {
    _id: 'p8',
    name: 'Black Panther T-Shirt',
    price: 29.99,
    category: 'Marvel',
    description: 'Wakanda Forever! This Black Panther t-shirt features vibranium-inspired designs that stand out in any crowd.',
    colors: ['black', 'silver', 'purple'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://via.placeholder.com/500x500?text=Black+Panther+Front',
      'https://via.placeholder.com/500x500?text=Black+Panther+Back'
    ],
    countInStock: 25,
    featured: true,
    createdAt: '2025-04-08T10:15:00Z'
  },
  {
    _id: 'p9',
    name: 'Flash T-Shirt',
    price: 26.99,
    category: 'DC',
    description: 'Speed into action with this Flash-themed t-shirt. Lightning-fast style for the fastest fans alive.',
    colors: ['red', 'yellow', 'black'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://via.placeholder.com/500x500?text=Flash+Front',
      'https://via.placeholder.com/500x500?text=Flash+Back'
    ],
    countInStock: 31,
    featured: false,
    createdAt: '2025-04-09T15:30:00Z'
  },
  {
    _id: 'p10',
    name: 'Thor T-Shirt',
    price: 28.99,
    category: 'Marvel',
    description: 'Worthy of the God of Thunder, this Thor t-shirt features Mjolnir and lightning designs that electrify your style.',
    colors: ['blue', 'silver', 'red'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    images: [
      'https://via.placeholder.com/500x500?text=Thor+Front',
      'https://via.placeholder.com/500x500?text=Thor+Back'
    ],
    countInStock: 28,
    featured: false,
    createdAt: '2025-04-10T09:45:00Z'
  },
  {
    _id: 'p11',
    name: 'Aquaman T-Shirt',
    price: 27.99,
    category: 'DC',
    description: 'Dive into style with this Aquaman-themed t-shirt featuring oceanic designs and trident motifs.',
    colors: ['teal', 'gold', 'navy'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://via.placeholder.com/500x500?text=Aquaman+Front',
      'https://via.placeholder.com/500x500?text=Aquaman+Back'
    ],
    countInStock: 22,
    featured: false,
    createdAt: '2025-04-11T14:10:00Z'
  },
  {
    _id: 'p12',
    name: 'Black Widow T-Shirt',
    price: 28.99,
    category: 'Marvel',
    description: 'Sleek and deadly like the spy herself, this Black Widow t-shirt features minimalist designs with maximum impact.',
    colors: ['black', 'red', 'grey'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://via.placeholder.com/500x500?text=Black+Widow+Front',
      'https://via.placeholder.com/500x500?text=Black+Widow+Back'
    ],
    countInStock: 19,
    featured: false,
    createdAt: '2025-04-12T11:25:00Z'
  }
];

export const mockOrders = [
  {
    _id: 'o1',
    user: {
      _id: 'u1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    products: [
      {
        product: mockProducts[0],
        quantity: 2,
        size: 'L',
        color: 'red',
        price: 29.99
      },
      {
        product: mockProducts[2],
        quantity: 1,
        size: 'M',
        color: 'blue',
        price: 25.99
      }
    ],
    totalAmount: 85.97,
    shippingAddress: {
      street: '123 Main St',
      city: 'Metropolis',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    createdAt: '2025-05-10T14:30:00Z',
    updatedAt: '2025-05-12T09:15:00Z'
  },
  {
    _id: 'o2',
    user: {
      _id: 'u2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    products: [
      {
        product: mockProducts[1],
        quantity: 1,
        size: 'S',
        color: 'black',
        price: 27.99
      }
    ],
    totalAmount: 27.99,
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Gotham',
      state: 'NJ',
      zipCode: '07001',
      country: 'USA'
    },
    paymentMethod: 'PayPal',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    createdAt: '2025-05-15T10:45:00Z',
    updatedAt: '2025-05-16T16:20:00Z'
  },
  {
    _id: 'o3',
    user: {
      _id: 'u3',
      name: 'Bob Johnson',
      email: 'bob@example.com'
    },
    products: [
      {
        product: mockProducts[3],
        quantity: 1,
        size: 'XL',
        color: 'red',
        price: 28.99
      },
      {
        product: mockProducts[4],
        quantity: 2,
        size: 'L',
        color: 'green',
        price: 26.99
      }
    ],
    totalAmount: 82.97,
    shippingAddress: {
      street: '789 Pine St',
      city: 'Star City',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    createdAt: '2025-05-18T09:30:00Z',
    updatedAt: '2025-05-18T09:30:00Z'
  },
  {
    _id: 'o4',
    user: {
      _id: 'u4',
      name: 'Alice Williams',
      email: 'alice@example.com'
    },
    products: [
      {
        product: mockProducts[5],
        quantity: 1,
        size: 'M',
        color: 'blue',
        price: 28.99
      }
    ],
    totalAmount: 28.99,
    shippingAddress: {
      street: '101 Liberty Ave',
      city: 'Central City',
      state: 'MO',
      zipCode: '64108',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
    createdAt: '2025-05-19T11:20:00Z',
    updatedAt: '2025-05-19T11:20:00Z'
  },
  {
    _id: 'o5',
    user: {
      _id: 'u5',
      name: 'Michael Brown',
      email: 'michael@example.com'
    },
    products: [
      {
        product: mockProducts[6],
        quantity: 1,
        size: 'L',
        color: 'blue',
        price: 27.99
      },
      {
        product: mockProducts[8],
        quantity: 1,
        size: 'M',
        color: 'red',
        price: 26.99
      }
    ],
    totalAmount: 54.98,
    shippingAddress: {
      street: '222 Elm Street',
      city: 'Smallville',
      state: 'KS',
      zipCode: '66002',
      country: 'USA'
    },
    paymentMethod: 'PayPal',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    createdAt: '2025-05-19T14:45:00Z',
    updatedAt: '2025-05-19T14:45:00Z'
  },
  {
    _id: 'o6',
    user: {
      _id: 'u1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    products: [
      {
        product: mockProducts[7],
        quantity: 1,
        size: 'XL',
        color: 'black',
        price: 29.99
      }
    ],
    totalAmount: 29.99,
    shippingAddress: {
      street: '123 Main St',
      city: 'Metropolis',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    createdAt: '2025-05-20T09:15:00Z',
    updatedAt: '2025-05-20T16:30:00Z'
  },
  {
    _id: 'o7',
    user: {
      _id: 'u6',
      name: 'Sarah Davis',
      email: 'sarah@example.com'
    },
    products: [
      {
        product: mockProducts[9],
        quantity: 1,
        size: 'L',
        color: 'blue',
        price: 28.99
      },
      {
        product: mockProducts[11],
        quantity: 1,
        size: 'M',
        color: 'black',
        price: 28.99
      }
    ],
    totalAmount: 57.98,
    shippingAddress: {
      street: '555 Avengers Blvd',
      city: 'New York',
      state: 'NY',
      zipCode: '10007',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
    createdAt: '2025-05-20T10:30:00Z',
    updatedAt: '2025-05-20T10:30:00Z'
  },
  {
    _id: 'o8',
    user: {
      _id: 'u7',
      name: 'David Wilson',
      email: 'david@example.com'
    },
    products: [
      {
        product: mockProducts[10],
        quantity: 2,
        size: 'XL',
        color: 'teal',
        price: 27.99
      }
    ],
    totalAmount: 55.98,
    shippingAddress: {
      street: '777 Ocean Drive',
      city: 'Atlantis',
      state: 'FL',
      zipCode: '33139',
      country: 'USA'
    },
    paymentMethod: 'PayPal',
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
    createdAt: '2025-05-20T13:45:00Z',
    updatedAt: '2025-05-20T13:45:00Z'
  },
  {
    _id: 'o9',
    user: {
      _id: 'u2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    products: [
      {
        product: mockProducts[2],
        quantity: 1,
        size: 'S',
        color: 'red',
        price: 25.99
      },
      {
        product: mockProducts[5],
        quantity: 1,
        size: 'M',
        color: 'blue',
        price: 28.99
      }
    ],
    totalAmount: 54.98,
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Gotham',
      state: 'NJ',
      zipCode: '07001',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    createdAt: '2025-05-20T15:20:00Z',
    updatedAt: '2025-05-20T15:20:00Z'
  },
  {
    _id: 'o10',
    user: {
      _id: 'u8',
      name: 'Emily Johnson',
      email: 'emily@example.com'
    },
    products: [
      {
        product: mockProducts[0],
        quantity: 1,
        size: 'M',
        color: 'gold',
        price: 29.99
      },
      {
        product: mockProducts[6],
        quantity: 1,
        size: 'L',
        color: 'red',
        price: 27.99
      },
      {
        product: mockProducts[8],
        quantity: 1,
        size: 'M',
        color: 'yellow',
        price: 26.99
      }
    ],
    totalAmount: 84.97,
    shippingAddress: {
      street: '888 Hero Lane',
      city: 'Stark Tower',
      state: 'NY',
      zipCode: '10022',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
    createdAt: '2025-05-21T02:15:00Z',
    updatedAt: '2025-05-21T02:15:00Z'
  }
];

export const mockUsers = [
  {
    _id: 'u1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://via.placeholder.com/150?text=JD',
    status: 'active',
    orderCount: 5,
    createdAt: '2025-03-15T10:30:00Z'
  },
  {
    _id: 'u2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://via.placeholder.com/150?text=JS',
    status: 'active',
    orderCount: 3,
    createdAt: '2025-03-20T14:45:00Z'
  },
  {
    _id: 'u3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    avatar: 'https://via.placeholder.com/150?text=BJ',
    status: 'active',
    orderCount: 2,
    createdAt: '2025-04-05T09:15:00Z'
  },
  {
    _id: 'u4',
    name: 'Alice Williams',
    email: 'alice@example.com',
    avatar: 'https://via.placeholder.com/150?text=AW',
    status: 'inactive',
    orderCount: 1,
    createdAt: '2025-04-10T16:30:00Z'
  }
];

export const mockDiscounts = [
  {
    _id: 'd1',
    name: 'Summer Sale',
    code: 'SUMMER25',
    type: 'percentage',
    value: 25,
    minPurchase: 50,
    maxUses: 100,
    startDate: '2025-06-01T00:00:00Z',
    endDate: '2025-08-31T23:59:59Z',
    status: 'active',
    createdAt: '2025-05-15T10:30:00Z'
  },
  {
    _id: 'd2',
    name: 'Welcome Discount',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minPurchase: 0,
    maxUses: null,
    startDate: null,
    endDate: null,
    status: 'active',
    createdAt: '2025-05-01T09:15:00Z'
  },
  {
    _id: 'd3',
    name: 'Free Shipping',
    code: 'FREESHIP',
    type: 'fixed',
    value: 5,
    minPurchase: 30,
    maxUses: 50,
    startDate: '2025-05-10T00:00:00Z',
    endDate: '2025-05-31T23:59:59Z',
    status: 'active',
    createdAt: '2025-05-05T14:45:00Z'
  }
];

export const mockPromotions = [
  {
    _id: 'pr1',
    title: 'Superhero Summer Sale',
    description: 'Get up to 25% off on all superhero t-shirts this summer!',
    imageUrl: 'https://via.placeholder.com/1200x400?text=Summer+Sale',
    targetUrl: '/products?sale=summer',
    position: 'home',
    startDate: '2025-06-01T00:00:00Z',
    endDate: '2025-08-31T23:59:59Z',
    status: 'active',
    createdAt: '2025-05-15T10:30:00Z'
  },
  {
    _id: 'pr2',
    title: 'New Marvel Collection',
    description: 'Check out our latest Marvel t-shirts featuring your favorite superheroes!',
    imageUrl: 'https://via.placeholder.com/1200x400?text=Marvel+Collection',
    targetUrl: '/products?category=marvel',
    position: 'products',
    startDate: '2025-05-10T00:00:00Z',
    endDate: null,
    status: 'active',
    createdAt: '2025-05-05T14:45:00Z'
  },
  {
    _id: 'pr3',
    title: 'DC Heroes Flash Sale',
    description: 'Limited time offer on all DC superhero t-shirts. Don\'t miss out!',
    imageUrl: 'https://via.placeholder.com/1200x400?text=DC+Flash+Sale',
    targetUrl: '/products?category=dc&sale=true',
    position: 'home',
    startDate: '2025-05-20T00:00:00Z',
    endDate: '2025-05-27T23:59:59Z',
    status: 'scheduled',
    createdAt: '2025-05-10T09:15:00Z'
  }
];

export const mockSettings = {
  storeName: 'TeeStyle',
  storeDescription: 'Premium superhero themed t-shirts for comic book fans',
  storeEmail: 'contact@teestyle.com',
  storePhone: '+1 (555) 123-4567',
  storeAddress: '123 Comic Lane, Metropolis, NY 10001',
  storeLogo: 'https://via.placeholder.com/200x100?text=TeeStyle',
  storeFavicon: 'https://via.placeholder.com/32x32?text=TS',
  currency: 'USD',
  enableStripe: true,
  enablePaypal: true,
  enableRazorpay: false,
  stripePublicKey: 'pk_test_sample',
  paypalClientId: 'client_id_sample',
  enableFreeShipping: true,
  freeShippingThreshold: '50',
  enableFlatRate: true,
  flatRateAmount: '5',
  enableLocalPickup: false,
  emailSender: 'noreply@teestyle.com',
  emailHost: 'smtp.example.com',
  emailPort: '587',
  enableOrderConfirmation: true,
  enableShippingNotification: true
};
