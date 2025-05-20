import React from 'react';
import { Link } from 'react-router-dom';
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

const OrdersList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const OrderCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gray[50]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};

  h3 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const OrderDetails = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const OrderInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  div {
    h4 {
      margin: 0;
      color: ${({ theme }) => theme.colors.text.secondary};
      font-weight: normal;
      margin-bottom: ${({ theme }) => theme.spacing.xs};
    }

    p {
      margin: 0;
      color: ${({ theme }) => theme.colors.text.primary};
      font-weight: 500;
    }
  }
`;

const ViewButton = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const OrdersPage = () => {
  // This would typically come from your Redux store
  const orders = [];

  return (
    <Container>
      <Title>My Orders</Title>
      <OrdersList>
        {orders.length === 0 ? (
          <OrderCard>
            <OrderDetails>
              <p>No orders found.</p>
            </OrderDetails>
          </OrderCard>
        ) : (
          orders.map((order) => (
            <OrderCard key={order._id}>
              <OrderHeader>
                <h3>Order #{order._id}</h3>
                <ViewButton to={`/order/${order._id}`}>View Details</ViewButton>
              </OrderHeader>
              <OrderDetails>
                <OrderInfo>
                  <div>
                    <h4>Date</h4>
                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h4>Total</h4>
                    <p>${order.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <h4>Status</h4>
                    <p>{order.status}</p>
                  </div>
                </OrderInfo>
              </OrderDetails>
            </OrderCard>
          ))
        )}
      </OrdersList>
    </Container>
  );
};

export default OrdersPage;
