import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiPlus, FiEdit, FiTrash2, FiCalendar, FiGift, FiTag } from 'react-icons/fi';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  font-size: 1.8rem;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const Table = styled.table`
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-collapse: collapse;
  margin-top: ${({ theme }) => theme.spacing.md};
  overflow: hidden;
`;

const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 600;
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
    transform: scale(1.1);
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
  background-color: ${({ active, theme }) => active ? theme.colors.success : theme.colors.gray[500]};
`;

const FormModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${({ show }) => (show ? 'flex' : 'none')};
  justify-content: center;
  align-items: flex-start;
  z-index: 10000;
  padding: 80px 20px 20px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  max-width: 500px;
  width: 90%;
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
  margin: auto;
`;

const ModalTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  label {
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    font-weight: 500;
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
    min-height: 100px;
    resize: vertical;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme, secondary }) => secondary ? 'transparent' : theme.colors.primary};
  color: ${({ theme, secondary }) => secondary ? theme.colors.text.primary : theme.colors.white};
  border: ${({ theme, secondary }) => secondary ? `1px solid ${theme.colors.gray[300]}` : 'none'};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme, secondary }) => secondary ? theme.colors.gray[100] : theme.colors.secondary};
  }
`;

// Sample promotion data
const samplePromotions = [
  {
    id: 1,
    name: 'Summer Heroes Collection',
    description: 'Special summer collection featuring limited edition superhero designs',
    type: 'Collection',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    discount: '15%',
    active: true,
  },
  {
    id: 2,
    name: 'Buy 2 Get 1 Free',
    description: 'Buy any two t-shirts and get the third one free',
    type: 'Bundle',
    startDate: '2025-05-01',
    endDate: '2025-06-30',
    discount: 'Free item',
    active: true,
  },
  {
    id: 3,
    name: 'Marvel Madness',
    description: 'Special discounts on all Marvel t-shirts',
    type: 'Category',
    startDate: '2025-07-01',
    endDate: '2025-07-15',
    discount: '20%',
    active: false,
  },
];

const Promotions = () => {
  const [promotions, setPromotions] = useState(samplePromotions);
  const [showModal, setShowModal] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState(null);
  
  // Control body scroll when modal is open
  useEffect(() => {
    if (showModal) {
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
  }, [showModal]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'Collection',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    discount: '',
    active: true,
  });

  const handleAddNew = () => {
    setCurrentPromotion(null);
    setFormData({
      name: '',
      description: '',
      type: 'Collection',
      startDate: '',
      endDate: '',
      discount: '',
      active: true,
    });
    setShowModal(true);
  };

  const handleEdit = (promotion) => {
    setCurrentPromotion(promotion);
    setFormData({
      name: promotion.name,
      description: promotion.description,
      type: promotion.type,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      discount: promotion.discount,
      active: promotion.active,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this promotion?')) {
      setPromotions(promotions.filter(promotion => promotion.id !== id));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentPromotion) {
      // Update existing promotion
      setPromotions(promotions.map(promotion => 
        promotion.id === currentPromotion.id ? { ...promotion, ...formData } : promotion
      ));
    } else {
      // Add new promotion
      const newPromotion = {
        id: promotions.length + 1,
        ...formData,
      };
      setPromotions([...promotions, newPromotion]);
    }
    
    setShowModal(false);
  };

  return (
    <Container>
      <Title>Special Promotions</Title>
      
      <ActionBar>
        <AddButton onClick={handleAddNew}>
          <FiPlus /> Add New Promotion
        </AddButton>
      </ActionBar>
      
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Period</Th>
            <Th>Discount</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {promotions.length === 0 ? (
            <tr>
              <Td colSpan="6" style={{ textAlign: 'center' }}>No promotions found.</Td>
            </tr>
          ) : (
            promotions.map(promotion => (
              <tr key={promotion.id}>
                <Td>
                  <div style={{ fontWeight: 'bold' }}>{promotion.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{promotion.description}</div>
                </Td>
                <Td>{promotion.type}</Td>
                <Td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FiCalendar style={{ marginRight: '5px' }} />
                    {promotion.startDate} to {promotion.endDate}
                  </div>
                </Td>
                <Td>{promotion.discount}</Td>
                <Td>
                  <StatusBadge active={promotion.active}>
                    {promotion.active ? 'Active' : 'Inactive'}
                  </StatusBadge>
                </Td>
                <Td>
                  <ActionButtons>
                    <ActionButton onClick={() => handleEdit(promotion)}>
                      <FiEdit />
                    </ActionButton>
                    <ActionButton danger onClick={() => handleDelete(promotion.id)}>
                      <FiTrash2 />
                    </ActionButton>
                  </ActionButtons>
                </Td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      
      <FormModal show={showModal}>
        <ModalContent>
          <ModalTitle>{currentPromotion ? 'Edit Promotion' : 'Add New Promotion'}</ModalTitle>
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label htmlFor="name">Promotion Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
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
              <label htmlFor="type">Promotion Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="Collection">Collection</option>
                <option value="Bundle">Bundle</option>
                <option value="Category">Category</option>
                <option value="Flash Sale">Flash Sale</option>
              </select>
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
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
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="discount">Discount</label>
              <input
                type="text"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="e.g. 15% or Free item"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                  style={{ width: 'auto', marginRight: '10px' }}
                />
                Active
              </label>
            </FormGroup>
            
            <ButtonGroup>
              <Button type="button" secondary onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {currentPromotion ? 'Update' : 'Create'}
              </Button>
            </ButtonGroup>
          </form>
        </ModalContent>
      </FormModal>
    </Container>
  );
};

export default Promotions;
