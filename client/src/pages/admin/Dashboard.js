import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  font-size: 1.8rem;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-align: center;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.1);
  }

  h3 {
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: 1.1rem;
    font-weight: 600;
  }

  .value {
    font-size: 1.8rem;
    font-weight: 700;
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
