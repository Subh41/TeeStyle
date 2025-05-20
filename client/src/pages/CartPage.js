import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/slices/cartSlice';
import styled from 'styled-components';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CartItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

const ItemInfo = styled.div`
  flex: 1;

  h3 {
    margin: 0;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .price {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  .variant {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
  
  .variant-item {
    background: ${({ theme }) => theme.colors.gray[100]};
    padding: 4px 8px;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    background: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.text.primary};
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.fast};

    &:hover {
      background: ${({ theme }) => theme.colors.gray[200]};
    }
  }

  span {
    min-width: 40px;
    text-align: center;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.error};
    opacity: 0.9;
  }
`;

const Summary = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};

  h2 {
    margin: 0;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  color: ${({ theme }) => theme.colors.text.secondary};

  &:last-of-type {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    padding-bottom: ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 600;
  }
`;

const CheckoutButton = styled(Link)`
  display: block;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const ShopButton = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const CartPage = () => {
  const dispatch = useDispatch();
  
  const handleUpdateQuantity = (cartItemId, newQuantity) => {
    dispatch(updateQuantity({ cartItemId, quantity: newQuantity }));
  };
  
  const handleRemoveFromCart = (cartItemId) => {
    dispatch(removeFromCart(cartItemId));
  };
  
  const { items, total } = useSelector((state) => state.cart);

  if (items.length === 0) {
    return (
      <Container>
        <Title>Shopping Cart</Title>
        <EmptyCart>
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart and they will show up here</p>
          <ShopButton to="/">Continue Shopping</ShopButton>
        </EmptyCart>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Shopping Cart</Title>
      <Grid>
        <CartItems>
          {items.map((item) => {
            return (
              <CartItem key={item.cartItemId}>
                <img src={item.image} alt={item.name} />
                <ItemInfo>
                  <h3>{item.name}</h3>
                  <div className="price">${item.price.toFixed(2)}</div>
                  <div className="variant">
                    {item.selectedSize && (
                      <div className="variant-item">Size: {item.selectedSize}</div>
                    )}
                    {item.selectedColor && (
                      <div className="variant-item">Color: {item.selectedColor}</div>
                    )}
                  </div>
                  <div className="item-total">
                    Item total: ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </ItemInfo>
                <ItemActions>
                  <QuantityControl>
                    <button onClick={() => handleUpdateQuantity(item.cartItemId, item.quantity - 1)}>
                      <FiMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.cartItemId, item.quantity + 1)}>
                      <FiPlus />
                    </button>
                  </QuantityControl>
                  <DeleteButton onClick={() => handleRemoveFromCart(item.cartItemId)}>
                    <FiTrash2 />
                  </DeleteButton>
                </ItemActions>
              </CartItem>
            );
          })}
        </CartItems>
        <Summary>
          <h2>Order Summary</h2>
          <SummaryItem>
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Shipping</span>
            <span>Free</span>
          </SummaryItem>
          <SummaryItem>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </SummaryItem>
          <CheckoutButton to="/checkout">Proceed to Checkout</CheckoutButton>
        </Summary>
      </Grid>
    </Container>
  );
};

export default CartPage;
