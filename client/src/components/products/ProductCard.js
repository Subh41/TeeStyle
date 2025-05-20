import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiHeart, FiShoppingCart, FiZap, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.background.starry}, ${theme.colors.background.deeper})`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  border: 2px solid rgba(255, 255, 255, 0.1);
  
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
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), 0 0 10px rgba(255, 215, 0, 0.2);
    border-color: rgba(255, 202, 40, 0.3);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%);
    opacity: 0.4;
    transition: opacity 0.3s ease;
  }
  
  ${Card}:hover &::before {
    opacity: 0.2;
  }
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${({ theme }) => theme.transitions.medium};
    z-index: 0;
  }

  ${Card}:hover & img {
    transform: scale(1.1);
  }
  
  /* Comic style halftone pattern overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px);
    background-size: 5px 5px;
    opacity: 0.1;
    z-index: 2;
    pointer-events: none;
    mix-blend-mode: overlay;
  }
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.secondary}, ${({ theme }) => theme.colors.heroRed});
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  z-index: 10;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 5px;
  
  &::before {
    content: "✦";
    font-size: 0.9rem;
  }
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  z-index: 5;
  
  /* Add subtle glow effect to the content area */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    pointer-events: none;
    z-index: -1;
  }
`;

const Title = styled.h3`
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 1.25rem;
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  text-shadow: ${({ theme }) => theme.effects.textShadow.starlight};
  letter-spacing: 0.5px;
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;
  height: 2.6em;
  transition: all 0.3s ease;
  padding: 8px 12px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  border-left: 3px solid ${({ theme }) => theme.colors.secondary};
  
  ${Card}:hover & {
    color: ${({ theme }) => theme.colors.white};
    background-color: rgba(255, 202, 40, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Price = styled.div`
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  text-shadow: 0 0 8px rgba(255, 202, 40, 0.4);
  letter-spacing: 0.5px;
  position: relative;
  
  /* Comic-style price tag effect */
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.colors.secondary}, transparent);
    opacity: 0.7;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  
  > div > span {
    display: block;
    font-family: ${({ theme }) => theme.typography.heading.fontFamily};
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.colors.secondary};
    text-shadow: 0 0 10px rgba(255, 202, 40, 0.5);
    font-size: 1.1rem;
    text-transform: uppercase;
    background: rgba(0, 0, 0, 0.4);
    padding: 5px 10px;
    border-radius: 4px;
    border-left: 3px solid ${({ theme }) => theme.colors.secondary};
  }
  
  /* Add a semi-transparent background to make content more readable */
  > div {
    background: rgba(0, 0, 0, 0.3);
    padding: 12px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const SizeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 5px;
`;

const SizeTag = styled.span`
  font-size: 0.8rem;
  padding: 4px 10px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.background.deeper};
  background-color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  transition: all 0.2s ease;
  text-align: center;
  min-width: 30px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  font-weight: 700;
  text-shadow: none;
  letter-spacing: 0.5px;
  margin: 2px;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px) scale(1.05);
    border-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.background.deeper};
    box-shadow: 0 0 10px rgba(255, 202, 40, 0.4);
  }
`;

const ColorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 5px;
`;

const ColorTag = styled.span`
  font-size: 0.8rem;
  padding: 4px 10px;
  border-radius: 4px;
  color: ${({ color, theme }) => {
    // Determine if the background color is light or dark and set text color accordingly
    switch(color.toLowerCase()) {
      case 'red': return '#FFFFFF';
      case 'blue': return '#FFFFFF';
      case 'black': return '#FFFFFF';
      case 'green': return '#FFFFFF';
      case 'purple': return '#FFFFFF';
      case 'white': return '#000000';
      case 'yellow': return '#000000';
      case 'orange': return '#000000';
      default: return theme.colors.white;
    }
  }};
  background-color: ${({ color }) => {
    // Use superhero-themed colors based on the color name
    switch(color.toLowerCase()) {
      case 'red': return '#E53935'; // Iron Man red
      case 'blue': return '#1976D2'; // Captain America blue
      case 'black': return '#212121'; // Black Panther black
      case 'green': return '#2E7D32'; // Hulk green
      case 'purple': return '#7B1FA2'; // Hawkeye purple
      case 'white': return '#F5F5F5'; // White Wolf white
      case 'yellow': return '#FFC107'; // Wolverine yellow
      case 'orange': return '#FF9800'; // The Thing orange
      default: return '#E53935'; // Default to Iron Man red
    }
  }};
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  text-transform: capitalize;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin: 2px;
  position: relative;
  overflow: hidden;
  
  /* Add subtle color indicator */
  &::before {
    content: '●';
    margin-right: 5px;
    font-size: 0.9rem;
  }
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const Button = styled(motion.button)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ primary, theme }) =>
    primary ? 
      `linear-gradient(135deg, ${theme.colors.heroRed}, ${theme.colors.villainPurple})` : 
      'rgba(255, 255, 255, 0.1)'};
  color: ${({ primary, theme }) =>
    primary ? theme.colors.white : theme.colors.white};
  font-weight: 700;
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  letter-spacing: 0.5px;
  font-size: 0.9rem;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: ${({ primary }) => primary ? 
    '0 5px 15px rgba(211, 47, 47, 0.3)' : 
    '0 5px 15px rgba(0, 0, 0, 0.2)'};
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  
  /* Comic book style border effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 95%, rgba(255,255,255,0.1) 100%);
    pointer-events: none;
  }
  
  /* Comic book style shine effect */
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%);
    opacity: 0;
    transform: scale(0.5);
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
    transform: scale(1);
  }
  
  svg {
    font-size: 1.1rem;
  }
`;

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  const navigate = useNavigate();
  const { _id, name, price, image, category, sizes, colors } = product;
  
  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    hover: {
      y: -8,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 215, 0, 0.3)',
      borderColor: 'rgba(255, 202, 40, 0.4)',
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } }
  };

  const imageVariants = {
    hover: { scale: 1.1, transition: { duration: 0.5 } }
  };

  return (
    <Card
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
    >
      <ImageContainer onClick={() => navigate(`/product/${_id}`)}>
        <CategoryBadge>{category}</CategoryBadge>
        <motion.img 
          src={image || '/images/superhero-placeholder.jpg'} 
          alt={name}
          variants={imageVariants}
        />
      </ImageContainer>
      <Content>
        <Title>{name}</Title>
        <Price>${price.toFixed(2)}</Price>
        <ProductInfo>
          {sizes && (
            <div>
              <span><FiZap /> Available Sizes</span>
              <SizeContainer>
                {sizes.map((size, index) => (
                  <motion.div key={index} whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <SizeTag>{size}</SizeTag>
                  </motion.div>
                ))}
              </SizeContainer>
            </div>
          )}
          {colors && (
            <div>
              <span><FiStar /> Colors</span>
              <ColorContainer>
                {colors.map((color, index) => (
                  <motion.div key={index} whileHover={{ y: -3, scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <ColorTag color={color}>{color}</ColorTag>
                  </motion.div>
                ))}
              </ColorContainer>
            </div>
          )}
        </ProductInfo>
        <Actions>
          <Button 
            primary 
            onClick={onAddToCart}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FiShoppingCart /> Add to Cart
          </Button>
          <Button 
            onClick={onAddToWishlist}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            style={{
              background: 'linear-gradient(135deg, #e53935, #9c27b0)',
              color: 'white',
              boxShadow: '0 4px 8px rgba(233, 30, 99, 0.3)'
            }}
          >
            <FiHeart /> Wishlist
          </Button>
        </Actions>
      </Content>
    </Card>
  );
};

export default ProductCard;
