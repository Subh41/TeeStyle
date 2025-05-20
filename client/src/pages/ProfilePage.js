import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ProfileForm from '../components/profile/ProfileForm';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  margin-top: 30px;
  position: relative;
  z-index: 10;
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 0 0 10px rgba(255, 202, 40, 0.5);
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  font-size: 2.5rem;
  text-align: center;
  letter-spacing: 1px;
`;

const ProfileCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 202, 40, 0.2);
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  position: relative;
  z-index: 5;
  margin-bottom: 30px;
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
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
  padding-bottom: 5px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px 10px 0 0;
  padding-top: 10px;
`;

const Tab = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  margin: 0 5px;
  background: ${({ active, theme }) => 
    active ? theme.colors.secondary + '30' : 'rgba(0, 0, 0, 0.2)'};
  border: none;
  border-bottom: 3px solid ${({ active, theme }) => 
    active ? theme.colors.secondary : 'transparent'};
  color: ${({ active, theme }) => 
    active ? theme.colors.white : 'rgba(255, 255, 255, 0.7)'};
  font-weight: ${({ active }) => (active ? '600' : '500')};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  border-radius: 8px 8px 0 0;
  font-size: 1rem;
  letter-spacing: 0.5px;
  text-shadow: ${({ active }) => active ? '0 0 5px rgba(255, 202, 40, 0.5)' : 'none'};
  
  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.secondary + '30'};
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
          <h2 style={{ color: '#4a148c', fontSize: '1.8rem', borderBottom: '2px solid #ffca28', paddingBottom: '10px', marginBottom: '20px', textAlign: 'center' }}>Your Orders</h2>
          <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', border: '1px dashed #ffca28' }}>
            <p style={{ fontSize: '1.1rem', textAlign: 'center', color: '#333' }}>You haven't placed any orders yet.</p>
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <button style={{ background: '#4a148c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>Start Shopping</button>
            </div>
          </div>
        </ProfileCard>
      )}
      
      {activeTab === 'addresses' && (
        <ProfileCard>
          <h2 style={{ color: '#4a148c', fontSize: '1.8rem', borderBottom: '2px solid #ffca28', paddingBottom: '10px', marginBottom: '20px', textAlign: 'center' }}>Saved Addresses</h2>
          <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', border: '1px dashed #ffca28' }}>
            <p style={{ fontSize: '1.1rem', textAlign: 'center', color: '#333' }}>You don't have any saved addresses yet.</p>
            <p style={{ fontSize: '1rem', textAlign: 'center', color: '#666', marginTop: '10px' }}>Add addresses in the Edit Profile section.</p>
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <button onClick={() => setActiveTab('edit')} style={{ background: '#4a148c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>Edit Profile</button>
            </div>
          </div>
        </ProfileCard>
      )}
      
      {activeTab === 'payment' && (
        <ProfileCard>
          <h2 style={{ color: '#4a148c', fontSize: '1.8rem', borderBottom: '2px solid #ffca28', paddingBottom: '10px', marginBottom: '20px', textAlign: 'center' }}>Saved Payment Methods</h2>
          <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', border: '1px dashed #ffca28' }}>
            <p style={{ fontSize: '1.1rem', textAlign: 'center', color: '#333' }}>You don't have any saved payment methods yet.</p>
            <p style={{ fontSize: '1rem', textAlign: 'center', color: '#666', marginTop: '10px' }}>Payment methods can be added during checkout.</p>
            <div style={{ textAlign: 'center', marginTop: '15px' }}>
              <button style={{ background: '#4a148c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>Shop Now</button>
            </div>
          </div>
        </ProfileCard>
      )}
    </Container>
  );
};

export default ProfilePage;
