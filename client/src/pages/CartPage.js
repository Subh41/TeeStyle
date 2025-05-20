import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/slices/cartSlice';
import styled from 'styled-components';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

const Container = styled.div`
  max-width: 1200px;
  margin: 100px auto 2rem; /* Added top margin to account for fixed header */
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.light};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  text-shadow: ${({ theme }) => theme.effects.textShadow.starlight};
  font-size: 2.5rem;
  letter-spacing: 1px;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.secondary}, transparent);
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.background.starry}, ${theme.colors.background.deeper})`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 2px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  /* Comic book style border */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 95%, rgba(255,255,255,0.1) 100%);
    background-size: 100% 100%;
    pointer-events: none;
    z-index: 2;
  }
  
  /* Starry background effect */
  &::after {
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
    z-index: 1;
  }

  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.secondary};
    font-family: ${({ theme }) => theme.typography.heading.fontFamily};
    text-shadow: 0 0 10px rgba(255, 202, 40, 0.5);
    position: relative;
    z-index: 5;
  }

  p {
    color: ${({ theme }) => theme.colors.text.light};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    position: relative;
    z-index: 5;
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
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.background.starry}, ${theme.colors.background.deeper})`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 2px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: rgba(255, 202, 40, 0.3);
  }
  
  /* Comic book style border */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 95%, rgba(255,255,255,0.1) 100%);
    background-size: 100% 100%;
    pointer-events: none;
    z-index: 2;
  }
  
  /* Starry background effect */
  &::after {
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
    z-index: 1;
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    position: relative;
    z-index: 5;
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
      border-color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  position: relative;
  z-index: 5;

  h3 {
    margin: 0;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.secondary};
    font-family: ${({ theme }) => theme.typography.heading.fontFamily};
    text-shadow: 0 0 8px rgba(255, 202, 40, 0.5);
    font-size: 1.2rem;
    letter-spacing: 0.5px;
  }

  .price {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 700;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-size: 1.1rem;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  }
  
  .variant {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.text.light};
  }
  
  .variant-item {
    background: rgba(0, 0, 0, 0.3);
    padding: 4px 10px;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  position: relative;
  z-index: 5;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  position: relative;
  z-index: 5;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    background: rgba(0, 0, 0, 0.3);
    color: ${({ theme }) => theme.colors.secondary};
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.fast};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

    &:hover {
      background: rgba(255, 202, 40, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
    
    &:active {
      transform: translateY(1px);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
  }

  span {
    min-width: 40px;
    text-align: center;
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;
    font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.colors.heroRed};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: rgba(211, 47, 47, 0.3);
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 5;
  
  &:hover {
    background: rgba(211, 47, 47, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 0 10px rgba(211, 47, 47, 0.5);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

const Summary = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.background.starry}, ${theme.colors.background.deeper})`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 2px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  /* Comic book style border */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 95%, rgba(255,255,255,0.1) 100%);
    background-size: 100% 100%;
    pointer-events: none;
    z-index: 2;
  }
  
  /* Starry background effect */
  &::after {
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
    z-index: 1;
  }

  h2 {
    margin: 0;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.secondary};
    font-family: ${({ theme }) => theme.typography.heading.fontFamily};
    text-shadow: 0 0 10px rgba(255, 202, 40, 0.5);
    letter-spacing: 0.5px;
    position: relative;
    z-index: 5;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.secondary}, transparent);
    }
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text.light};
  position: relative;
  z-index: 5;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  letter-spacing: 0.5px;
  
  span:first-child {
    font-weight: 500;
  }
  
  span:last-child {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white};
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  }

  &:last-of-type {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    padding-bottom: ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: 600;
    font-size: 1.2rem;
    text-shadow: 0 0 8px rgba(255, 202, 40, 0.3);
    
    span:last-child {
      color: ${({ theme }) => theme.colors.secondary};
      font-weight: 700;
      text-shadow: 0 0 10px rgba(255, 202, 40, 0.5);
    }
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
  font-weight: 600;
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  letter-spacing: 0.5px;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 123, 255, 0.2);
  text-transform: uppercase;
  z-index: 5;
  
  /* Shine effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-25deg);
    transition: all 0.75s ease;
    z-index: 1;
  }
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 202, 40, 0.4);
    
    &::before {
      left: 150%;
    }
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  }
`;

const ShopButton = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  letter-spacing: 0.5px;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 123, 255, 0.2);
  text-transform: uppercase;
  z-index: 5;
  
  /* Shine effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-25deg);
    transition: all 0.75s ease;
    z-index: 1;
  }
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 202, 40, 0.4);
    
    &::before {
      left: 150%;
    }
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
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
