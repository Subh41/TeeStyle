# TeeStyle - Superhero-Themed E-Commerce Platform


A MERN stack e-commerce application specializing in t-shirts featuring superhero designs with an immersive UI inspired by Starry Night and Comic Superheroes theme. The platform offers a comprehensive shopping experience with robust admin management, and secure checkout features.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
  - [User Features](#user-features)
  - [Admin Features](#admin-features)
- [Product Categories](#product-categories)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Current Implementation Status](#current-implementation-status)
- [Getting Started](#getting-started)
- [Deployment Guide](#deployment-guide)
- [Security Best Practices](#security-best-practices)
- [Design & Functionality Inspiration](#design--functionality-inspiration)
- [License](#license)
- [Application Architecture](#application-architecture)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)

## Project Overview

TeeStyle is an innovative e-commerce platform that allows global users to purchase t-shirts with superhero designs. The application features:
- Immersive UI inspired by Van Gogh's Starry Night and Comic Superheroes
- Robust admin panel for product, user, order, and discount management
- Personalized user profiles with superhero avatars
- Secure payment processing with multiple gateway options

## Features

### User Features
- **Authentication & Profile Management**
  - User signup/login with email/password and Google social login
  - Profile setup with custom superhero avatars
  - Address management for multiple shipping locations
  - Order history and tracking
  - Password reset functionality
  - Profile editing with avatar customization

- **Product Catalog & Shopping**
  - Explore t-shirt categories and comic-based collections
  - Advanced search & filtering (size, price, category, design)
  - Product details with images, descriptions, price, and reviews
  - Animated superhero-themed UI interactions
  - Add to cart & wishlist functionality
  - Recently viewed products tracking
  - Personalized product recommendations

- **Checkout & Payment**
  - Secure payment gateway integration (Stripe, PayPal, Razorpay)
  - Apply discount coupons
  - Order confirmation & tracking system
  - Multiple shipping options
  - Cash on delivery option
  - Address selection during checkout

- **Customer Engagement**
  - Reviews & ratings on products
  - Notification system for discounts & order updates
  - Referral program for discounts
  - Newsletter subscription
  - Social media sharing

### Admin Features
- **Dashboard**
  - Sales overview with charts and statistics
  - Recent orders and user activity tracking
  - Inventory alerts for low stock items
  - Revenue analytics with trend visualization

- **Product Management**
  - Add, edit, delete t-shirts with detailed descriptions
  - Upload multiple images with superhero-themed previews
  - Manage stock levels and inventory
  - Bulk product operations
  - Product categorization and tagging

- **Order & User Management**
  - View & manage user orders (update status, refunds, cancellations)
  - Access user profiles & support queries
  - Customer segmentation
  - Order filtering and search
  - Export order data

- **Discount & Coupon Management**
  - Create and manage promotional discounts
  - Track coupon usage statistics
  - Schedule time-limited promotions
  - Set discount conditions (minimum purchase, product categories)
  - Discount code generation

- **Settings & Configuration**
  - Store information management
  - Payment gateway configuration
  - Shipping options and rates
  - Email notification templates
  - Social media links

## Product Categories

### T-Shirt Types
- Oversized
- Acid Wash
- Graphic Printed
- Solid Color
- Polo T-Shirts
- Sleeveless
- Long Sleeve
- Henley
- Hooded
- Crop Tops (for women)

### Comic-Based Themes
- Marvel Universe
- DC Comics
- Anime Superheroes
- Classic Comics (Superman, Batman, Spiderman, etc.)
- Sci-Fi & Fantasy (Star Wars, LOTR, etc.)
- Video Game Characters
- Custom Fan Art

## Technology Stack

### Frontend
- **React.js**: UI library for the user interface
- **Redux Toolkit**: State management with slices for products, cart, auth, and discounts
- **Styled Components**: For component styling and theming
- **Framer Motion**: For superhero-themed animations and transitions
- **React Router**: For navigation and routing
- **React Icons**: Icon library for UI elements

### Backend
- **Node.js & Express.js**: Server-side application
- **MongoDB with Mongoose**: Database for storing products, users, orders, and discounts
- **Express Validator**: For API request validation

### Services & Integrations
- **JWT & OAuth**: Authentication and authorization
- **Stripe/PayPal/Razorpay**: Payment gateway integration
- **Cloudinary**: Cloud storage for product images and user avatars
- **Google Auth**: Social login functionality
- **Nodemailer**: For transactional emails

### Development Tools
- **ESLint**: Code quality and style checking
- **Prettier**: Code formatting
- **Jest & React Testing Library**: For frontend testing
- **Supertest**: For API testing

### Deployment
- **Vercel**: Frontend deployment
- **Render/AWS**: Backend deployment
- **MongoDB Atlas**: Cloud database hosting
- **GitHub Actions**: CI/CD pipeline

## Project Structure

TeeStyle is structured as a multi-application system with clear separation of concerns:

```
├── client/                      # Customer-facing frontend application
│   ├── public/                  # Static files
│   └── src/                     # React source code
│       ├── components/          # Reusable components
│       │   ├── auth/            # Authentication components
│       │   ├── cart/            # Shopping cart components
│       │   ├── checkout/        # Checkout components
│       │   ├── layout/          # Layout components (Header, Footer)
│       │   ├── products/        # Product-related components
│       │   ├── profile/         # User profile components
│       │   ├── styled/          # Styled components
│       │   └── ui/              # UI components (buttons, modals, etc.)
│       ├── pages/               # Page components
│       │   ├── auth/            # Authentication pages
│       │   ├── cart/            # Cart and checkout pages
│       │   ├── home/            # Homepage
│       │   ├── products/        # Product listing and details
│       │   └── profile/         # User profile pages
│       ├── redux/               # Redux state management
│       │   ├── slices/          # Redux Toolkit slices
│       │   └── store.js         # Redux store configuration
│       ├── services/            # API services
│       ├── theme/               # Theme configuration
│       ├── utils/               # Utility functions
│       └── App.js               # Main application component
├── admin/                       # Separate admin dashboard application
│   ├── public/                  # Static files
│   └── src/                     # React source code
│       ├── components/          # Admin-specific components
│       │   ├── orders/          # Order management components
│       │   ├── products/        # Product management components
│       │   ├── users/           # User management components
│       │   └── ui/              # UI components for admin interface
│       ├── pages/               # Admin page components
│       ├── redux/               # Admin state management
│       ├── services/            # Admin API services
│       └── App.js               # Admin application component
├── server/                      # Backend Node.js application (serves both client & admin)
│   ├── config/                  # Configuration files
│   ├── controllers/             # Request handlers
│   ├── middleware/              # Custom middleware
│   ├── models/                  # Database models
│   ├── routes/                  # API routes
│   ├── utils/                   # Utility functions
│   └── server.js                # Main server file
└── README.md                    # Project documentation
```

### Security Architecture

The project uses a clear separation between client and admin applications for enhanced security:

1. **Separate Applications**: The client and admin interfaces are completely separate React applications with their own routing, state management, and authentication.

2. **Independent Authentication**: Each application maintains its own authentication system with different token storage mechanisms.

3. **Role-Based Access Control**: The backend API enforces strict role-based access control to ensure admin endpoints are only accessible to authorized administrators.



## Current Implementation Status

### Completed Features

#### Client Application (Customer-facing)
- **User Interface**
  - Responsive design with Starry Night & Comic Superheroes theme
  - Header with navigation and user menu
  - Product catalog with filtering and search
  - Product detail pages with images and information
  - Shopping cart functionality
  - User profile management
  - Wishlist functionality

- **Authentication**
  - User registration and login
  - Password reset functionality
  - Protected routes for authenticated users
  - Secure token management

- **Shopping Experience**
  - Add to cart functionality
  - Wishlist management
  - Order history
  - Checkout process

#### Admin Application (Separate Dashboard)
- **Dashboard**
  - Sales overview with statistics
  - Recent orders display

- **Product Management**
  - Add, edit, delete products
  - Manage product categories
  - Upload and manage product images

- **Order Management**
  - View and filter orders
  - Update order status
  - Process refunds
  - Cancel orders
  - Add shipment tracking
  - Add order notes

- **Security**
  - Completely separated from client application
  - Secure admin authentication
  - Role-based access control

#### Backend
- **API Services**
  - RESTful API endpoints
  - Authentication middleware
  - Error handling
  - In-memory data mode for development

- **State Management**
  - Redux implementation for products, cart, auth, and orders
  - Persistent cart and user sessions

### In Progress
- Advanced payment gateway integration
- Review and rating system
- Email notification system
- Analytics dashboard enhancements

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (optional - the application can run in in-memory mode for development)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Subh41/TeeStyle.git
   cd TeeStyle
   ```

2. Install dependencies for all applications
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install admin dependencies
   cd ../admin
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables
   - Create `.env` file in the server directory based on the `.env.example` template:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     STRIPE_SECRET_KEY=your_stripe_secret_key
     PAYPAL_CLIENT_ID=your_paypal_client_id
     RAZORPAY_KEY_ID=your_razorpay_key_id
     RAZORPAY_KEY_SECRET=your_razorpay_key_secret
     CLIENT_URL=http://localhost:3000
     ADMIN_URL=http://localhost:3001
     ```
   - Create `.env` file in the client directory with:
     ```
     REACT_APP_API_URL=http://localhost:5000
     REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
     ```
   - Create `.env` file in the admin directory with:
     ```
     REACT_APP_API_URL=http://localhost:5000
     PORT=3001
     ```

4. Start the development servers
   ```bash
   # Start server (run this first)
   cd server
   npm start

   # Start client in a new terminal
   cd client
   npm start

   # Start admin in a new terminal
   cd admin
   # Set a different port for the admin app
   $env:PORT=3001  # For PowerShell
   # OR
   set PORT=3001   # For Command Prompt
   npm start
   ```

### Quick Start Guide

1. **Seed the database** (optional)
   ```bash
   cd server
   npm run seed
   ```
   This will populate your database with sample products, users, and categories.

2. **Access the application**
   - Customer Site: http://localhost:3000
   - Admin Dashboard: http://localhost:3001 (completely separate application)
   - API: http://localhost:5000/api

3. **Default Admin Account**
   - Email: admin@teestyle.com
   - Password: admin123
   *Note: Change these credentials in production!*

4. **Default Customer Account**
   - Email: john@example.com
   - Password: password123

## Deployment Guide

TeeStyle is configured for deployment on Vercel (frontend) and Render (backend). Follow these steps to deploy your application:

### Frontend Deployment (Vercel)

1. **Prepare your environment variables**
   - Create a `.env.production` file in the client directory with your production API URL
   - Set up any other required environment variables for production

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Configure the build settings as specified in `vercel.json`
   - Set up environment variables in the Vercel dashboard
   - Deploy your application

3. **Verify deployment**
   - Test all features on the deployed site
   - Ensure API connections are working properly

### Backend Deployment (Render)

1. **Set up MongoDB Atlas**
   - Create a MongoDB Atlas account and cluster
   - Configure database access and network settings
   - Get your connection string

2. **Deploy to Render**
   - Connect your GitHub repository to Render
   - Configure the service as specified in `render.yaml`
   - Set up all required environment variables
   - Deploy your application

3. **Verify backend deployment**
   - Test API endpoints using a tool like Postman
   - Ensure database connections are working properly

### Detailed Deployment Instructions

For step-by-step deployment instructions, refer to the `DEPLOYMENT.md` file in the project root.

## Security Best Practices

Follow these security best practices when working with the TeeStyle application:

1. **Environment Variables**
   - Never commit sensitive information (API keys, database credentials) to the repository
   - Use environment variables for all sensitive information
   - Keep `.env` files in your `.gitignore`

2. **Authentication & Authorization**
   - Use JWT for secure authentication
   - Implement proper role-based access control
   - Set secure and HttpOnly flags on cookies

3. **API Security**
   - Validate all user inputs
   - Implement rate limiting to prevent abuse
   - Use HTTPS for all communications

4. **Database Security**
   - Use parameterized queries to prevent injection attacks
   - Limit database user permissions
   - Regularly backup your database

5. **Frontend Security**
   - Implement CSP (Content Security Policy)
   - Sanitize user inputs to prevent XSS attacks
   - Keep dependencies updated

6. **Application Separation**
   - Maintain strict separation between client and admin applications
   - Remove any admin-related code from the client application
   - Use separate authentication tokens for client and admin applications
   - Never share sensitive admin functionality with the client application

7. **Credential Management**
   - Change default credentials before deploying to production
   - Implement strong password policies
   - Use environment-specific credentials for different deployment environments

## Important Note
HTML and CSS directly are not accepted in this project - only the specified frameworks (React, Styled Components, Node.js, Express.js, MongoDB) should be used for development.

## Design & Functionality Inspiration
For functionality and UI inspiration:
- Bewakoof.com
- TheSouledStore
- Sagacity

The creative aspects of UI, animations, and interactions are left open to the developers to innovate and bring out the best user experience with a comic book-inspired UI and animated superhero interactions.

## Troubleshooting

### Common Issues

1. **Port Conflicts**
   If you encounter port conflicts when starting the applications, you can kill processes using these ports with:
   ```bash
   # For Windows PowerShell
   netstat -ano | findstr :PORT_NUMBER
   taskkill /PID PID_NUMBER /F
   ```

2. **MongoDB Connection Issues**
   If you encounter issues connecting to MongoDB, the application will automatically fall back to in-memory mode for development purposes. To fix MongoDB connection issues:
   - Check your MongoDB connection string
   - Ensure MongoDB is running
   - Verify network connectivity

3. **Missing Dependencies**
   If you encounter missing dependency errors, try:
   ```bash
   npm cache clean --force
   npm install
   ```

## Maintenance

### Keeping the Codebase Clean

To maintain the separation between client and admin applications, periodically check for and remove any unnecessary admin-related files from the client application:

```bash
# Find admin-related files in the client application
find client/src -name "*admin*" -type f
```

### Updating Dependencies

Regularly update dependencies to ensure security and performance:

```bash
# Check for outdated dependencies
npm outdated

# Update dependencies
npm update
```

## License
MIT
