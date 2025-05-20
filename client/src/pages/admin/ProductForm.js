import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { FiPlus, FiX } from 'react-icons/fi';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Form = styled.form`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  label {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  input, textarea, select {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    border: 1px solid ${({ theme }) => theme.colors.gray[300]};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  textarea {
    min-height: 150px;
    resize: vertical;
  }
  
  .help-text {
    margin-top: ${({ theme }) => theme.spacing.xs};
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary + '20'};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  font-size: 0.9rem;
  
  .remove-tag {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.primary};
    margin-left: ${({ theme }) => theme.spacing.xs};
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 2px;
    
    &:hover {
      color: ${({ theme }) => theme.colors.error};
    }
  }
`;

const TagInput = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.sm};
  
  input {
    flex: 1;
  }
  
  button {
    margin-left: ${({ theme }) => theme.spacing.sm};
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    width: 36px;
    height: 36px;
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.fast};
    
    &:hover {
      background: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const ImagePreview = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  max-width: 300px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  &.empty {
    border: 2px dashed ${({ theme }) => theme.colors.gray[300]};
    padding: ${({ theme }) => theme.spacing.xl};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.gray[500]};
    height: 150px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ variant, theme }) =>
    variant === 'secondary' ? theme.colors.gray[100] : theme.colors.primary};
  color: ${({ variant, theme }) =>
    variant === 'secondary' ? theme.colors.text.primary : theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ variant, theme }) =>
      variant === 'secondary' ? theme.colors.gray[200] : theme.colors.secondary};
  }
`;

const ProductForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  const { products } = useSelector(state => state.products);
  const [isLoading, setIsLoading] = useState(false);
  
  // Size and color management
  const [sizeInput, setSizeInput] = useState('');
  const [colorInput, setColorInput] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: 'Men', // Default category
    stock: '',
    sizes: [],
    colors: [],
    rating: 4.5,
    numReviews: 0
  });

  // Fetch products if needed and populate form for edit mode
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
    
    // If in edit mode, populate form with existing product data
    if (isEditMode && products.length > 0) {
      const productToEdit = products.find(p => p._id === id);
      if (productToEdit) {
        setFormData({
          ...productToEdit,
          price: productToEdit.price.toString(),
          stock: productToEdit.stock.toString(),
        });
      } else {
        // Product not found, navigate back to products
        navigate('/admin/products');
      }
    }
  }, [dispatch, id, isEditMode, products, navigate]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Create formatted data
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };
    
    // Simulate API call
    setTimeout(() => {
      console.log('Product saved:', productData);
      alert(`Product ${isEditMode ? 'updated' : 'created'} successfully!`);
      setIsLoading(false);
      navigate('/admin/products');
    }, 1000);
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  // Add a size
  const handleAddSize = () => {
    if (sizeInput.trim() && !formData.sizes.includes(sizeInput.trim())) {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, sizeInput.trim()]
      });
      setSizeInput('');
    }
  };
  
  // Add a color
  const handleAddColor = () => {
    if (colorInput.trim() && !formData.colors.includes(colorInput.trim())) {
      setFormData({
        ...formData,
        colors: [...formData.colors, colorInput.trim()]
      });
      setColorInput('');
    }
  };
  
  // Remove a size
  const handleRemoveSize = (size) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.filter(s => s !== size)
    });
  };
  
  // Remove a color
  const handleRemoveColor = (color) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter(c => c !== color)
    });
  };

  return (
    <Container>
      <Title>{isEditMode ? 'Edit Product' : 'Add New Product'}</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormRow>
          <FormGroup>
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </FormGroup>

          <FormGroup>
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="sizes">Sizes</label>
          <TagsContainer>
            {formData.sizes.map(size => (
              <Tag key={size}>
                {size}
                <button 
                  type="button" 
                  className="remove-tag"
                  onClick={() => handleRemoveSize(size)}
                >
                  <FiX size={14} />
                </button>
              </Tag>
            ))}
          </TagsContainer>
          <TagInput>
            <input
              type="text"
              id="sizes"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              placeholder="Enter size (e.g. S, M, L, XL)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSize())}
            />
            <button type="button" onClick={handleAddSize}>
              <FiPlus />
            </button>
          </TagInput>
          <div className="help-text">Common sizes: XS, S, M, L, XL, XXL</div>
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="colors">Colors</label>
          <TagsContainer>
            {formData.colors.map(color => (
              <Tag key={color}>
                {color}
                <button 
                  type="button" 
                  className="remove-tag"
                  onClick={() => handleRemoveColor(color)}
                >
                  <FiX size={14} />
                </button>
              </Tag>
            ))}
          </TagsContainer>
          <TagInput>
            <input
              type="text"
              id="colors"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              placeholder="Enter color (e.g. Black, White, Blue)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddColor())}
            />
            <button type="button" onClick={handleAddColor}>
              <FiPlus />
            </button>
          </TagInput>
          <div className="help-text">Common colors: Black, White, Navy, Red, Green, Blue, Grey</div>
        </FormGroup>

        <FormGroup>
          <label htmlFor="image">Image URL</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
          {formData.image ? (
            <ImagePreview>
              <img src={formData.image} alt="Product preview" />
            </ImagePreview>
          ) : (
            <ImagePreview className="empty">
              Image preview will appear here
            </ImagePreview>
          )}
        </FormGroup>

        <ButtonGroup>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : isEditMode ? 'Update Product' : 'Create Product'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/admin/products')}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default ProductForm;
