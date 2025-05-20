import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ProfileForm from '../components/profile/ProfileForm';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const ProfileCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const InfoGroup = styled.div`
  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }

  p {
    margin: ${({ theme }) => theme.spacing.xs} 0;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

const Tab = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: none;
  border: none;
  border-bottom: 3px solid ${({ active, theme }) => 
    active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.text.secondary};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) return null;

  return (
    <Container>
      <Title>My Profile</Title>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')}
        >
          Profile Info
        </Tab>
        <Tab 
          active={activeTab === 'edit'} 
          onClick={() => setActiveTab('edit')}
        >
          Edit Profile
        </Tab>
        <Tab 
          active={activeTab === 'orders'} 
          onClick={() => setActiveTab('orders')}
        >
          Order History
        </Tab>
        <Tab 
          active={activeTab === 'addresses'} 
          onClick={() => setActiveTab('addresses')}
        >
          Saved Addresses
        </Tab>
        <Tab 
          active={activeTab === 'payment'} 
          onClick={() => setActiveTab('payment')}
        >
          Payment Methods
        </Tab>
      </TabsContainer>
      
      {activeTab === 'profile' && (
        <ProfileCard>
          <ProfileInfo>
            <img src={user.avatar || 'https://via.placeholder.com/100'} alt={user.name} />
            <InfoGroup>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>Phone: {user.phone || 'Not provided'}</p>
              <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
            </InfoGroup>
          </ProfileInfo>
          
          <div style={{ marginTop: '20px' }}>
            <h3>Shipping Address</h3>
            {user.address ? (
              <p>
                {user.address}<br />
                {user.city}, {user.postalCode}<br />
                {user.country}
              </p>
            ) : (
              <p>No shipping address provided</p>
            )}
          </div>
        </ProfileCard>
      )}
      
      {activeTab === 'edit' && (
        <ProfileForm />
      )}
      
      {activeTab === 'orders' && (
        <ProfileCard>
          <h2>Your Orders</h2>
          <p>You haven't placed any orders yet.</p>
        </ProfileCard>
      )}
      
      {activeTab === 'addresses' && (
        <ProfileCard>
          <h2>Saved Addresses</h2>
          <p>You don't have any saved addresses yet.</p>
          <p>Add addresses in the Edit Profile section.</p>
        </ProfileCard>
      )}
      
      {activeTab === 'payment' && (
        <ProfileCard>
          <h2>Saved Payment Methods</h2>
          <p>You don't have any saved payment methods yet.</p>
          <p>Payment methods can be added during checkout.</p>
        </ProfileCard>
      )}
    </Container>
  );
};

export default ProfilePage;
