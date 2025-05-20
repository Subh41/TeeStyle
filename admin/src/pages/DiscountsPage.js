import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { 
  fetchDiscounts, 
  createDiscount, 
  updateDiscount, 
  deleteDiscount 
} from '../redux/slices/discountSlice';
import AdminLayout from '../components/layout/AdminLayout';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaTag, FaPercent, FaCalendarAlt } from 'react-icons/fa';

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

const DiscountGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const DiscountCard = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid rgba(255, 202, 40, 0.3);
  position: relative;
  overflow: hidden;
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
  }
`;

const DiscountHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DiscountIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md};
  box-shadow: 0 0 10px rgba(255, 202, 40, 0.5);
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  
  svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.white};
  }
`;

const DiscountName = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
`;

const DiscountCode = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-family: monospace;
  letter-spacing: 1px;
`;

const DiscountInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DiscountInfoItem = styled.div`
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

const DiscountValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.success};
  text-align: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.3);
`;

const DiscountActions = styled.div`
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

const DiscountsPage = () => {
  const dispatch = useDispatch();
  const { discounts, loading, error } = useSelector((state) => state.discounts);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: 'percentage',
    value: '',
    minPurchase: '',
    maxUses: '',
    startDate: '',
    endDate: '',
    status: 'active'
  });

  useEffect(() => {
    dispatch(fetchDiscounts());
  }, [dispatch]);
  
  // Effect to handle body scrolling when modal is open
  useEffect(() => {
    const handleBodyScroll = (isOpen) => {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    };
    
    // Apply when modal opens/closes
    handleBodyScroll(showDiscountModal || showDeleteModal);
    
    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showDiscountModal, showDeleteModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const openAddModal = () => {
    setSelectedDiscount(null);
    setFormData({
      name: '',
      code: '',
      type: 'percentage',
      value: '',
      minPurchase: '',
      maxUses: '',
      startDate: '',
      endDate: '',
      status: 'active'
    });
    setShowDiscountModal(true);
  };

  const openEditModal = (discount) => {
    setSelectedDiscount(discount);
    setFormData({
      name: discount.name,
      code: discount.code,
      type: discount.type,
      value: discount.value,
      minPurchase: discount.minPurchase || '',
      maxUses: discount.maxUses || '',
      startDate: discount.startDate ? new Date(discount.startDate).toISOString().split('T')[0] : '',
      endDate: discount.endDate ? new Date(discount.endDate).toISOString().split('T')[0] : '',
      status: discount.status
    });
    setShowDiscountModal(true);
  };

  const openDeleteModal = (discount) => {
    setSelectedDiscount(discount);
    setShowDeleteModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.code || !formData.value) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const discountData = {
      ...formData,
      value: Number(formData.value),
      minPurchase: formData.minPurchase ? Number(formData.minPurchase) : undefined,
      maxUses: formData.maxUses ? Number(formData.maxUses) : undefined,
    };
    
    if (selectedDiscount) {
      // Update existing discount
      dispatch(updateDiscount({ id: selectedDiscount._id, discountData }))
        .unwrap()
        .then(() => {
          toast.success('Discount updated successfully');
          setShowDiscountModal(false);
        })
        .catch((err) => {
          toast.error(`Failed to update discount: ${err}`);
        });
    } else {
      // Create new discount
      dispatch(createDiscount(discountData))
        .unwrap()
        .then(() => {
          toast.success('Discount created successfully');
          setShowDiscountModal(false);
        })
        .catch((err) => {
          toast.error(`Failed to create discount: ${err}`);
        });
    }
  };

  const handleDelete = () => {
    if (selectedDiscount) {
      dispatch(deleteDiscount(selectedDiscount._id))
        .unwrap()
        .then(() => {
          toast.success('Discount deleted successfully');
          setShowDeleteModal(false);
        })
        .catch((err) => {
          toast.error(`Failed to delete discount: ${err}`);
        });
    }
  };

  const getDiscountStatus = (discount) => {
    const now = new Date();
    const startDate = discount.startDate ? new Date(discount.startDate) : null;
    const endDate = discount.endDate ? new Date(discount.endDate) : null;
    
    if (discount.status === 'inactive') return 'inactive';
    if (endDate && now > endDate) return 'expired';
    if (startDate && now < startDate) return 'scheduled';
    return 'active';
  };

  return (
    <AdminLayout>
      <PageTitle>Discount Management</PageTitle>
      
      <ActionBar>
        <AddButton onClick={openAddModal}>
          <FaPlus /> Add New Discount
        </AddButton>
      </ActionBar>
      
      {loading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : error ? (
        <div>Error: {error}</div>
      ) : discounts.length === 0 ? (
        <EmptyState>
          <FaTag />
          <h3>No Discounts Found</h3>
          <p>Create your first discount to offer special deals to your customers.</p>
          <AddButton onClick={openAddModal}>
            <FaPlus /> Add New Discount
          </AddButton>
        </EmptyState>
      ) : (
        <DiscountGrid>
          {discounts.map((discount) => {
            const status = getDiscountStatus(discount);
            return (
              <DiscountCard key={discount._id}>
                <DiscountHeader>
                  <DiscountIcon>
                    {discount.type === 'percentage' ? <FaPercent /> : <FaTag />}
                  </DiscountIcon>
                  <div>
                    <DiscountName>{discount.name}</DiscountName>
                    <DiscountCode>{discount.code}</DiscountCode>
                  </div>
                </DiscountHeader>
                
                <DiscountValue>
                  {discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value.toFixed(2)}`}
                </DiscountValue>
                
                <DiscountInfo>
                  <DiscountInfoItem>
                    <span>Status:</span>
                    <StatusBadge status={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </StatusBadge>
                  </DiscountInfoItem>
                  
                  {discount.minPurchase && (
                    <DiscountInfoItem>
                      <span>Min Purchase:</span>
                      <span>${discount.minPurchase.toFixed(2)}</span>
                    </DiscountInfoItem>
                  )}
                  
                  {discount.maxUses && (
                    <DiscountInfoItem>
                      <span>Max Uses:</span>
                      <span>{discount.maxUses}</span>
                    </DiscountInfoItem>
                  )}
                  
                  {discount.startDate && (
                    <DiscountInfoItem>
                      <span>Start Date:</span>
                      <span>{new Date(discount.startDate).toLocaleDateString()}</span>
                    </DiscountInfoItem>
                  )}
                  
                  {discount.endDate && (
                    <DiscountInfoItem>
                      <span>End Date:</span>
                      <span>{new Date(discount.endDate).toLocaleDateString()}</span>
                    </DiscountInfoItem>
                  )}
                </DiscountInfo>
                
                <DiscountActions>
                  <ActionButton 
                    variant="edit"
                    onClick={() => openEditModal(discount)}
                  >
                    <FaEdit /> Edit
                  </ActionButton>
                  <ActionButton 
                    variant="delete"
                    onClick={() => openDeleteModal(discount)}
                  >
                    <FaTrash /> Delete
                  </ActionButton>
                </DiscountActions>
              </DiscountCard>
            );
          })}
        </DiscountGrid>
      )}
      
      {/* Discount Form Modal */}
      {showDiscountModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>
              {selectedDiscount ? 'Edit Discount' : 'Add New Discount'}
            </ModalTitle>
            
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name">Discount Name*</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="code">Discount Code*</Label>
                <Input
                  type="text"
                  id="code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="type">Discount Type*</Label>
                <Select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="value">
                  {formData.type === 'percentage' ? 'Percentage Value*' : 'Fixed Amount*'}
                </Label>
                <Input
                  type="number"
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  min="0"
                  step={formData.type === 'percentage' ? '1' : '0.01'}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="minPurchase">Minimum Purchase Amount</Label>
                <Input
                  type="number"
                  id="minPurchase"
                  name="minPurchase"
                  value={formData.minPurchase}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="maxUses">Maximum Uses</Label>
                <Input
                  type="number"
                  id="maxUses"
                  name="maxUses"
                  value={formData.maxUses}
                  onChange={handleInputChange}
                  min="0"
                />
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
                  onClick={() => setShowDiscountModal(false)}
                >
                  Cancel
                </ModalButton>
                <ModalButton 
                  type="submit" 
                  variant="confirm"
                >
                  {selectedDiscount ? 'Update' : 'Create'}
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
            <p>Are you sure you want to delete the discount "{selectedDiscount?.name}"? This action cannot be undone.</p>
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

export default DiscountsPage;
