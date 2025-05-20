import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSave, FiSettings, FiMail, FiDollarSign, FiTruck, FiImage, FiGlobe } from 'react-icons/fi';

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

const TabContainer = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  padding-bottom: 2px;
`;

const Tab = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ active, theme }) => active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  color: ${({ active, theme }) => active ? theme.colors.white : 'rgba(255, 255, 255, 0.7)'};
  border: none;
  border-bottom: 3px solid ${({ active, theme }) => active ? theme.colors.secondary : 'transparent'};
  font-weight: ${({ active }) => active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  white-space: nowrap;
  
  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: rgba(255, 255, 255, 0.05);
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const SettingsForm = styled.form`
  background: rgba(255, 255, 255, 0.9);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.lg};
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-bottom: ${({ theme }) => theme.spacing.xs};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  input {
    width: auto;
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    // General Settings
    siteName: 'TeeStyle',
    siteDescription: 'Superhero themed t-shirts for everyone',
    logo: '',
    favicon: '',
    
    // Payment Settings
    currency: 'USD',
    stripeKey: '',
    paypalClientId: '',
    razorpayKey: '',
    enableStripe: true,
    enablePaypal: true,
    enableRazorpay: false,
    enableCashOnDelivery: true,
    
    // Shipping Settings
    freeShippingThreshold: '50',
    defaultShippingRate: '5',
    internationalShipping: true,
    
    // Email Settings
    emailFrom: 'noreply@teestyle.com',
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPassword: '',
    
    // Social Media
    facebook: '',
    instagram: '',
    twitter: '',
    pinterest: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save the settings to the backend
    alert('Settings saved successfully!');
  };

  return (
    <Container>
      <Title>Store Settings</Title>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'general'} 
          onClick={() => setActiveTab('general')}
        >
          <FiSettings /> General
        </Tab>
        <Tab 
          active={activeTab === 'payment'} 
          onClick={() => setActiveTab('payment')}
        >
          <FiDollarSign /> Payment
        </Tab>
        <Tab 
          active={activeTab === 'shipping'} 
          onClick={() => setActiveTab('shipping')}
        >
          <FiTruck /> Shipping
        </Tab>
        <Tab 
          active={activeTab === 'email'} 
          onClick={() => setActiveTab('email')}
        >
          <FiMail /> Email
        </Tab>
        <Tab 
          active={activeTab === 'social'} 
          onClick={() => setActiveTab('social')}
        >
          <FiGlobe /> Social Media
        </Tab>
      </TabContainer>
      
      <SettingsForm onSubmit={handleSubmit}>
        {activeTab === 'general' && (
          <>
            <FormSection>
              <h3>Store Information</h3>
              <FormGroup>
                <label htmlFor="siteName">Store Name</label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="siteDescription">Store Description</label>
                <textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={formData.siteDescription}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormSection>
            
            <FormSection>
              <h3>Store Branding</h3>
              <FormRow>
                <FormGroup>
                  <label htmlFor="logo">Logo</label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      accept="image/*"
                    />
                    {formData.logo && (
                      <img 
                        src={formData.logo} 
                        alt="Logo" 
                        style={{ width: '40px', height: '40px', marginLeft: '10px' }} 
                      />
                    )}
                  </div>
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="favicon">Favicon</label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="file"
                      id="favicon"
                      name="favicon"
                      accept="image/*"
                    />
                    {formData.favicon && (
                      <img 
                        src={formData.favicon} 
                        alt="Favicon" 
                        style={{ width: '16px', height: '16px', marginLeft: '10px' }} 
                      />
                    )}
                  </div>
                </FormGroup>
              </FormRow>
            </FormSection>
          </>
        )}
        
        {activeTab === 'payment' && (
          <>
            <FormSection>
              <h3>Currency Settings</h3>
              <FormGroup>
                <label htmlFor="currency">Default Currency</label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="INR">INR - Indian Rupee</option>
                </select>
              </FormGroup>
            </FormSection>
            
            <FormSection>
              <h3>Payment Gateways</h3>
              
              <FormGroup>
                <CheckboxGroup>
                  <input
                    type="checkbox"
                    id="enableStripe"
                    name="enableStripe"
                    checked={formData.enableStripe}
                    onChange={handleChange}
                  />
                  <label htmlFor="enableStripe">Enable Stripe</label>
                </CheckboxGroup>
                
                {formData.enableStripe && (
                  <FormGroup>
                    <label htmlFor="stripeKey">Stripe API Key</label>
                    <input
                      type="text"
                      id="stripeKey"
                      name="stripeKey"
                      value={formData.stripeKey}
                      onChange={handleChange}
                      placeholder="sk_test_..."
                    />
                  </FormGroup>
                )}
              </FormGroup>
              
              <FormGroup>
                <CheckboxGroup>
                  <input
                    type="checkbox"
                    id="enablePaypal"
                    name="enablePaypal"
                    checked={formData.enablePaypal}
                    onChange={handleChange}
                  />
                  <label htmlFor="enablePaypal">Enable PayPal</label>
                </CheckboxGroup>
                
                {formData.enablePaypal && (
                  <FormGroup>
                    <label htmlFor="paypalClientId">PayPal Client ID</label>
                    <input
                      type="text"
                      id="paypalClientId"
                      name="paypalClientId"
                      value={formData.paypalClientId}
                      onChange={handleChange}
                    />
                  </FormGroup>
                )}
              </FormGroup>
              
              <FormGroup>
                <CheckboxGroup>
                  <input
                    type="checkbox"
                    id="enableRazorpay"
                    name="enableRazorpay"
                    checked={formData.enableRazorpay}
                    onChange={handleChange}
                  />
                  <label htmlFor="enableRazorpay">Enable Razorpay</label>
                </CheckboxGroup>
                
                {formData.enableRazorpay && (
                  <FormGroup>
                    <label htmlFor="razorpayKey">Razorpay Key</label>
                    <input
                      type="text"
                      id="razorpayKey"
                      name="razorpayKey"
                      value={formData.razorpayKey}
                      onChange={handleChange}
                    />
                  </FormGroup>
                )}
              </FormGroup>
              
              <FormGroup>
                <CheckboxGroup>
                  <input
                    type="checkbox"
                    id="enableCashOnDelivery"
                    name="enableCashOnDelivery"
                    checked={formData.enableCashOnDelivery}
                    onChange={handleChange}
                  />
                  <label htmlFor="enableCashOnDelivery">Enable Cash on Delivery</label>
                </CheckboxGroup>
              </FormGroup>
            </FormSection>
          </>
        )}
        
        {activeTab === 'shipping' && (
          <FormSection>
            <h3>Shipping Options</h3>
            
            <FormGroup>
              <label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</label>
              <input
                type="number"
                id="freeShippingThreshold"
                name="freeShippingThreshold"
                value={formData.freeShippingThreshold}
                onChange={handleChange}
                min="0"
              />
              <small>Set to 0 to disable free shipping</small>
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="defaultShippingRate">Default Shipping Rate ($)</label>
              <input
                type="number"
                id="defaultShippingRate"
                name="defaultShippingRate"
                value={formData.defaultShippingRate}
                onChange={handleChange}
                min="0"
              />
            </FormGroup>
            
            <FormGroup>
              <CheckboxGroup>
                <input
                  type="checkbox"
                  id="internationalShipping"
                  name="internationalShipping"
                  checked={formData.internationalShipping}
                  onChange={handleChange}
                />
                <label htmlFor="internationalShipping">Enable International Shipping</label>
              </CheckboxGroup>
            </FormGroup>
          </FormSection>
        )}
        
        {activeTab === 'email' && (
          <FormSection>
            <h3>Email Configuration</h3>
            
            <FormGroup>
              <label htmlFor="emailFrom">From Email Address</label>
              <input
                type="email"
                id="emailFrom"
                name="emailFrom"
                value={formData.emailFrom}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="smtpHost">SMTP Host</label>
              <input
                type="text"
                id="smtpHost"
                name="smtpHost"
                value={formData.smtpHost}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormRow>
              <FormGroup>
                <label htmlFor="smtpPort">SMTP Port</label>
                <input
                  type="text"
                  id="smtpPort"
                  name="smtpPort"
                  value={formData.smtpPort}
                  onChange={handleChange}
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="smtpUser">SMTP Username</label>
                <input
                  type="text"
                  id="smtpUser"
                  name="smtpUser"
                  value={formData.smtpUser}
                  onChange={handleChange}
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="smtpPassword">SMTP Password</label>
                <input
                  type="password"
                  id="smtpPassword"
                  name="smtpPassword"
                  value={formData.smtpPassword}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormRow>
          </FormSection>
        )}
        
        {activeTab === 'social' && (
          <FormSection>
            <h3>Social Media Links</h3>
            
            <FormGroup>
              <label htmlFor="facebook">Facebook</label>
              <input
                type="url"
                id="facebook"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/your-page"
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="instagram">Instagram</label>
              <input
                type="url"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/your-handle"
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="twitter">Twitter</label>
              <input
                type="url"
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/your-handle"
              />
            </FormGroup>
            
            <FormGroup>
              <label htmlFor="pinterest">Pinterest</label>
              <input
                type="url"
                id="pinterest"
                name="pinterest"
                value={formData.pinterest}
                onChange={handleChange}
                placeholder="https://pinterest.com/your-handle"
              />
            </FormGroup>
          </FormSection>
        )}
        
        <SaveButton type="submit">
          <FiSave /> Save Settings
        </SaveButton>
      </SettingsForm>
    </Container>
  );
};

export default Settings;
