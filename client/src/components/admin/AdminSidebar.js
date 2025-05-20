import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FiHome, 
  FiShoppingBag, 
  FiShoppingCart, 
  FiUsers, 
  FiSettings,
  FiPlusCircle
} from 'react-icons/fi';

const SidebarContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  width: 250px;
  min-height: calc(100vh - 80px);
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacing.lg} 0;
  position: fixed;
  left: 0;
  top: 80px;
`;

const SidebarHeader = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  h2 {
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 0;
    font-size: 1.2rem;
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
    font-size: 0.9rem;
  }
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SidebarMenuItem = styled.li`
  a {
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.text.primary};
    text-decoration: none;
    transition: all ${({ theme }) => theme.transitions.fast};
    border-left: 3px solid ${({ theme, active }) => active ? theme.colors.primary : 'transparent'};
    background: ${({ theme, active }) => active ? theme.colors.gray[100] : 'transparent'};
    
    &:hover {
      background: ${({ theme }) => theme.colors.gray[100]};
      color: ${({ theme }) => theme.colors.primary};
    }
    
    svg {
      margin-right: ${({ theme }) => theme.spacing.md};
      font-size: 1.2rem;
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
