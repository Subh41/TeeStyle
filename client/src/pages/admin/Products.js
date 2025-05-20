import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import styled from 'styled-components';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text.primary};
`;

const AddButton = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const Table = styled.table`
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme, danger }) => danger ? theme.colors.danger : theme.colors.primary};
  cursor: pointer;
  margin-right: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xs};
  font-size: 1.2rem;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme, danger }) => danger ? theme.colors.dangerDark : theme.colors.secondary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
`;

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector(state => state.products);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (productId) => {
    navigate(`/admin/product/${productId}`);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // This would typically call a delete action
      // For now just log and show mock action
      console.log(`Delete product: ${productId}`);
      alert('Product deletion would happen here with the API');
    }
  };

  if (loading) return <Loader />;
  if (error) return <Message variant="error" message={error} />;
  
  return (
    <Container>
      <Header>
        <Title>Products Management</Title>
        <AddButton to="/admin/product">Add Product</AddButton>
      </Header>
      <Table>
        <thead>
          <tr>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <Td colSpan="6">No products found.</Td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id}>
                <Td>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} 
                  />
                </Td>
                <Td>{product.name}</Td>
                <Td>{product.category}</Td>
                <Td>${product.price.toFixed(2)}</Td>
                <Td>{product.stock}</Td>
                <Td>
                  <ActionButtons>
                    <ActionButton onClick={() => handleEdit(product._id)}>
                      <FiEdit />
                    </ActionButton>
                    <ActionButton danger onClick={() => handleDelete(product._id)}>
                      <FiTrash2 />
                    </ActionButton>
                  </ActionButtons>
                </Td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Products;
