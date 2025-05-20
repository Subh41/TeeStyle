import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist } from '../redux/slices/wishlistSlice';
import styled from 'styled-components';
import { FiHeart, FiShoppingCart, FiArrowLeft, FiMinus, FiPlus } from 'react-icons/fi';
import Loader from '../components/ui/Loader';
import Message from '../components/ui/Message';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

const Stock = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  span {
    color: ${({ theme, inStock }) =>
      inStock ? theme.colors.success : theme.colors.error};
    font-weight: 500;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Button = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ primary, theme, disabled }) =>
    disabled ? theme.colors.gray[300] : primary ? theme.colors.primary : theme.colors.gray[100]};
  color: ${({ primary, theme, disabled }) =>
    disabled ? theme.colors.gray[500] : primary ? theme.colors.white : theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ primary, theme, disabled }) =>
      disabled ? theme.colors.gray[300] : primary ? theme.colors.secondary : theme.colors.gray[200]};
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  cursor: pointer;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const OptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SizeOption = styled.button`
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ selected, theme }) => selected ? theme.colors.primary : theme.colors.gray[300]};
  background: ${({ selected, theme }) => selected ? theme.colors.primary + '20' : 'white'};
  color: ${({ selected, theme }) => selected ? theme.colors.primary : theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  font-weight: ${({ selected }) => selected ? '600' : '400'};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ColorOption = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${({ selected, theme }) => selected ? theme.colors.primary : 'transparent'};
  background-color: ${({ color }) => color};
  cursor: pointer;
  padding: 0;
  box-shadow: ${({ selected }) => selected ? '0 0 0 2px white inset' : 'none'};
  position: relative;
  transition: all ${({ theme }) => theme.transitions.fast};
  outline: none;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  background: white;
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.gray[400]};
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 32px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.9rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

const ColorName = styled.span`
  display: inline-block;
  margin-left: ${({ theme }) => theme.spacing.md};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  
  // Local state for product options
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  // Color name mapping for UI
  const colorMap = {
    'Black': '#000000',
    'White': '#FFFFFF',
    'Grey': '#9E9E9E',
    'Blue': '#2196F3',
    'Navy': '#0D47A1',
    'Red': '#F44336',
    'Pink': '#E91E63',
    'Green': '#4CAF50',
    'Burgundy': '#800020',
    'Blue/White': '#2196F3',
    'Black/White': '#5D5D5D'
  };
  
  // Fetch all products if not already in store
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);
  
  // Find the current product
  const product = products.find(p => p._id === id);
  
  // Set default size and color when product loads
  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
    }
  }, [product]);
  
  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    
    const cartItem = {
      ...product,
      quantity,
      selectedSize,
      selectedColor,
      totalPrice: product.price * quantity
    };
    
    dispatch(addToCart(cartItem));
    alert('Added to cart!');
  };
  
  // Handle add to wishlist
  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
    alert('Added to wishlist!');
  };
  
  // Handle go back
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (loading) return <Loader />;
  if (error) return <Message variant="error" message={error} />;
  if (!product) return <Message variant="info" message="Product not found" />;
  
  return (
    <Container>
      <BackButton onClick={handleGoBack}>
        <FiArrowLeft /> Back to Products
      </BackButton>
      
      <Grid>
        <ImageContainer>
          <img src={product.image} alt={product.name} />
        </ImageContainer>
        
        <ProductInfo>
          <Title>{product.name}</Title>
          <Price>${product.price.toFixed(2)}</Price>
          <Description>{product.description}</Description>
          
          {product.sizes && product.sizes.length > 0 && (
            <>
              <SectionTitle>Select Size</SectionTitle>
              <OptionContainer>
                {product.sizes.map(size => (
                  <SizeOption 
                    key={size} 
                    selected={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </SizeOption>
                ))}
              </OptionContainer>
            </>
          )}
          
          {product.colors && product.colors.length > 0 && (
            <>
              <SectionTitle>Select Color</SectionTitle>
              <OptionContainer>
                {product.colors.map(color => (
                  <div key={color} style={{ display: 'flex', alignItems: 'center' }}>
                    <ColorOption 
                      color={colorMap[color] || color}
                      selected={selectedColor === color}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                    {selectedColor === color && <ColorName>{color}</ColorName>}
                  </div>
                ))}
              </OptionContainer>
            </>
          )}
          
          <SectionTitle>Quantity</SectionTitle>
          <QuantitySelector>
            <QuantityButton 
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <FiMinus />
            </QuantityButton>
            
            <QuantityInput 
              type="number" 
              min="1" 
              max={product.stock} 
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            />
            
            <QuantityButton 
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= product.stock}
            >
              <FiPlus />
            </QuantityButton>
          </QuantitySelector>
          
          <Stock inStock={product.stock > 0}>
            Status: <span>{product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</span>
          </Stock>
          
          <Actions>
            <Button 
              primary 
              onClick={handleAddToCart} 
              disabled={product.stock === 0}
            >
              <FiShoppingCart /> Add to Cart
            </Button>
            <Button onClick={handleAddToWishlist}>
              <FiHeart />
            </Button>
          </Actions>
        </ProductInfo>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
