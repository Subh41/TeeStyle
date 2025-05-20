import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { 
  fetchPromotions, 
  createPromotion, 
  updatePromotion, 
  deletePromotion 
} from '../redux/slices/promotionSlice';
import AdminLayout from '../components/layout/AdminLayout';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaBullhorn } from 'react-icons/fa';

// Styled components
const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.light};
  text-shadow: 0 0 10px rgba(255, 202, 40, 0.5);
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.secondary}, transparent);
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const PromotionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const PromotionCard = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid rgba(255, 202, 40, 0.3);
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: rgba(255, 202, 40, 0.6);
  }
  
  /* Comic book style effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 15px 15px;
    pointer-events: none;
    opacity: 0.5;
    z-index: 1;
  }
`;

const PromotionImage = styled.div`
  height: 150px;
  background-image: url(${props => props.src || 'https://via.placeholder.com/300x150'});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  }
`;

const PromotionContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const PromotionTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

const PromotionDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PromotionInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PromotionInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  span:first-child {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
  
  span:last-child {
    color: ${({ theme }) => theme.colors.text.light};
    font-weight: 500;
  }
`;

const PromotionActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  transition: all 0.3s ease;
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'edit':
        return theme.colors.info;
      case 'delete':
        return theme.colors.error;
      default:
        return theme.colors.primary;
    }
  }};
  color: ${({ theme }) => theme.colors.white};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${({ theme, status }) => {
    switch (status) {
      case 'active':
        return theme.colors.success;
      case 'expired':
        return theme.colors.error;
      case 'scheduled':
        return theme.colors.info;
      default:
        return '#718096'; // Using a direct hex value instead of theme.colors.gray[500]
    }
  }};
  color: ${({ theme }) => theme.colors.white};
`;

// Modal components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden; /* Prevent background scrolling */
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  width: 90%;
  max-width: 500px;
  max-height: 90vh; /* Limit height to 90% of viewport height */
  overflow-y: auto; /* Enable scrolling */
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid rgba(255, 202, 40, 0.3);
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.secondary} rgba(0, 0, 0, 0.3);
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 4px;
  }
  
  /* Comic book style effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 15px 15px;
    pointer-events: none;
    opacity: 0.5;
    z-index: -1;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
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
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 10px;
  }
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  text-shadow: 0 0 10px rgba(255, 202, 40, 0.5);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.light};
  font-weight: 500;
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid rgba(255, 202, 40, 0.3);
  background: rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.colors.white};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 0 2px rgba(255, 202, 40, 0.2);
  }
`;

const Textarea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid rgba(255, 202, 40, 0.3);
  background: rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.colors.white};
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 0 2px rgba(255, 202, 40, 0.2);
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid rgba(255, 202, 40, 0.3);
  background: rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.colors.white};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 0 2px rgba(255, 202, 40, 0.2);
  }
  
  option {
    background: ${({ theme }) => theme.colors.background.dark};
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 150px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-image: url(${props => props.src || 'https://via.placeholder.com/600x150'});
  background-size: cover;
  background-position: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border: 1px dashed rgba(255, 202, 40, 0.5);
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ModalButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  transition: all 0.3s ease;
  background-color: ${({ theme, variant }) => {
    switch (variant) {
      case 'confirm':
        return theme.colors.success;
      case 'delete':
        return theme.colors.error;
      case 'cancel':
        return '#718096'; // Using a direct hex value instead of theme.colors.gray[600]
      default:
        return theme.colors.primary;
    }
  }};
  color: ${({ theme }) => theme.colors.white};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const Loader = styled.div`
  border: 4px solid rgba(255, 202, 40, 0.3);
  border-top: 4px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  background: rgba(0, 0, 0, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px dashed rgba(255, 202, 40, 0.3);
  
  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const PromotionsPage = () => {
  const dispatch = useDispatch();
  const { promotions, loading, error } = useSelector((state) => state.promotions);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    startDate: '',
    endDate: '',
    targetUrl: '',
    position: 'home',
    status: 'active'
  });

  useEffect(() => {
    dispatch(fetchPromotions());
  }, [dispatch]);
  
  // Effect to handle body scrolling when modal is open
  useEffect(() => {
    const handleBodyScroll = (isOpen) => {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    };
    
    // Apply when modal opens/closes
    handleBodyScroll(showPromotionModal || showDeleteModal);
    
    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPromotionModal, showDeleteModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const openAddModal = () => {
    setSelectedPromotion(null);
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      startDate: '',
      endDate: '',
      targetUrl: '',
      position: 'home',
      status: 'active'
    });
    setShowPromotionModal(true);
  };

  const openEditModal = (promotion) => {
    setSelectedPromotion(promotion);
    setFormData({
      title: promotion.title,
      description: promotion.description,
      imageUrl: promotion.imageUrl,
      startDate: promotion.startDate ? new Date(promotion.startDate).toISOString().split('T')[0] : '',
      endDate: promotion.endDate ? new Date(promotion.endDate).toISOString().split('T')[0] : '',
      targetUrl: promotion.targetUrl || '',
      position: promotion.position || 'home',
      status: promotion.status
    });
    setShowPromotionModal(true);
  };

  const openDeleteModal = (promotion) => {
    setSelectedPromotion(promotion);
    setShowDeleteModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const promotionData = {
      ...formData
    };
    
    if (selectedPromotion) {
      // Update existing promotion
      dispatch(updatePromotion({ id: selectedPromotion._id, promotionData }))
        .unwrap()
        .then(() => {
          toast.success('Promotion updated successfully');
          setShowPromotionModal(false);
        })
        .catch((err) => {
          toast.error(`Failed to update promotion: ${err}`);
        });
    } else {
      // Create new promotion
      dispatch(createPromotion(promotionData))
        .unwrap()
        .then(() => {
          toast.success('Promotion created successfully');
          setShowPromotionModal(false);
        })
        .catch((err) => {
          toast.error(`Failed to create promotion: ${err}`);
        });
    }
  };

  const handleDelete = () => {
    if (selectedPromotion) {
      dispatch(deletePromotion(selectedPromotion._id))
        .unwrap()
        .then(() => {
          toast.success('Promotion deleted successfully');
          setShowDeleteModal(false);
        })
        .catch((err) => {
          toast.error(`Failed to delete promotion: ${err}`);
        });
    }
  };

  const getPromotionStatus = (promotion) => {
    const now = new Date();
    const startDate = promotion.startDate ? new Date(promotion.startDate) : null;
    const endDate = promotion.endDate ? new Date(promotion.endDate) : null;
    
    if (promotion.status === 'inactive') return 'inactive';
    if (endDate && now > endDate) return 'expired';
    if (startDate && now < startDate) return 'scheduled';
    return 'active';
  };

  return (
    <AdminLayout>
      <PageTitle>Promotion Management</PageTitle>
      
      <ActionBar>
        <AddButton onClick={openAddModal}>
          <FaPlus /> Add New Promotion
        </AddButton>
      </ActionBar>
      
      {loading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : error ? (
        <div>Error: {error}</div>
      ) : promotions.length === 0 ? (
        <EmptyState>
          <FaBullhorn />
          <h3>No Promotions Found</h3>
          <p>Create your first promotion to highlight special offers and events.</p>
          <AddButton onClick={openAddModal}>
            <FaPlus /> Add New Promotion
          </AddButton>
        </EmptyState>
      ) : (
        <PromotionGrid>
          {promotions.map((promotion) => {
            const status = getPromotionStatus(promotion);
            return (
              <PromotionCard key={promotion._id}>
                <PromotionImage src={promotion.imageUrl} />
                <PromotionContent>
                  <PromotionTitle>{promotion.title}</PromotionTitle>
                  <PromotionDescription>{promotion.description}</PromotionDescription>
                  
                  <PromotionInfo>
                    <PromotionInfoItem>
                      <span>Status:</span>
                      <StatusBadge status={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </StatusBadge>
                    </PromotionInfoItem>
                    
                    <PromotionInfoItem>
                      <span>Position:</span>
                      <span>{promotion.position || 'Home'}</span>
                    </PromotionInfoItem>
                    
                    {promotion.startDate && (
                      <PromotionInfoItem>
                        <span>Start Date:</span>
                        <span>{new Date(promotion.startDate).toLocaleDateString()}</span>
                      </PromotionInfoItem>
                    )}
                    
                    {promotion.endDate && (
                      <PromotionInfoItem>
                        <span>End Date:</span>
                        <span>{new Date(promotion.endDate).toLocaleDateString()}</span>
                      </PromotionInfoItem>
                    )}
                  </PromotionInfo>
                  
                  <PromotionActions>
                    <ActionButton 
                      variant="edit"
                      onClick={() => openEditModal(promotion)}
                    >
                      <FaEdit /> Edit
                    </ActionButton>
                    <ActionButton 
                      variant="delete"
                      onClick={() => openDeleteModal(promotion)}
                    >
                      <FaTrash /> Delete
                    </ActionButton>
                  </PromotionActions>
                </PromotionContent>
              </PromotionCard>
            );
          })}
        </PromotionGrid>
      )}
      
      {/* Promotion Form Modal */}
      {showPromotionModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>
              {selectedPromotion ? 'Edit Promotion' : 'Add New Promotion'}
            </ModalTitle>
            
            <Form onSubmit={handleSubmit}>
              {formData.imageUrl && (
                <ImagePreview src={formData.imageUrl} />
              )}
              <FormGroup>
                <Label htmlFor="title">Promotion Title*</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">Description*</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="imageUrl">Image URL*</Label>
                <Input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="targetUrl">Target URL</Label>
                <Input
                  type="text"
                  id="targetUrl"
                  name="targetUrl"
                  value={formData.targetUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/target-page"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="position">Position</Label>
                <Select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                >
                  <option value="home">Home Page</option>
                  <option value="products">Products Page</option>
                  <option value="sidebar">Sidebar</option>
                  <option value="footer">Footer</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="status">Status</Label>
                <Select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
              </FormGroup>
              
              <ModalButtons>
                <ModalButton 
                  type="button" 
                  variant="cancel"
                  onClick={() => setShowPromotionModal(false)}
                >
                  Cancel
                </ModalButton>
                <ModalButton 
                  type="submit" 
                  variant="confirm"
                >
                  {selectedPromotion ? 'Update' : 'Create'}
                </ModalButton>
              </ModalButtons>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Confirm Delete</ModalTitle>
            <p>Are you sure you want to delete the promotion "{selectedPromotion?.title}"? This action cannot be undone.</p>
            <ModalButtons>
              <ModalButton 
                variant="cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </ModalButton>
              <ModalButton 
                variant="delete"
                onClick={handleDelete}
              >
                Delete
              </ModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </AdminLayout>
  );
};

export default PromotionsPage;
