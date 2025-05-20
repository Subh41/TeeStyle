import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/slices/wishlistSlice';
import { addToCart } from '../redux/slices/cartSlice';
import styled from 'styled-components';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const EmptyWishlist = styled.div`
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const WishlistItem = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 100%;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};

  h3 {
    margin: 0;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  .price {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Button = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ primary, theme }) =>
    primary ? theme.colors.primary : theme.colors.gray[100]};
  color: ${({ primary, theme }) =>
    primary ? theme.colors.white : theme.colors.text.primary};
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ primary, theme }) =>
      primary ? theme.colors.secondary : theme.colors.gray[200]};
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

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);
  
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item._id));
  };
  
  const handleRemoveFromWishlist = (itemId) => {
    dispatch(removeFromWishlist(itemId));
  };

  if (items.length === 0) {
    return (
      <Container>
        <Title>My Wishlist</Title>
        <EmptyWishlist>
          <h2>Your wishlist is empty</h2>
          <p>Add some products to your wishlist and they will show up here</p>
          <ShopButton to="/">Continue Shopping</ShopButton>
        </EmptyWishlist>
      </Container>
    );
  }

  return (
    <Container>
      <Title>My Wishlist</Title>
      <Grid>
        {items.map((item) => (
          <WishlistItem key={item._id}>
            <ImageContainer>
              <img src={item.image} alt={item.name} />
            </ImageContainer>
            <ItemInfo>
              <h3>{item.name}</h3>
              <div className="price">${item.price.toFixed(2)}</div>
              <Actions>
                <Button primary onClick={() => handleAddToCart(item)}>
                  <FiShoppingCart /> Add to Cart
                </Button>
                <Button onClick={() => handleRemoveFromWishlist(item._id)}>
                  <FiTrash2 />
                </Button>
              </Actions>
            </ItemInfo>
          </WishlistItem>
        ))}
      </Grid>
    </Container>
  );
};

export default WishlistPage;
