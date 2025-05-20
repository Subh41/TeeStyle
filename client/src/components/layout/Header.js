import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiLogOut, FiPackage, FiHome, FiCreditCard } from 'react-icons/fi';
import { RiStore2Line, RiUserStarLine, RiDashboardLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import {
  StyledHeader,
  Nav,
  Logo,
  NavLinks,
  StyledNavLink,
  CartBadge,
  UserMenu,
  UserDropdownMenu,
  UserDropdownHeader,
  UserDropdownItem,
  UserDropdownButton,
  SearchButton,
  SearchPopup,
  SearchInput,
  SearchSubmitButton
} from '../styled/Header.styled';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  
  const cartItemsCount = useSelector(state => state.cart.items.length);
  const wishlistCount = useSelector(state => state.wishlist.items.length);
  const { user } = useSelector(state => state.auth);
  
  // Close dropdown and search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {      
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchBar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setShowUserMenu(false);
  };
  
  const toggleUserMenu = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setShowUserMenu(!showUserMenu);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [dropdownRef, userMenuRef]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchBar(false);
      setSearchQuery('');
    }
  };
  
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (!showSearchBar) {
      // Focus the search input when it appears
      setTimeout(() => {
        const searchInput = document.getElementById('header-search-input');
        if (searchInput) searchInput.focus();
      }, 100);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Animation variants for Framer Motion
  const logoVariants = {
    hover: { 
      scale: 1.05, 
      textShadow: '0 0 15px rgba(255, 202, 40, 0.8), 0 0 20px rgba(255, 202, 40, 0.5)',
      transition: { duration: 0.3, yoyo: Infinity, repeatDelay: 0.5 }
    }
  };
  
  const navItemVariants = {
    hover: { 
      y: -3, 
      color: '#ffca28',
      textShadow: '0 0 8px rgba(255, 202, 40, 0.5)',
      transition: { duration: 0.2 }
    }
  };

  return (
    <StyledHeader>
      <Nav>
        <motion.div whileHover="hover" variants={logoVariants}>
          <Logo to="/">
            <RiStore2Line />
            <span>TeeStyle</span>
            <small style={{ fontSize: '0.7rem', display: 'block', marginTop: '-5px' }}>Premium T-Shirts</small>
          </Logo>
        </motion.div>

        <NavLinks>
          <motion.div whileHover="hover" variants={navItemVariants}>
            <StyledNavLink to="/" className={isActive('/') ? 'active' : ''}>
              Home
            </StyledNavLink>
          </motion.div>
          
          <motion.div whileHover="hover" variants={navItemVariants}>
            <StyledNavLink to="/products?category=Marvel" className={location.search.includes('Marvel') ? 'active' : ''}>
              Marvel
            </StyledNavLink>
          </motion.div>
          
          <motion.div whileHover="hover" variants={navItemVariants}>
            <StyledNavLink to="/products?category=DC Comics" className={location.search.includes('DC') ? 'active' : ''}>
              DC Comics
            </StyledNavLink>
          </motion.div>
          
          <motion.div whileHover="hover" variants={navItemVariants}>
            <StyledNavLink to="/products?category=Anime" className={location.search.includes('Anime') ? 'active' : ''}>
              Anime
            </StyledNavLink>
          </motion.div>
          
          {user?.role === 'admin' && (
            <motion.div whileHover="hover" variants={navItemVariants}>
              <StyledNavLink to="/admin/dashboard" className={isActive('/admin/dashboard') ? 'active' : ''}>
                Dashboard
              </StyledNavLink>
            </motion.div>
          )}
        </NavLinks>

        <div className="right-section">
          <div ref={searchRef} style={{ position: 'relative' }}>
            <motion.div>
              <SearchButton 
                onClick={toggleSearchBar}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiSearch />
              </SearchButton>
            </motion.div>
            
            {showSearchBar && (
              <SearchPopup>
                <div className="search-container">
                  <form onSubmit={handleSearch}>
                    <SearchInput 
                      type="text" 
                      id="header-search-input"
                      placeholder="Search for superhero tees..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <SearchSubmitButton type="submit">
                      <FiSearch />
                    </SearchSubmitButton>
                  </form>
                </div>
              </SearchPopup>
            )}
          </div>

          <div className="nav-icons">
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <StyledNavLink to="/wishlist" className={isActive('/wishlist') ? 'active' : ''}>
                <FiHeart />
                {wishlistCount > 0 && <CartBadge>{wishlistCount}</CartBadge>}
              </StyledNavLink>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <StyledNavLink to="/cart" className={`cart-icon ${isActive('/cart') ? 'active' : ''}`}>
                <FiShoppingCart />
                {cartItemsCount > 0 && <CartBadge>{cartItemsCount}</CartBadge>}
              </StyledNavLink>
            </motion.div>

            <div style={{ position: 'relative', zIndex: 1500 }}>
              <motion.div 
                ref={userMenuRef} 
                onClick={toggleUserMenu} 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{ cursor: 'pointer' }}
              >
                {user ? (
                  <UserMenu>
                    <div className="avatar">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span>{user.name.split(' ')[0]}</span>
                  </UserMenu>
                ) : (
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                    <StyledNavLink to="/login" className={isActive('/login') ? 'active' : ''}>
                      <FiUser />
                    </StyledNavLink>
                  </motion.div>
                )}
              </motion.div>
              
              {showUserMenu && user && (
                <UserDropdownMenu ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
                  <UserDropdownHeader>
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </UserDropdownHeader>
                  
                  <UserDropdownItem to="/profile">
                    <RiUserStarLine />
                    Profile Info
                  </UserDropdownItem>
                  
                  <UserDropdownItem to="/profile/edit">
                    <FiUser />
                    Edit Profile
                  </UserDropdownItem>
                  
                  <UserDropdownItem to="/orders">
                    <FiPackage />
                    Order History
                  </UserDropdownItem>
                  
                  <UserDropdownItem to="/addresses">
                    <FiHome />
                    Saved Addresses
                  </UserDropdownItem>
                  
                  <UserDropdownItem to="/payment-methods">
                    <FiCreditCard />
                    Payment Methods
                  </UserDropdownItem>
                  
                  {user.role === 'admin' && (
                    <UserDropdownItem to="/admin/dashboard">
                      <RiDashboardLine />
                      Admin Dashboard
                    </UserDropdownItem>
                  )}
                  
                  <UserDropdownButton onClick={handleLogout}>
                    <FiLogOut />
                    Logout
                  </UserDropdownButton>
                </UserDropdownMenu>
              )}
            </div>
          </div>
        </div>
      </Nav>
    </StyledHeader>
  );
};

export default Header;
