import React from 'react';
import { useParams } from 'react-router-dom';
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

const OrderCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
`;

const OrderHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.gray[50]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};

  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const OrderInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};

  div {
    h3 {
      margin: 0;
      color: ${({ theme }) => theme.colors.text.secondary};
      font-weight: normal;
      margin-bottom: ${({ theme }) => theme.spacing.sm};
    }

    p {
      margin: 0;
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }
`;

const OrderItems = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ItemsList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ItemCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gray[50]};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

const ItemInfo = styled.div`
  flex: 1;

  h4 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    margin: ${({ theme }) => theme.spacing.xs} 0;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const OrderDetailPage = () => {
  const { id } = useParams();

  // This would typically come from your Redux store
  const order = {
    _id: id,
    status: 'Processing',
    createdAt: new Date(),
    total: 0,
    items: [],
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  };

  return (
    <Container>
      <Title>Order Details</Title>
      <OrderCard>
        <OrderHeader>
          <h2>Order #{order._id}</h2>
        </OrderHeader>
        <OrderInfo>
          <div>
            <h3>Order Date</h3>
            <p>{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <h3>Status</h3>
            <p>{order.status}</p>
          </div>
          <div>
            <h3>Total</h3>
            <p>${order.total.toFixed(2)}</p>
          </div>
        </OrderInfo>
        <OrderInfo>
          <div>
            <h3>Shipping Address</h3>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </OrderInfo>
        <OrderItems>
          <h3>Items</h3>
          <ItemsList>
            {order.items.length === 0 ? (
              <p>No items found.</p>
            ) : (
              order.items.map((item) => (
                <ItemCard key={item._id}>
                  <img src={item.image} alt={item.name} />
                  <ItemInfo>
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                  </ItemInfo>
                </ItemCard>
              ))
            )}
          </ItemsList>
        </OrderItems>
      </OrderCard>
    </Container>
  );
};

export default OrderDetailPage;
