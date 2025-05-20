import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/products/ProductCard';
import Message from '../components/ui/Message';
import Loader from '../components/ui/Loader';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  
  const { products, loading, error } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products when component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products when products array or category changes
  useEffect(() => {
    if (products && products.length > 0) {
      let result = [...products];
      
      // Filter by category if present
      if (category) {
        result = result.filter(product => 
          product.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      // Filter by search query if present
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
        );
      }
      
      setFilteredProducts(result);
    } else {
      setFilteredProducts([]);
    }
  }, [products, category, searchQuery]);

  if (loading) return <Loader />;
  if (error) return <Message variant="error" message={error} />;

  const title = category ? `${category}'s T-Shirts` : searchQuery ? `Search Results for "${searchQuery}"` : 'All T-Shirts';

  return (
    <Container>
      <Title>{title}</Title>
      {filteredProducts.length === 0 ? (
        <Message message="No products found matching your criteria" variant="info" />
      ) : (
        <ProductGrid>
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ProductGrid>
      )}
    </Container>
  );
};

export default ProductsPage;
