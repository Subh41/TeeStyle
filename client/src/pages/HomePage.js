import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fetchFeaturedProducts } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist } from '../redux/slices/wishlistSlice';
import ProductCard from '../components/products/ProductCard';
import Recommendations from '../components/products/Recommendations';
import Message from '../components/ui/Message';
import Loader from '../components/ui/Loader';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
  z-index: 10;
  margin-bottom: 50px;
`;

const Hero = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://via.placeholder.com/1200x400');
  background-size: cover;
  background-position: center;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.white};
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const HeroText = styled.p`
  font-size: 1.2rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  max-width: 700px;
`;

const HeroButton = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

// Section styles are defined elsewhere

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  background: rgba(0, 0, 0, 0.3);
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 202, 40, 0.1);
  border: 1px solid rgba(255, 202, 40, 0.3);
  position: relative;
  
  /* Add starry effect */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
    opacity: 0.3;
    z-index: -1;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.white};
  font-size: 2.2rem;
  text-shadow: 0 0 10px rgba(255, 202, 40, 0.5);
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  position: relative;
  padding-bottom: 15px;
  
  /* Removed yellow underline */
`;

const CenterLoader = styled.div`
  display: flex;
  justify-content: center;
  min-height: 200px;
  align-items: center;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const HomePage = () => {
  const dispatch = useDispatch();
  const { featuredProducts, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  // We'll handle loading and error states in the JSX

  return (
    <div>
      <Hero>
        <HeroTitle>Welcome to Our E-Commerce Store</HeroTitle>
        <HeroText>
          Discover amazing products at competitive prices. Shop with confidence and enjoy a seamless experience.
        </HeroText>
        <HeroButton to="#featured-products">Shop Now</HeroButton>
      </Hero>

      <Container>
        <Section id="featured-products">
          <SectionTitle>Featured Products</SectionTitle>
          {loading ? (
            <CenterLoader>
              <Loader />
            </CenterLoader>
          ) : error ? (
            <Message variant="error" message={error} />
          ) : (
            <ProductGrid>
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                  onAddToWishlist={() => handleAddToWishlist(product)}
                />
              ))}
            </ProductGrid>
          )}
        </Section>

        <Recommendations />
      </Container>
    </div>
  );
};

export default HomePage;
