import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  h3 {
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  .value {
    font-size: 2rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Dashboard = () => {
  return (
    <Container>
      <Title>Admin Dashboard</Title>
      <StatsGrid>
        <StatCard>
          <h3>Total Orders</h3>
          <div className="value">0</div>
        </StatCard>
        <StatCard>
          <h3>Total Products</h3>
          <div className="value">0</div>
        </StatCard>
        <StatCard>
          <h3>Total Users</h3>
          <div className="value">0</div>
        </StatCard>
        <StatCard>
          <h3>Total Revenue</h3>
          <div className="value">$0</div>
        </StatCard>
      </StatsGrid>
    </Container>
  );
};

export default Dashboard;
