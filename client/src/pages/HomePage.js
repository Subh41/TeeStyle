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
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.primary};
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
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
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
        <HeroButton to="/products">Shop Now</HeroButton>
      </Hero>

      <Container>
        <Section>
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
