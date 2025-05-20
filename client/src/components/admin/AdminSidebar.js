import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FiHome, 
  FiShoppingBag, 
  FiShoppingCart, 
  FiUsers, 
  FiSettings,
  FiPlusCircle,
  FiTag,
  FiGift
} from 'react-icons/fi';

const SidebarContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.deeper};
  width: 230px; /* Reduced width */
  min-height: calc(100vh - 80px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  padding: ${({ theme }) => theme.spacing.md} 0; /* Reduced padding */
  position: fixed;
  left: 0;
  top: 80px;
  overflow-y: auto;
  border-right: 2px solid ${({ theme }) => theme.colors.secondary};
  z-index: 900; /* Increased z-index to ensure it stays above all content */
  
  /* Add starry background effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.1;
    pointer-events: none;
    z-index: -1;
  }
`;

const SidebarHeader = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.md}; /* Reduced padding */
  margin-bottom: ${({ theme }) => theme.spacing.md}; /* Reduced margin */
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.sm}; /* Reduced padding */
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
  
  h2 {
    color: ${({ theme }) => theme.colors.secondary};
    margin: 0;
    font-size: 1.1rem; /* Reduced font size */
    font-family: ${({ theme }) => theme.typography.heading.fontFamily};
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  p {
    color: ${({ theme }) => theme.colors.white};
    margin: 3px 0 0; /* Reduced margin */
    font-size: 0.8rem; /* Reduced font size */
    opacity: 0.8;
  }
`;
const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarMenuItem = styled.li`
  margin-bottom: 5px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: ${({ theme }) => theme.colors.secondary};
    transform: scaleY(0);
    transition: transform 0.3s ease;
    transform-origin: bottom;
    z-index: 1;
  }
  
  &:hover::before {
    transform: scaleY(1);
  }
  
  a {
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md}; /* Reduced padding */
    color: ${({ theme, active }) => active ? theme.colors.secondary : theme.colors.white};
    text-decoration: none;
    transition: all ${({ theme }) => theme.transitions.fast};
    border-left: 3px solid ${({ theme, active }) => active ? theme.colors.secondary : 'transparent'};
    background: ${({ theme, active }) => active ? 'rgba(255, 202, 40, 0.15)' : 'transparent'};
    font-family: ${({ theme }) => theme.typography.heading.fontFamily};
    letter-spacing: 0.5px;
    font-size: 0.9rem; /* Reduced font size */
    font-weight: ${({ active }) => active ? '700' : '500'};
    position: relative;
    z-index: 2;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: ${({ theme }) => theme.colors.secondary};
      transform: translateX(5px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      border-left-color: transparent;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
      transform: translateX(-100%);
      transition: transform 0.6s ease;
      z-index: -1;
    }
    
    &:hover::after {
      transform: translateX(100%);
    }
    
    svg {
      margin-right: ${({ theme }) => theme.spacing.md};
      font-size: 1.2rem;
      color: ${({ theme, active }) => active ? theme.colors.secondary : 'rgba(255, 255, 255, 0.8)'};
      filter: ${({ theme, active }) => active ? 'drop-shadow(0 0 3px rgba(255, 202, 40, 0.5))' : 'none'};
      transition: transform 0.3s ease, color 0.3s ease;
    }
    
    &:hover svg {
      transform: scale(1.2);
      color: ${({ theme }) => theme.colors.secondary};
      filter: drop-shadow(0 0 3px rgba(255, 202, 40, 0.5));
    }
  }
`;

const AdminSidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname.includes(path);
  };
  
  return (
    <SidebarContainer>
      <SidebarHeader>
        <h2>Admin Panel</h2>
        <p>Manage your store</p>
      </SidebarHeader>
      
      <SidebarMenu>
        <SidebarMenuItem active={isActive('/admin/dashboard')}>
          <Link to="/admin/dashboard">
            <FiHome /> Dashboard
          </Link>
        </SidebarMenuItem>
        
        <SidebarMenuItem active={isActive('/admin/products') && !isActive('/admin/product/')}>
          <Link to="/admin/products">
            <FiShoppingBag /> Products
          </Link>
        </SidebarMenuItem>
        
        <SidebarMenuItem active={isActive('/admin/product/')}>
          <Link to="/admin/product">
            <FiPlusCircle /> Add Product
          </Link>
        </SidebarMenuItem>
        
        <SidebarMenuItem active={isActive('/admin/orders')}>
          <Link to="/admin/orders">
            <FiShoppingCart /> Orders
          </Link>
        </SidebarMenuItem>
        
        <SidebarMenuItem active={isActive('/admin/users')}>
          <Link to="/admin/users">
            <FiUsers /> Users
          </Link>
        </SidebarMenuItem>
        
        <SidebarMenuItem active={isActive('/admin/discounts')}>
          <Link to="/admin/discounts">
            <FiTag /> Discount Coupons
          </Link>
        </SidebarMenuItem>
        
        <SidebarMenuItem active={isActive('/admin/promotions')}>
          <Link to="/admin/promotions">
            <FiGift /> Special Promotions
          </Link>
        </SidebarMenuItem>
        
        <SidebarMenuItem active={isActive('/admin/settings')}>
          <Link to="/admin/settings">
            <FiSettings /> Settings
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default AdminSidebar;
