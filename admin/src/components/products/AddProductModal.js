import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { FiX, FiUpload } from 'react-icons/fi';
import { createProduct } from '../../redux/slices/productSlice';

const AddProductModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    colors: [],
    sizes: [],
    images: [],
    countInStock: '',
    featured: false
  });
  const [loading, setLoading] = useState(false);
  const [colorInput, setColorInput] = useState('');
  const [sizeInput, setSizeInput] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [imageUrlInput, setImageUrlInput] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddColor = () => {
    if (colorInput && !formData.colors.includes(colorInput)) {
      setFormData({
        ...formData,
        colors: [...formData.colors, colorInput]
      });
      setColorInput('');
    }
  };

  const handleRemoveColor = (color) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter(c => c !== color)
    });
  };

  const handleAddSize = () => {
    if (sizeInput && !formData.sizes.includes(sizeInput)) {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, sizeInput]
      });
      setSizeInput('');
    }
  };

  const handleRemoveSize = (size) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.filter(s => s !== size)
    });
  };

  const handleAddImageUrl = () => {
    if (imageUrlInput && !imageUrls.includes(imageUrlInput)) {
      setImageUrls([...imageUrls, imageUrlInput]);
      setFormData({
        ...formData,
        images: [...imageUrls, imageUrlInput]
      });
      setImageUrlInput('');
    }
  };

  const handleRemoveImageUrl = (url) => {
    const updatedUrls = imageUrls.filter(u => u !== url);
    setImageUrls(updatedUrls);
    setFormData({
      ...formData,
      images: updatedUrls
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Convert price and stock to numbers
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        countInStock: parseInt(formData.countInStock, 10)
      };
      
      await dispatch(createProduct(productData)).unwrap();
      onClose();
    } catch (error) {
      console.error('Failed to create product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            as={motion.div}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>Add New Product</ModalTitle>
              <CloseButton onClick={onClose}>
                <FiX />
              </CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
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
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      type="number"
                      id="price"
                      name="price"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="countInStock">Stock</Label>
                    <Input
                      type="number"
                      id="countInStock"
                      name="countInStock"
                      min="0"
                      value={formData.countInStock}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                </FormRow>
                
                <FormGroup>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Marvel">Marvel</option>
                    <option value="DC">DC</option>
                    <option value="Anime">Anime</option>
                    <option value="Custom">Custom</option>
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="description">Description</Label>
                  <TextArea
                    id="description"
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>Colors</Label>
                  <InputWithButton>
                    <Input
                      type="text"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      placeholder="Add a color (e.g. red, blue)"
                    />
                    <AddButton type="button" onClick={handleAddColor}>Add</AddButton>
                  </InputWithButton>
                  <TagsContainer>
                    {formData.colors.map((color, index) => (
                      <Tag key={index}>
                        {color}
                        <TagRemove onClick={() => handleRemoveColor(color)}>×</TagRemove>
                      </Tag>
                    ))}
                  </TagsContainer>
                </FormGroup>
                
                <FormGroup>
                  <Label>Sizes</Label>
                  <InputWithButton>
                    <Input
                      type="text"
                      value={sizeInput}
                      onChange={(e) => setSizeInput(e.target.value)}
                      placeholder="Add a size (e.g. S, M, L)"
                    />
                    <AddButton type="button" onClick={handleAddSize}>Add</AddButton>
                  </InputWithButton>
                  <TagsContainer>
                    {formData.sizes.map((size, index) => (
                      <Tag key={index}>
                        {size}
                        <TagRemove onClick={() => handleRemoveSize(size)}>×</TagRemove>
                      </Tag>
                    ))}
                  </TagsContainer>
                </FormGroup>
                
                <FormGroup>
                  <Label>Images</Label>
                  <InputWithButton>
                    <Input
                      type="text"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      placeholder="Enter image URL"
                    />
                    <AddButton type="button" onClick={handleAddImageUrl}>Add</AddButton>
                  </InputWithButton>
                  <ImagesContainer>
                    {imageUrls.map((url, index) => (
                      <ImagePreview key={index}>
                        <img src={url} alt={`Product ${index + 1}`} />
                        <ImageRemove onClick={() => handleRemoveImageUrl(url)}>×</ImageRemove>
                      </ImagePreview>
                    ))}
                    {imageUrls.length === 0 && (
                      <ImagePlaceholder>
                        <FiUpload />
                        <span>No images added</span>
                      </ImagePlaceholder>
                    )}
                  </ImagesContainer>
                </FormGroup>
                
                <FormGroup>
                  <CheckboxContainer>
                    <Checkbox
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                    />
                    <CheckboxLabel htmlFor="featured">Featured Product</CheckboxLabel>
                  </CheckboxContainer>
                </FormGroup>
                
                <ButtonGroup>
                  <CancelButton type="button" onClick={onClose}>Cancel</CancelButton>
                  <SubmitButton type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Product'}
                  </SubmitButton>
                </ButtonGroup>
              </Form>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

// Styled components with superhero theme
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: linear-gradient(to bottom, #1a1a2e, #16213e);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  
  /* Superhero comic style border */
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff0055, #0066ff, #00ff99, #ff0055);
    z-index: -1;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background-size: 400%;
    animation: glowingBorder 8s linear infinite;
  }
  
  @keyframes glowingBorder {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
  }
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(0, 195, 255, 0.5);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 50%;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: rotate(90deg);
  }
`;

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 1rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm};
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 1rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  
  option {
    background: #16213e;
  }
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.sm};
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const InputWithButton = styled.div`
  display: flex;
  gap: 8px;
`;

const AddButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0 ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  background: rgba(0, 123, 255, 0.2);
  border: 1px solid rgba(0, 123, 255, 0.5);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 4px 8px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.light};
`;

const TagRemove = styled.span`
  margin-left: 6px;
  font-size: 1.2rem;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin-top: 10px;
`;

const ImagePreview = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  aspect-ratio: 1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageRemove = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.colors.error};
  }
`;

const ImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 20px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  
  svg {
    font-size: 1.5rem;
    margin-bottom: 5px;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-right: 8px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  color: ${({ theme }) => theme.colors.text.light};
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const CancelButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text.light};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  font-weight: 600;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
  }
  
  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export default AddProductModal;
