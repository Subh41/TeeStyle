import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiTag, FiEdit2, FiTrash2, FiPlus, FiCheck, FiX } from 'react-icons/fi';
import { fetchDiscounts, addDiscount, updateDiscount, deleteDiscount } from '../../redux/slices/discountSlice';

const PageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  h1 {
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.typography.heading.fontFamily};
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 0 0 10px rgba(255, 202, 40, 0.5);
    font-size: 1.8rem;
    margin: 0;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
    
    svg {
      color: ${({ theme }) => theme.colors.secondary};
      filter: drop-shadow(0 0 5px rgba(255, 202, 40, 0.5));
    }
  }
`;

const AddButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.background.deeper};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background: ${({ theme }) => theme.colors.heroRed};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }
`;

const DiscountGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const DiscountCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.deeper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border: 2px solid ${({ theme, active }) => active ? theme.colors.secondary : 'rgba(255, 255, 255, 0.1)'};
  position: relative;
  overflow: hidden;
  
  /* Comic style stars */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.1;
    pointer-events: none;
    z-index: 0;
  }
  
  /* Inactive status style */
  ${({ active }) => !active && `
    filter: grayscale(0.7);
    opacity: 0.7;
  `}
`;

const DiscountCode = styled.div`
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  background: rgba(0, 0, 0, 0.2);
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: inline-block;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const DiscountDescription = styled.p`
  color: ${({ theme }) => theme.colors.white};
  margin: ${({ theme }) => theme.spacing.md} 0;
  font-size: 1rem;
  line-height: 1.5;
`;

const DiscountDetails = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  
  .detail-row {
    display: flex;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing.sm} 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    &:last-child {
      border-bottom: none;
    }
    
    .label {
      color: ${({ theme }) => theme.colors.white};
      opacity: 0.7;
    }
    
    .value {
      color: ${({ theme }) => theme.colors.secondary};
      font-weight: 600;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
`;

const IconButton = styled(motion.button)`
  background: ${({ theme, variant }) => 
    variant === 'edit' ? 'rgba(55, 125, 255, 0.1)' : 
    variant === 'delete' ? 'rgba(255, 75, 75, 0.1)' : 
    variant === 'activate' ? 'rgba(75, 255, 75, 0.1)' : 
    'rgba(255, 255, 255, 0.1)'
  };
  color: ${({ theme, variant }) => 
    variant === 'edit' ? theme.colors.heroBlue : 
    variant === 'delete' ? theme.colors.heroRed : 
    variant === 'activate' ? '#4BFF4B' : 
    theme.colors.white
  };
  border: 1px solid ${({ theme, variant }) => 
    variant === 'edit' ? theme.colors.heroBlue : 
    variant === 'delete' ? theme.colors.heroRed : 
    variant === 'activate' ? '#4BFF4B' : 
    'rgba(255, 255, 255, 0.3)'
  };
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    background: ${({ theme, variant }) => 
      variant === 'edit' ? theme.colors.heroBlue : 
      variant === 'delete' ? theme.colors.heroRed : 
      variant === 'activate' ? '#4BFF4B' : 
      theme.colors.white
    };
    color: ${({ theme }) => theme.colors.background.deeper};
  }
`;

const StatusBadge = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ active, theme }) => active ? 'rgba(75, 255, 75, 0.2)' : 'rgba(255, 75, 75, 0.2)'};
  color: ${({ active, theme }) => active ? '#4BFF4B' : theme.colors.heroRed};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid ${({ active, theme }) => active ? '#4BFF4B' : theme.colors.heroRed};
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 10000;
  padding: 80px 20px 20px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  margin: auto;
  position: relative;
  
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text.primary};
    text-align: center;
  }
`;

const DiscountForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  
  label {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
  
  input, select, textarea {
    padding: ${({ theme }) => theme.spacing.sm};
    border: 1px solid ${({ theme }) => theme.colors.gray[300]};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
  
  input[type="checkbox"] {
    width: auto;
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme, primary }) => primary ? theme.colors.primary : 'transparent'};
  color: ${({ theme, primary }) => primary ? theme.colors.white : theme.colors.text.primary};
  border: 1px solid ${({ theme, primary }) => primary ? 'transparent' : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme, primary }) => primary ? theme.colors.secondary : theme.colors.gray[100]};
    transform: translateY(-2px);
  }
`;

const DiscountManagement = () => {
  const dispatch = useDispatch();
  const { discounts, loading } = useSelector(state => state.discounts) || { discounts: [], loading: false };
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentDiscount, setCurrentDiscount] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'percentage',
    discountPercentage: '',
    discountAmount: '',
    minPurchase: '0',
    maxDiscount: '',
    startDate: '',
    endDate: '',
    usageLimit: '100',
    applicableProducts: 'all',
    isActive: true
  });

  useEffect(() => {
    dispatch(fetchDiscounts());
  }, [dispatch]);

  // Control body scroll when modal is open
  useEffect(() => {
    if (showAddModal) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      
      // Add styles to body to prevent scrolling but maintain position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      // Get the scroll position from body top property
      const scrollY = document.body.style.top;
      
      // Reset body styles
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [showAddModal]);

  const handleAddDiscount = () => {
    setCurrentDiscount(null);
    setFormData({
      code: '',
      description: '',
      discountType: 'percentage',
      discountPercentage: '',
      discountAmount: '',
      minPurchase: '0',
      maxDiscount: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      usageLimit: '100',
      applicableProducts: 'all',
      isActive: true
    });
    setShowAddModal(true);
  };

  const handleEditDiscount = (discount) => {
    setCurrentDiscount(discount);
    setFormData({
      code: discount.code,
      description: discount.description,
      discountType: discount.discountPercentage ? 'percentage' : 'fixed',
      discountPercentage: discount.discountPercentage || '',
      discountAmount: discount.discountAmount || '',
      minPurchase: discount.minPurchase || '0',
      maxDiscount: discount.maxDiscount || '',
      startDate: new Date(discount.startDate).toISOString().split('T')[0],
      endDate: new Date(discount.endDate).toISOString().split('T')[0],
      usageLimit: discount.usageLimit || '100',
      applicableProducts: Array.isArray(discount.applicableProducts) ? discount.applicableProducts.join(', ') : 'all',
      isActive: discount.isActive
    });
    setShowAddModal(true);
  };

  const handleDeleteDiscount = (discount) => {
    if (window.confirm(`Are you sure you want to delete the discount code ${discount.code}?`)) {
      dispatch(deleteDiscount(discount._id));
    }
  };

  const handleToggleActive = (discount) => {
    const updatedDiscount = {
      ...discount,
      isActive: !discount.isActive
    };
    dispatch(updateDiscount(updatedDiscount));
  };
  
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmitDiscount = (e) => {
    e.preventDefault();
    
    const discountData = {
      code: formData.code,
      description: formData.description,
      discountPercentage: formData.discountType === 'percentage' ? Number(formData.discountPercentage) : null,
      discountAmount: formData.discountType === 'fixed' ? Number(formData.discountAmount) : null,
      minPurchase: Number(formData.minPurchase) || 0,
      maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : null,
      startDate: formData.startDate,
      endDate: formData.endDate,
      usageLimit: Number(formData.usageLimit),
      applicableProducts: formData.applicableProducts.split(',').map(item => item.trim()),
      isActive: formData.isActive,
      usageCount: currentDiscount ? currentDiscount.usageCount : 0
    };
    
    if (currentDiscount) {
      dispatch(updateDiscount({ ...discountData, _id: currentDiscount._id }));
    } else {
      dispatch(addDiscount(discountData));
    }
    
    setShowAddModal(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <h1><FiTag size={24} /> Discount Coupon Management</h1>
        <AddButton 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddDiscount}
        >
          <FiPlus /> Create New Coupon
        </AddButton>
      </PageHeader>

      {loading ? (
        <p>Loading discounts...</p>
      ) : (
        <DiscountGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {discounts && discounts.map(discount => (
            <DiscountCard 
              key={discount._id}
              active={discount.isActive}
              variants={cardVariants}
            >
              <StatusBadge active={discount.isActive}>
                {discount.isActive ? (
                  <>
                    <FiCheck size={12} /> Active
                  </>
                ) : (
                  <>
                    <FiX size={12} /> Inactive
                  </>
                )}
              </StatusBadge>
              
              <DiscountCode>{discount.code}</DiscountCode>
              <DiscountDescription>{discount.description}</DiscountDescription>
              
              <DiscountDetails>
                {discount.discountPercentage && (
                  <div className="detail-row">
                    <span className="label">Discount</span>
                    <span className="value">{discount.discountPercentage}%</span>
                  </div>
                )}
                
                {discount.discountAmount && (
                  <div className="detail-row">
                    <span className="label">Amount Off</span>
                    <span className="value">${discount.discountAmount}</span>
                  </div>
                )}
                
                {discount.minPurchase > 0 && (
                  <div className="detail-row">
                    <span className="label">Min Purchase</span>
                    <span className="value">${discount.minPurchase}</span>
                  </div>
                )}
                
                {discount.maxDiscount && (
                  <div className="detail-row">
                    <span className="label">Max Discount</span>
                    <span className="value">${discount.maxDiscount}</span>
                  </div>
                )}
                
                <div className="detail-row">
                  <span className="label">Applies To</span>
                  <span className="value">
                    {discount.applicableProducts.join(', ')}
                  </span>
                </div>
                
                <div className="detail-row">
                  <span className="label">Usage</span>
                  <span className="value">
                    {discount.usageCount} / {discount.usageLimit}
                  </span>
                </div>
                
                <div className="detail-row">
                  <span className="label">Valid Until</span>
                  <span className="value">
                    {new Date(discount.endDate).toLocaleDateString()}
                  </span>
                </div>
              </DiscountDetails>
              
              <ActionButtons>
                <IconButton 
                  variant="edit"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEditDiscount(discount)}
                >
                  <FiEdit2 />
                </IconButton>
                
                <IconButton 
                  variant="delete"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteDiscount(discount)}
                >
                  <FiTrash2 />
                </IconButton>
                
                <IconButton 
                  variant="activate"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleToggleActive(discount)}
                >
                  {discount.isActive ? <FiX /> : <FiCheck />}
                </IconButton>
              </ActionButtons>
            </DiscountCard>
          ))}
        </DiscountGrid>
      )}
      
      {showAddModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>{currentDiscount ? 'Edit Discount' : 'Create New Discount'}</h2>
            <DiscountForm onSubmit={handleSubmitDiscount}>
              <FormGroup>
                <label htmlFor="code">Discount Code</label>
                <input 
                  type="text" 
                  id="code" 
                  name="code" 
                  value={formData.code} 
                  onChange={handleFormChange} 
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="description">Description</label>
                <input 
                  type="text" 
                  id="description" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleFormChange} 
                  required 
                />
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <label htmlFor="discountType">Discount Type</label>
                  <select 
                    id="discountType" 
                    name="discountType" 
                    value={formData.discountType} 
                    onChange={handleFormChange}
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </FormGroup>
                
                {formData.discountType === 'percentage' ? (
                  <FormGroup>
                    <label htmlFor="discountPercentage">Discount Percentage (%)</label>
                    <input 
                      type="number" 
                      id="discountPercentage" 
                      name="discountPercentage" 
                      value={formData.discountPercentage} 
                      onChange={handleFormChange} 
                      min="1" 
                      max="100" 
                      required 
                    />
                  </FormGroup>
                ) : (
                  <FormGroup>
                    <label htmlFor="discountAmount">Discount Amount ($)</label>
                    <input 
                      type="number" 
                      id="discountAmount" 
                      name="discountAmount" 
                      value={formData.discountAmount} 
                      onChange={handleFormChange} 
                      min="1" 
                      required 
                    />
                  </FormGroup>
                )}
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <label htmlFor="minPurchase">Minimum Purchase ($)</label>
                  <input 
                    type="number" 
                    id="minPurchase" 
                    name="minPurchase" 
                    value={formData.minPurchase} 
                    onChange={handleFormChange} 
                    min="0" 
                  />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="maxDiscount">Maximum Discount ($)</label>
                  <input 
                    type="number" 
                    id="maxDiscount" 
                    name="maxDiscount" 
                    value={formData.maxDiscount} 
                    onChange={handleFormChange} 
                    min="0" 
                  />
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <label htmlFor="startDate">Start Date</label>
                  <input 
                    type="date" 
                    id="startDate" 
                    name="startDate" 
                    value={formData.startDate} 
                    onChange={handleFormChange} 
                    required 
                  />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="endDate">End Date</label>
                  <input 
                    type="date" 
                    id="endDate" 
                    name="endDate" 
                    value={formData.endDate} 
                    onChange={handleFormChange} 
                    required 
                  />
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <label htmlFor="usageLimit">Usage Limit</label>
                <input 
                  type="number" 
                  id="usageLimit" 
                  name="usageLimit" 
                  value={formData.usageLimit} 
                  onChange={handleFormChange} 
                  min="1" 
                  required 
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="applicableProducts">Applicable Products (comma separated)</label>
                <input 
                  type="text" 
                  id="applicableProducts" 
                  name="applicableProducts" 
                  value={formData.applicableProducts} 
                  onChange={handleFormChange} 
                  placeholder="all, t-shirts, hoodies" 
                />
              </FormGroup>
              
              <FormGroup>
                <label>
                  <input 
                    type="checkbox" 
                    name="isActive" 
                    checked={formData.isActive} 
                    onChange={handleFormChange} 
                  />
                  Active
                </label>
              </FormGroup>
              
              <ButtonGroup>
                <Button type="submit" primary>
                  {currentDiscount ? 'Update Discount' : 'Create Discount'}
                </Button>
                <Button type="button" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
              </ButtonGroup>
            </DiscountForm>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default DiscountManagement;
