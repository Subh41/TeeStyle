import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiHeart, FiUser } from 'react-icons/fi';
import { RiStore2Line } from 'react-icons/ri';
import {
  StyledHeader,
  Nav,
  Logo,
  NavLinks,
  StyledNavLink,
  CartBadge,
  UserMenu
} from '../styled/Header.styled';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cartItemsCount = useSelector(state => state.cart.items.length);
  const wishlistCount = useSelector(state => state.wishlist.items.length);
  const { user } = useSelector(state => state.auth);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setShowUserMenu(false);
  };
  
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <StyledHeader>
      <Nav>
        <Logo to="/">
          <RiStore2Line />
          <span>TeeStyle</span>
          <small style={{ fontSize: '0.7rem', display: 'block', marginTop: '-5px' }}>Premium T-Shirts</small>
        </Logo>

        <NavLinks>
          <StyledNavLink to="/" className={isActive('/') ? 'active' : ''}>
            Home
          </StyledNavLink>
          <StyledNavLink to="/products" className={isActive('/products') ? 'active' : ''}>
            All T-Shirts
          </StyledNavLink>
          {/* Navigation links only */}
          <StyledNavLink to="/products?category=Men">
            Men
          </StyledNavLink>
          <StyledNavLink to="/products?category=Women">
            Women
          </StyledNavLink>
          {user?.role === 'admin' && (
            <StyledNavLink to="/admin/dashboard" className={isActive('/admin/dashboard') ? 'active' : ''}>
              Dashboard
            </StyledNavLink>
          )}
        </NavLinks>

        <div className="search-and-icons">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <FiSearch />
            </button>
          </form>

          <div className="nav-icons">
            <StyledNavLink to="/wishlist" className={isActive('/wishlist') ? 'active' : ''}>
              <FiHeart />
              {wishlistCount > 0 && <CartBadge>{wishlistCount}</CartBadge>}
            </StyledNavLink>

            <StyledNavLink to="/cart" className={`cart-icon ${isActive('/cart') ? 'active' : ''}`}>
              <FiShoppingCart />
              {cartItemsCount > 0 && <CartBadge>{cartItemsCount}</CartBadge>}
            </StyledNavLink>

            <div style={{ position: 'relative' }}>
              <div style={{ cursor: 'pointer' }} onClick={toggleUserMenu}>
                {user ? (
                  <UserMenu>
                    <div className="avatar">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span>{user.name.split(' ')[0]}</span>
                  </UserMenu>
                ) : (
                  <StyledNavLink to="/login" className={isActive('/login') ? 'active' : ''}>
                    <FiUser />
                  </StyledNavLink>
                )}
              </div>
              
              {showUserMenu && user && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  width: '200px',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  borderRadius: '4px',
                  padding: '10px 0',
                  zIndex: 10
                }}>
                  <div style={{ padding: '10px 20px', borderBottom: '1px solid #eee' }}>
                    <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{user.email}</div>
                  </div>
                  <Link to="/profile" style={{ display: 'block', padding: '10px 20px', color: '#333', textDecoration: 'none' }}>My Profile</Link>
                  <Link to="/orders" style={{ display: 'block', padding: '10px 20px', color: '#333', textDecoration: 'none' }}>My Orders</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin/dashboard" style={{ display: 'block', padding: '10px 20px', color: '#333', textDecoration: 'none' }}>Admin Dashboard</Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    style={{ 
                      display: 'block', 
                      width: '100%', 
                      textAlign: 'left', 
                      padding: '10px 20px', 
                      color: '#ff5757', 
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      fontSize: 'inherit'
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Nav>
    </StyledHeader>
  );
};

export default Header;
