import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import AdminSidebar from './AdminSidebar';

const LayoutContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  margin-left: 250px;
  padding: ${({ theme }) => theme.spacing.xl};
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
