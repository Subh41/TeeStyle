import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import { adminAPI } from '../services/api';
import AdminLayout from '../components/layout/AdminLayout';
import AddProductModal from '../components/products/AddProductModal';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getProducts();
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddProduct = () => {
    setShowAddModal(true);
  };
  
  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setShowEditModal(true);
  };
  
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await adminAPI.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };
  
  return (
    <AdminLayout title="Products">
      <PageContainer>
        <ActionBar>
          <SearchContainer>
            <SearchIcon>
              <FiSearch />
            </SearchIcon>
            <SearchInput 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchContainer>
          
          <ActionButtons>
            <FilterButton>
              <FiFilter />
              <span>Filter</span>
            </FilterButton>
            
            <AddButton onClick={handleAddProduct}>
              <FiPlus />
              <span>Add Product</span>
            </AddButton>
          </ActionButtons>
        </ActionBar>
        
        {loading ? (
          <LoadingMessage>Loading products...</LoadingMessage>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <ProductsGrid>
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product._id}
                    as={motion.div}
                    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                  >
                    <ProductImage src={product.images[0]} alt={product.name} />
                    <ProductContent>
                      <ProductName>{product.name}</ProductName>
                      <ProductCategory>{product.category}</ProductCategory>
                      <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                      <ProductStock>
                        Stock: <span>{product.countInStock}</span>
                      </ProductStock>
                      
                      <ProductActions>
                        <ActionButton 
                          onClick={() => handleEditProduct(product)}
                          color="primary"
                        >
                          <FiEdit2 />
                        </ActionButton>
                        
                        <ActionButton 
                          onClick={() => handleDeleteProduct(product._id)}
                          color="heroRed"
                        >
                          <FiTrash2 />
                        </ActionButton>
                      </ProductActions>
                    </ProductContent>
                  </ProductCard>
                ))}
              </ProductsGrid>
            ) : (
              <EmptyMessage>
                {searchTerm ? 'No products match your search' : 'No products found'}
              </EmptyMessage>
            )}
          </>
        )}
      </PageContainer>
      
      {/* Add Product Modal */}
      <AddProductModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
      
      {/* Edit Product Modal would go here */}
    </AdminLayout>
  );
};

// Styled components with superhero theme
const PageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 500px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  padding-left: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 1rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 0 2px rgba(255, 202, 40, 0.3);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.7;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.heroBlue}, ${({ theme }) => theme.colors.primary});
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.md};
  
  &:hover {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.heroBlue});
    transform: translateY(-2px);
    box-shadow: 0 0 15px rgba(25, 118, 210, 0.5);
  }
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ProductCard = styled.div`
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.background.starry}, ${theme.colors.background.deeper})`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;
  
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
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProductContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
`;

const ProductCategory = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProductPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-shadow: 0 0 5px rgba(255, 202, 40, 0.3);
`;

const ProductStock = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  span {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 500;
  }
`;

const ProductActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, color }) => color ? `${theme.colors[color]}40` : 'rgba(255, 255, 255, 0.1)'};
  color: ${({ theme, color }) => color ? theme.colors[color] : theme.colors.white};
  border: 1px solid ${({ theme, color }) => color ? `${theme.colors[color]}60` : 'rgba(255, 255, 255, 0.2)'};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: translateY(-2px);
    background: ${({ theme, color }) => color ? `${theme.colors[color]}60` : 'rgba(255, 255, 255, 0.2)'};
    box-shadow: 0 0 10px ${({ theme, color }) => color ? `${theme.colors[color]}50` : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const EmptyMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export default ProductsPage;
