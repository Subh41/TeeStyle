import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import AdminSidebar from './AdminSidebar';

const LayoutContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 80px); /* Subtract header height */
  margin-top: 80px; /* Account for fixed header */
  position: relative;
  background: ${({ theme }) => theme.colors.background.deeper};
  
  /* Add subtle starry background */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
    background-size: 25px 25px;
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
  }
`;

const Content = styled.div`
  flex: 1;
  margin-left: 230px; /* Updated to match new sidebar width */
  padding: ${({ theme }) => theme.spacing.lg}; /* Reduced padding */
  position: relative;
  z-index: 1;
  overflow-y: auto;
  max-width: calc(100vw - 230px); /* Updated to match new sidebar width */
  min-height: calc(100vh - 80px); /* Ensure content area is at least as tall as the sidebar */
  height: calc(100vh - 80px); /* Fixed height */
  overflow-y: auto; /* Enable scrolling */
`;

const AdminLayout = () => {
  return (
    <LayoutContainer>
      <AdminSidebar />
      <Content>
        <Outlet />
      </Content>
    </LayoutContainer>
  );
};

export default AdminLayout;
