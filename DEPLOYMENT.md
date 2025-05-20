# TeeStyle Deployment Guide

This guide will walk you through deploying the TeeStyle e-commerce application to production environments.

## Prerequisites

Before deploying, ensure you have:

1. A [GitHub](https://github.com/) account with your project repository
2. A [Vercel](https://vercel.com/) account for frontend deployment
3. A [Render](https://render.com/) account for backend deployment
4. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for database hosting
5. A [Cloudinary](https://cloudinary.com/) account for image storage
6. Payment gateway accounts (Stripe/PayPal/Razorpay)

## Step 1: Deploy the Database to MongoDB Atlas

1. Log in to your MongoDB Atlas account
2. Create a new project (if needed)
3. Build a new cluster (the free tier is sufficient for starting)
4. Set up database access:
   - Create a database user with read/write permissions
   - Add your IP address to the IP access list (or allow access from anywhere for testing)
5. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (replace `<password>` with your database user's password)

## Step 2: Deploy the Backend to Render

1. Log in to your Render account
2. Click "New" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: teestyle-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add environment variables:
   - `NODE_ENV`: production
   - `PORT`: 10000
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string for JWT token signing
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `PAYPAL_CLIENT_ID`: Your PayPal client ID
   - `RAZORPAY_KEY_ID`: Your Razorpay key ID
   - `RAZORPAY_KEY_SECRET`: Your Razorpay key secret
   - `CLIENT_URL`: Your frontend URL (e.g., https://teestyle.vercel.app)
6. Click "Create Web Service"

## Step 3: Deploy the Frontend to Vercel

1. Log in to your Vercel account
2. Click "Add New" and select "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: build
5. Add environment variables:
   - `REACT_APP_API_URL`: Your backend URL (e.g., https://teestyle-api.onrender.com)
   - `REACT_APP_STRIPE_PUBLIC_KEY`: Your Stripe publishable key
   - `REACT_APP_GOOGLE_CLIENT_ID`: Your Google client ID for authentication
6. Click "Deploy"

## Step 4: Verify Your Deployment

1. Test the frontend:
   - Visit your Vercel deployment URL
   - Ensure all pages load correctly
   - Test user authentication
   - Test product browsing and cart functionality

2. Test the backend:
   - Verify API endpoints are accessible from the frontend
   - Check that database operations work correctly
   - Ensure file uploads to Cloudinary are working

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend CORS configuration includes your frontend domain
2. **Database Connection Issues**: Verify your MongoDB Atlas connection string and network access settings
3. **Environment Variables**: Make sure all required environment variables are set correctly
4. **Build Failures**: Check build logs for errors and fix any issues in your code

### Monitoring

- Use Render's built-in logs to monitor your backend
- Use Vercel's analytics to monitor your frontend performance
- Set up MongoDB Atlas alerts for database monitoring

## Updating Your Deployment

### Backend Updates

1. Push changes to your GitHub repository
2. Render will automatically rebuild and deploy your backend

### Frontend Updates

1. Push changes to your GitHub repository
2. Vercel will automatically rebuild and deploy your frontend

## Security Considerations

1. Keep your environment variables secure
2. Regularly update dependencies to patch security vulnerabilities
3. Implement rate limiting on your API endpoints
4. Use HTTPS for all communications
5. Regularly backup your database
