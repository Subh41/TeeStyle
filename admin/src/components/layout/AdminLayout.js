import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { FiShoppingBag, FiUsers, FiSettings, FiLogOut, FiPackage, FiMenu, FiX } from 'react-icons/fi';
import { FaBullhorn, FaPercentage } from 'react-icons/fa';
import { RiDashboardLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = ({ children, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <LayoutContainer>
      {/* Mobile Menu Toggle */}
      <MobileMenuToggle onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </MobileMenuToggle>
      
      {/* Sidebar */}
      <AnimatePresence>
        <Sidebar 
          as={motion.div}
          initial={{ x: -250 }}
          animate={{ x: isMobileMenuOpen ? 0 : (window.innerWidth <= 768 ? -250 : 0) }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <LogoContainer>
            <Logo to="/admin">
              <span>TeeStyle</span>
              <small>Admin Panel</small>
            </Logo>
          </LogoContainer>
          
          <NavLinks>
            <NavItem to="/admin/dashboard" active={location.pathname === '/admin/dashboard' ? 'true' : undefined}>
              <RiDashboardLine />
              <span>Dashboard</span>
            </NavItem>
            
            <NavItem to="/admin/products" active={location.pathname.includes('/admin/products') ? 'true' : undefined}>
              <FiShoppingBag />
              <span>Products</span>
            </NavItem>
            
            <NavItem to="/admin/orders" active={location.pathname.includes('/admin/orders') ? 'true' : undefined}>
              <FiPackage />
              <span>Orders</span>
            </NavItem>
            
            <NavItem to="/admin/users" active={location.pathname.includes('/admin/users') ? 'true' : undefined}>
              <FiUsers />
              <span>Users</span>
            </NavItem>
            
            <NavItem to="/admin/discounts" active={location.pathname.includes('/admin/discounts') ? 'true' : undefined}>
              <FaPercentage />
              <span>Discounts</span>
            </NavItem>
            
            <NavItem to="/admin/promotions" active={location.pathname.includes('/admin/promotions') ? 'true' : undefined}>
              <FaBullhorn />
              <span>Promotions</span>
            </NavItem>
            
            <NavItem to="/admin/settings" active={location.pathname.includes('/admin/settings') ? 'true' : undefined}>
              <FiSettings />
              <span>Settings</span>
            </NavItem>
          </NavLinks>
          
          <LogoutButton onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </LogoutButton>
        </Sidebar>
      </AnimatePresence>
      
      {/* Main Content */}
      <MainContent isMobileMenuOpen={isMobileMenuOpen}>
        <MainContentInner>
          {title && <PageTitle>{title}</PageTitle>}
          {children}
        </MainContentInner>
      </MainContent>
    </LayoutContainer>
  );
};

// Styled components with superhero theme
const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.deeper};
  position: relative;
  
  /* Starry background effect */
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    background-image: 
      radial-gradient(2px 2px at 40px 60px, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0)),
      radial-gradient(2px 2px at 20px 50px, rgba(255, 255, 255, 0.9), rgba(0, 0, 0, 0)),
      radial-gradient(3px 3px at 30px 100px, rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0)),
      radial-gradient(2px 2px at 40px 60px, rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0)),
      radial-gradient(4px 4px at 110px 70px, rgba(255, 255, 255, 0.9), rgba(0, 0, 0, 0)),
      radial-gradient(2px 2px at 10px 30px, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0));
    background-size: 200% 200%;
    animation: starryBackground 80s linear infinite;
  }
  
  /* Animated stars */
  &::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-image: 
      radial-gradient(1px 1px at 150px 150px, rgba(255, 202, 40, 0.8), rgba(0, 0, 0, 0)),
      radial-gradient(1px 1px at 250px 100px, rgba(255, 202, 40, 0.9), rgba(0, 0, 0, 0)),
      radial-gradient(1px 1px at 50px 200px, rgba(255, 202, 40, 0.7), rgba(0, 0, 0, 0)),
      radial-gradient(1px 1px at 300px 250px, rgba(255, 202, 40, 0.6), rgba(0, 0, 0, 0));
    background-repeat: repeat;
    animation: twinkle 6s infinite alternate;
  }
  
  @keyframes starryBackground {
    from { background-position: 0 0; }
    to { background-position: 100% 100%; }
  }
  
  @keyframes twinkle {
    0% { opacity: 0.3; }
    50% { opacity: 1; }
    100% { opacity: 0.3; }
  }
`;

const MobileMenuToggle = styled.button`
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1100;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background.deeper};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px ${({ theme }) => theme.colors.secondary};
  }
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const Sidebar = styled.div`
  width: 250px;
  background: ${({ theme }) => `linear-gradient(180deg, ${theme.colors.background.starry}, ${theme.colors.background.deeper})`};
  color: ${({ theme }) => theme.colors.text.light};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  border-right: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.3);
  position: fixed;
  height: 100vh;
  z-index: 1000;
  overflow-y: auto;
  
  /* Comic book style border */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, 
      rgba(255, 202, 40, 0.8), 
      rgba(255, 255, 255, 0.1),
      rgba(255, 202, 40, 0.8)
    );
    z-index: 2;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  text-shadow: ${({ theme }) => theme.effects.textShadow.starlight};
  transition: all ${({ theme }) => theme.transitions.fast};
  letter-spacing: 1px;
  position: relative;
  transform-style: preserve-3d;
  perspective: 500px;
  
  span {
    position: relative;
    display: inline-block;
    transform: translateZ(10px);
  }
  
  small {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.8;
    font-family: ${({ theme }) => theme.typography.body.fontFamily};
    text-shadow: none;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.white};
    text-shadow: 0 0 15px ${({ theme }) => theme.colors.secondary};
    transform: scale(1.02);
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ active, theme }) => active ? theme.colors.secondary : theme.colors.white};
  text-decoration: none;
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  /* Comic book style hover effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      rgba(255, 202, 40, 0), 
      rgba(255, 202, 40, 0.1), 
      rgba(255, 202, 40, 0)
    );
    z-index: -1;
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  background: ${({ active, theme }) => active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border: ${({ active, theme }) => active ? `1px solid ${theme.colors.secondary}` : '1px solid transparent'};
  box-shadow: ${({ active }) => active ? '0 0 10px rgba(255, 202, 40, 0.3)' : 'none'};
  
  svg {
    font-size: 1.2rem;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${({ theme }) => theme.colors.secondary};
    text-shadow: 0 0 5px ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
    
    &::before {
      transform: translateX(100%);
    }
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: rgba(211, 47, 47, 0.2);
  color: ${({ theme }) => theme.colors.error};
  border: 1px solid rgba(211, 47, 47, 0.3);
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  margin-top: ${({ theme }) => theme.spacing.xl};
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  /* Comic book style effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(211, 47, 47, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    background: rgba(211, 47, 47, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(211, 47, 47, 0.2);
    
    &::before {
      opacity: 1;
      transform: scale(1.5);
    }
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  margin-left: ${({ isMobileMenuOpen }) => (window.innerWidth <= 768 ? 0 : '250px')};
  transition: margin-left ${({ theme }) => theme.transitions.normal};
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 60px;
  }
`;

const MainContentInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  text-shadow: ${({ theme }) => theme.effects.textShadow.starlight};
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  letter-spacing: 2px;
  text-align: center;
  position: relative;
  margin: 2rem 0;
  
  /* Comic style heading with decorative stars */
  &::before, &::after {
    content: '★';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.secondary};
    font-size: 1.5rem;
    animation: twinkle 2s infinite alternate;
  }
  
  &::before {
    left: -30px;
  }
  
  &::after {
    right: -30px;
  }
  
  /* Comic style burst effect */
  @media (min-width: 768px) {
    &::before {
      content: '✶ ✦';
      left: -60px;
    }
    
    &::after {
      content: '✦ ✶';
      right: -60px;
    }
  }
`;

export default AdminLayout;
