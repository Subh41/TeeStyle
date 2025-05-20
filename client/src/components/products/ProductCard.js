import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transitions.medium};
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h3`
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SizeContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
`;

const SizeTag = styled.span`
  font-size: 0.75rem;
  padding: 2px 6px;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ColorContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
`;

const ColorTag = styled.span`
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text.secondary};
  background-color: ${({ theme }) => theme.colors.gray[100]};
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
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ primary, theme }) =>
      primary ? theme.colors.secondary : theme.colors.gray[200]};
  }
`;

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  const navigate = useNavigate();
  const { _id, name, price, image, category, sizes, colors, rating } = product;

  return (
    <Card>
      <ImageContainer onClick={() => navigate(`/product/${_id}`)}>
        <CategoryBadge>{category}</CategoryBadge>
        <img src={image} alt={name} />
      </ImageContainer>
      <Content>
        <Title>{name}</Title>
        <Price>${price.toFixed(2)}</Price>
        <ProductInfo>
          {sizes && (
            <div>
              <span>Available Sizes:</span>
              <SizeContainer>
                {sizes.map((size, index) => (
                  <SizeTag key={index}>{size}</SizeTag>
                ))}
              </SizeContainer>
            </div>
          )}
          {colors && (
            <div>
              <span>Colors:</span>
              <ColorContainer>
                {colors.map((color, index) => (
                  <ColorTag key={index}>{color}</ColorTag>
                ))}
              </ColorContainer>
            </div>
          )}
        </ProductInfo>
        <Actions>
          <Button primary onClick={onAddToCart}>
            <FiShoppingCart /> Add to Cart
          </Button>
          <Button onClick={onAddToWishlist}>
            <FiHeart />
          </Button>
        </Actions>
      </Content>
    </Card>
  );
};

export default ProductCard;
