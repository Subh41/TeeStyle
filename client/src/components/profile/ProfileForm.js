import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updateProfile } from '../../redux/slices/authSlice';

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 202, 40, 0.2);
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  position: relative;
  z-index: 5;
  margin-bottom: 30px;
`;

const FormTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  font-size: 1.8rem;
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
  padding-bottom: 10px;
  margin-bottom: 25px;
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1.1rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 8px rgba(255, 202, 40, 0.4);
  }
  
  &:disabled {
    background-color: rgba(240, 240, 240, 0.9);
    color: #555;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1.1rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  min-height: 120px;
  resize: vertical;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 5px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 8px rgba(255, 202, 40, 0.4);
  }
`;

const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 15px;
  display: block;
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.6s ease;
  }
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    
    &:before {
      left: 100%;
    }
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors.gray[400]};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    border-color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-right: ${({ theme }) => theme.spacing.lg};
`;

const AvatarInfo = styled.div`
  flex: 1;
`;

const Message = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ success, theme }) => 
    success ? theme.colors.success + '20' : theme.colors.error + '20'};
  color: ${({ success, theme }) => 
    success ? theme.colors.success : theme.colors.error};
`;

const ProfileForm = () => {
  const { user, loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  
  const [message, setMessage] = useState({ text: '', success: false });
  const [showMessage, setShowMessage] = useState(false);
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
        country: user.country || ''
      });
    }
  }, [user]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // Get the first letter of the user's name for the avatar
  const getNameInitial = () => {
    if (formData.name && formData.name.length > 0) {
      return formData.name.charAt(0).toUpperCase();
    }
    return '?';
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would be an API call
    dispatch(updateProfile(formData));
    
    // Show success message
    setMessage({ text: 'Profile updated successfully!', success: true });
    setShowMessage(true);
    
    // Hide message after 3 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };
  
  return (
    <FormContainer>
      <FormTitle>Update Profile</FormTitle>
      
      {showMessage && (
        <Message success={message.success}>
          {message.text}
        </Message>
      )}
      
      <form onSubmit={handleSubmit}>
        <AvatarSection>
          <Avatar>
            {getNameInitial()}
          </Avatar>
          <AvatarInfo>
            <h3 style={{ margin: '0 0 8px 0' }}>{formData.name || 'Your Name'}</h3>
            <p style={{ margin: 0, color: '#666' }}>{formData.email || 'your.email@example.com'}</p>
          </AvatarInfo>
        </AvatarSection>
        
        <FormGroup>
          <Label htmlFor="name">Full Name</Label>
          <Input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="email">Email Address</Label>
          <Input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            required
            disabled // Email cannot be changed
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="address">Address</Label>
          <TextArea 
            id="address" 
            name="address" 
            value={formData.address} 
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="city">City</Label>
          <Input 
            type="text" 
            id="city" 
            name="city" 
            value={formData.city} 
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input 
            type="text" 
            id="postalCode" 
            name="postalCode" 
            value={formData.postalCode} 
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="country">Country</Label>
          <Input 
            type="text" 
            id="country" 
            name="country" 
            value={formData.country} 
            onChange={handleChange}
          />
        </FormGroup>
        
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ProfileForm;
