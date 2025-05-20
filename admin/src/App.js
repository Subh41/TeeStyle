import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux Store
import store from './redux/store';

// Theme and Global Styles
import theme from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import UsersPage from './pages/UsersPage';
import DiscountsPage from './pages/DiscountsPage';
import PromotionsPage from './pages/PromotionsPage';
import SettingsPage from './pages/SettingsPage';

// Auth Guard Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminToken') !== null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/products" element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/orders" element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/users" element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/discounts" element={
              <ProtectedRoute>
                <DiscountsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/promotions" element={
              <ProtectedRoute>
                <PromotionsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
            
            {/* Redirect root to dashboard if authenticated, otherwise to login */}
            <Route path="/" element={
              localStorage.getItem('adminToken') ? 
                <Navigate to="/admin/dashboard" replace /> : 
                <Navigate to="/login" replace />
            } />
            
            {/* Redirect /admin to dashboard */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            
            {/* 404 - Redirect to dashboard */}
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </Router>
      
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
