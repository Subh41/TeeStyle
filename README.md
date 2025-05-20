# TeeStyle - Starry Night & Comic Superheroes Theme E-Commerce

A MERN stack e-commerce application specializing in t-shirts featuring superhero designs with an immersive UI inspired by Starry Night and Comic Superheroes theme. The platform offers a comprehensive shopping experience with personalized superhero avatars, robust admin management, and secure checkout features.

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

```
├── client/                      # Frontend React application
│   ├── public/                  # Static files
│   └── src/                     # React source code
│       ├── components/          # Reusable components
│       │   ├── admin/           # Admin panel components
│       │   ├── auth/            # Authentication components
│       │   ├── cart/            # Shopping cart components
│       │   ├── checkout/        # Checkout components
│       │   ├── layout/          # Layout components (Header, Footer)
│       │   ├── products/        # Product-related components
│       │   ├── profile/         # User profile components
│       │   ├── styled/          # Styled components
│       │   └── ui/              # UI components (buttons, modals, etc.)
│       ├── pages/               # Page components
│       │   ├── admin/           # Admin panel pages
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
├── server/                      # Backend Node.js application
│   ├── config/                  # Configuration files
│   ├── controllers/             # Request handlers
│   ├── middleware/              # Custom middleware
│   ├── models/                  # Database models
│   ├── routes/                  # API routes
│   ├── utils/                   # Utility functions
│   └── server.js                # Main server file
└── README.md                    # Project documentation
```



## Current Implementation Status

### Completed Features
- **User Interface**
  - Responsive design with Starry Night & Comic Superheroes theme
  - Header with navigation and user menu
  - Product catalog with filtering and search
  - Product detail pages with images and information
  - Shopping cart functionality
  - User profile management

- **Admin Panel**
  - Dashboard with sales overview
  - Product management (add, edit, delete)
  - Order management system
  - User management
  - Discount and promotion management
  - Settings configuration

- **Authentication**
  - User registration and login
  - Social authentication with Google
  - Password reset functionality
  - Protected routes for authenticated users

- **State Management**
  - Redux implementation for products, cart, auth, and discounts
  - Persistent cart and user sessions

### In Progress
- Advanced payment gateway integration
- Review and rating system
- Referral program implementation
- Advanced analytics dashboard
- Email notification system

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/TeeStyle.git
   cd TeeStyle
   ```

2. Install dependencies for client and server
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables
   - Create `.env` file in the server directory with the following variables:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     STRIPE_SECRET_KEY=your_stripe_secret_key
     ```

4. Start the development servers
   ```bash
   # Start server
   cd server
   npm run dev

   # Start client in a new terminal
   cd client
   npm start
   ```

## Important Note
HTML and CSS directly are not accepted in this project - only the specified frameworks (React, Tailwind CSS, Node.js, Express.js, MongoDB) should be used for development.

## Design & Functionality Inspiration
For functionality and UI inspiration:
- Bewakoof.com
- TheSouledStore
- Sagacity

The creative aspects of UI, animations, and interactions are left open to the developers to innovate and bring out the best user experience with a comic book-inspired UI and animated superhero interactions.

## License
MIT

