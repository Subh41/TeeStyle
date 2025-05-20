# TeeStyle - Premium T-Shirt E-Commerce Platform

A modern, feature-rich e-commerce platform specializing in premium t-shirts for men and women. The application provides a seamless shopping experience with comprehensive product management, user authentication, cart functionality, and an intuitive admin dashboard.

## Completed Features

### User Features
- **User Authentication**: Secure register and login functionality
- **Profile Management**: Update personal information with letter avatar display
- **Product Browsing**: Browse products with category filters (Men's/Women's)
- **Product Details**: View detailed product information with size and color selection
- **Shopping Cart**: Add products with variations (size, color, quantity)
- **Wishlist**: Save favorite products for later
- **Checkout Process**: Multiple payment methods (Credit Card, PayPal, Cash on Delivery)
- **Order History**: View past orders and their status
- **Search Functionality**: Find products easily with the search feature

### Admin Features
- **Dashboard**: Overview of sales, products, and users
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and update order status
- **User Management**: View and manage user accounts
- **Inventory Control**: Track product stock levels

### Technical Features
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **State Management**: Centralized Redux store for application state
- **Form Validation**: Client-side validation for all forms
- **Persistent Cart**: Cart items saved between sessions
- **Dynamic Routing**: React Router with protected routes

## Tech Stack

### Frontend
- **React.js**: UI library for building the user interface
- **Redux Toolkit**: State management with slices and async thunks
- **Styled Components**: Component-level styling with theme support
- **React Router**: Navigation and routing
- **React Icons**: Icon library for UI elements

### Backend (Mock Implementation)
- **Local Storage**: Simulated backend for development
- **JWT**: Token-based authentication

## Project Structure

```
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── redux/          # Redux state management
│       ├── services/       # API services
│       └── utils/          # Utility functions
├── server/                 # Backend Node.js application
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── utils/              # Utility functions
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/e-commerce.git
   cd e-commerce
   ```

2. Install dependencies for the client
   ```bash
   cd client
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

## Usage

### Customer Access

Access the application at `http://localhost:3000`

You can register a new account or use the following test credentials:

```
Email: john@example.com
Password: password123
```

### Admin Access

To access the admin dashboard, log in with admin credentials:

```
Email: admin@example.com
Password: password123
```

The admin dashboard is available at `http://localhost:3000/admin/dashboard`

## Features Walkthrough

### Shopping Experience
1. Browse products on the homepage or by category
2. View product details and select size/color variations
3. Add items to cart or wishlist
4. Proceed to checkout and select payment method
5. Complete order and view order history

### Admin Management
1. View dashboard statistics
2. Manage products (add, edit, delete)
3. Process orders and update order status
4. View and manage user accounts

## Project Status

This project is complete with all core e-commerce functionality implemented. The frontend is deployed on Netlify and accessible at [https://teestyle-shop.windsurf.build](https://teestyle-shop.windsurf.build).

### Deployment Status
- **Frontend**: Deployed on Netlify
- **Backend**: Uses mock backend with local storage for demonstration

## License

MIT

