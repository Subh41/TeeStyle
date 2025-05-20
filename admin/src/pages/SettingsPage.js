import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchSettings, updateSettings } from '../redux/slices/settingsSlice';
import AdminLayout from '../components/layout/AdminLayout';
import { toast } from 'react-toastify';
import { 
  FaStore, 
  FaShippingFast, 
  FaCreditCard, 
  FaEnvelope, 
  FaSave, 
  FaGlobe,
  FaImage,
  FaCheck
} from 'react-icons/fa';

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

const SettingsContainer = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid rgba(255, 202, 40, 0.3);
  position: relative;
  overflow: hidden;
  
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
    z-index: 0;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid rgba(255, 202, 40, 0.3);
  position: relative;
  z-index: 1;
`;

const Tab = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ active, theme }) => 
    active ? 'rgba(255, 202, 40, 0.2)' : 'transparent'};
  color: ${({ active, theme }) => 
    active ? theme.colors.secondary : theme.colors.text.secondary};
  border: none;
  border-bottom: 3px solid ${({ active, theme }) => 
    active ? theme.colors.secondary : 'transparent'};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    background: rgba(255, 202, 40, 0.1);
    color: ${({ theme }) => theme.colors.text.light};
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const TabContent = styled.div`
  display: ${({ active }) => (active ? 'block' : 'none')};
  position: relative;
  z-index: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text.light};
    border-bottom: 1px solid rgba(255, 202, 40, 0.3);
    padding-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
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

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  
  input {
    width: 18px;
    height: 18px;
    accent-color: ${({ theme }) => theme.colors.secondary};
  }
  
  label {
    font-weight: 400;
  }
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 500;
  transition: all 0.3s ease;
  margin-top: ${({ theme }) => theme.spacing.xl};
  align-self: flex-end;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 100px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-image: url(${props => props.src || 'https://via.placeholder.com/300x100'});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border: 1px dashed rgba(255, 202, 40, 0.5);
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

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(0, 128, 0, 0.2);
  border: 1px solid ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.success};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const SettingsPage = () => {
  const dispatch = useDispatch();
  const { settings, loading, error, success } = useSelector((state) => state.settings);
  const [activeTab, setActiveTab] = useState('general');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    // General Settings
    storeName: '',
    storeDescription: '',
    storeEmail: '',
    storePhone: '',
    storeAddress: '',
    storeLogo: '',
    storeFavicon: '',
    
    // Payment Settings
    currency: 'USD',
    enableStripe: true,
    enablePaypal: true,
    enableRazorpay: false,
    stripePublicKey: '',
    stripeSecretKey: '',
    paypalClientId: '',
    razorpayKeyId: '',
    razorpayKeySecret: '',
    
    // Shipping Settings
    enableFreeShipping: true,
    freeShippingThreshold: '50',
    enableFlatRate: true,
    flatRateAmount: '5',
    enableLocalPickup: false,
    
    // Email Settings
    emailSender: '',
    emailHost: '',
    emailPort: '',
    emailUsername: '',
    emailPassword: '',
    enableOrderConfirmation: true,
    enableShippingNotification: true,
  });

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings) {
      setFormData({
        ...formData,
        ...settings
      });
    }
  }, [settings, formData]);

  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSettings(formData));
  };

  if (loading && !settings) {
    return (
      <AdminLayout>
        <PageTitle>Store Settings</PageTitle>
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <PageTitle>Store Settings</PageTitle>
        <div>Error: {error}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PageTitle>Store Settings</PageTitle>
      
      {showSuccessMessage && (
        <SuccessMessage>
          <FaCheck /> Settings saved successfully!
        </SuccessMessage>
      )}
      
      <SettingsContainer>
        <TabsContainer>
          <Tab 
            active={activeTab === 'general'} 
            onClick={() => handleTabChange('general')}
          >
            <FaStore /> General
          </Tab>
          <Tab 
            active={activeTab === 'payment'} 
            onClick={() => handleTabChange('payment')}
          >
            <FaCreditCard /> Payment
          </Tab>
          <Tab 
            active={activeTab === 'shipping'} 
            onClick={() => handleTabChange('shipping')}
          >
            <FaShippingFast /> Shipping
          </Tab>
          <Tab 
            active={activeTab === 'email'} 
            onClick={() => handleTabChange('email')}
          >
            <FaEnvelope /> Email
          </Tab>
        </TabsContainer>
        
        <Form onSubmit={handleSubmit}>
          {/* General Settings */}
          <TabContent active={activeTab === 'general'}>
            <FormSection>
              <h3>Store Information</h3>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="storeName">Store Name*</Label>
                  <Input
                    type="text"
                    id="storeName"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="storeEmail">Store Email*</Label>
                  <Input
                    type="email"
                    id="storeEmail"
                    name="storeEmail"
                    value={formData.storeEmail}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <Label htmlFor="storeDescription">Store Description</Label>
                <Textarea
                  id="storeDescription"
                  name="storeDescription"
                  value={formData.storeDescription}
                  onChange={handleInputChange}
                />
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="storePhone">Store Phone</Label>
                  <Input
                    type="tel"
                    id="storePhone"
                    name="storePhone"
                    value={formData.storePhone}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="storeAddress">Store Address</Label>
                  <Input
                    type="text"
                    id="storeAddress"
                    name="storeAddress"
                    value={formData.storeAddress}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </FormRow>
            </FormSection>
            
            <FormSection>
              <h3>Store Branding</h3>
              
              <FormGroup>
                <Label htmlFor="storeLogo">Store Logo URL</Label>
                {formData.storeLogo && (
                  <ImagePreview src={formData.storeLogo} />
                )}
                <Input
                  type="text"
                  id="storeLogo"
                  name="storeLogo"
                  value={formData.storeLogo}
                  onChange={handleInputChange}
                  placeholder="https://example.com/logo.png"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="storeFavicon">Store Favicon URL</Label>
                {formData.storeFavicon && (
                  <ImagePreview src={formData.storeFavicon} />
                )}
                <Input
                  type="text"
                  id="storeFavicon"
                  name="storeFavicon"
                  value={formData.storeFavicon}
                  onChange={handleInputChange}
                  placeholder="https://example.com/favicon.ico"
                />
              </FormGroup>
            </FormSection>
          </TabContent>
          
          {/* Payment Settings */}
          <TabContent active={activeTab === 'payment'}>
            <FormSection>
              <h3>Currency Settings</h3>
              <FormGroup>
                <Label htmlFor="currency">Default Currency</Label>
                <Select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                </Select>
              </FormGroup>
            </FormSection>
            
            <FormSection>
              <h3>Payment Gateways</h3>
              
              <FormGroup>
                <Checkbox>
                  <input
                    type="checkbox"
                    id="enableStripe"
                    name="enableStripe"
                    checked={formData.enableStripe}
                    onChange={handleInputChange}
                  />
                  <Label htmlFor="enableStripe">Enable Stripe</Label>
                </Checkbox>
              </FormGroup>
              
              {formData.enableStripe && (
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="stripePublicKey">Stripe Public Key</Label>
                    <Input
                      type="text"
                      id="stripePublicKey"
                      name="stripePublicKey"
                      value={formData.stripePublicKey}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
                    <Input
                      type="password"
                      id="stripeSecretKey"
                      name="stripeSecretKey"
                      value={formData.stripeSecretKey}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </FormRow>
              )}
              
              <FormGroup>
                <Checkbox>
                  <input
                    type="checkbox"
                    id="enablePaypal"
                    name="enablePaypal"
                    checked={formData.enablePaypal}
                    onChange={handleInputChange}
                  />
                  <Label htmlFor="enablePaypal">Enable PayPal</Label>
                </Checkbox>
              </FormGroup>
              
              {formData.enablePaypal && (
                <FormGroup>
                  <Label htmlFor="paypalClientId">PayPal Client ID</Label>
                  <Input
                    type="text"
                    id="paypalClientId"
                    name="paypalClientId"
                    value={formData.paypalClientId}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              )}
              
              <FormGroup>
                <Checkbox>
                  <input
                    type="checkbox"
                    id="enableRazorpay"
                    name="enableRazorpay"
                    checked={formData.enableRazorpay}
                    onChange={handleInputChange}
                  />
                  <Label htmlFor="enableRazorpay">Enable Razorpay</Label>
                </Checkbox>
              </FormGroup>
              
              {formData.enableRazorpay && (
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="razorpayKeyId">Razorpay Key ID</Label>
                    <Input
                      type="text"
                      id="razorpayKeyId"
                      name="razorpayKeyId"
                      value={formData.razorpayKeyId}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="razorpayKeySecret">Razorpay Key Secret</Label>
                    <Input
                      type="password"
                      id="razorpayKeySecret"
                      name="razorpayKeySecret"
                      value={formData.razorpayKeySecret}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </FormRow>
              )}
            </FormSection>
          </TabContent>
          
          {/* Shipping Settings */}
          <TabContent active={activeTab === 'shipping'}>
            <FormSection>
              <h3>Shipping Methods</h3>
              
              <FormGroup>
                <Checkbox>
                  <input
                    type="checkbox"
                    id="enableFreeShipping"
                    name="enableFreeShipping"
                    checked={formData.enableFreeShipping}
                    onChange={handleInputChange}
                  />
                  <Label htmlFor="enableFreeShipping">Enable Free Shipping</Label>
                </Checkbox>
              </FormGroup>
              
              {formData.enableFreeShipping && (
                <FormGroup>
                  <Label htmlFor="freeShippingThreshold">
                    Minimum Order Amount for Free Shipping ({formData.currency})
                  </Label>
                  <Input
                    type="number"
                    id="freeShippingThreshold"
                    name="freeShippingThreshold"
                    value={formData.freeShippingThreshold}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                </FormGroup>
              )}
              
              <FormGroup>
                <Checkbox>
                  <input
                    type="checkbox"
                    id="enableFlatRate"
                    name="enableFlatRate"
                    checked={formData.enableFlatRate}
                    onChange={handleInputChange}
                  />
                  <Label htmlFor="enableFlatRate">Enable Flat Rate Shipping</Label>
                </Checkbox>
              </FormGroup>
              
              {formData.enableFlatRate && (
                <FormGroup>
                  <Label htmlFor="flatRateAmount">
                    Flat Rate Shipping Amount ({formData.currency})
                  </Label>
                  <Input
                    type="number"
                    id="flatRateAmount"
                    name="flatRateAmount"
                    value={formData.flatRateAmount}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                  />
                </FormGroup>
              )}
              
              <FormGroup>
                <Checkbox>
                  <input
                    type="checkbox"
                    id="enableLocalPickup"
                    name="enableLocalPickup"
                    checked={formData.enableLocalPickup}
                    onChange={handleInputChange}
                  />
                  <Label htmlFor="enableLocalPickup">Enable Local Pickup</Label>
                </Checkbox>
              </FormGroup>
            </FormSection>
          </TabContent>
          
          {/* Email Settings */}
          <TabContent active={activeTab === 'email'}>
            <FormSection>
              <h3>Email Configuration</h3>
              
              <FormGroup>
                <Label htmlFor="emailSender">Sender Email Address</Label>
                <Input
                  type="email"
                  id="emailSender"
                  name="emailSender"
                  value={formData.emailSender}
                  onChange={handleInputChange}
                  placeholder="noreply@yourstore.com"
                />
              </FormGroup>
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="emailHost">SMTP Host</Label>
                  <Input
                    type="text"
                    id="emailHost"
                    name="emailHost"
                    value={formData.emailHost}
                    onChange={handleInputChange}
                    placeholder="smtp.example.com"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="emailPort">SMTP Port</Label>
                  <Input
                    type="text"
                    id="emailPort"
                    name="emailPort"
                    value={formData.emailPort}
                    onChange={handleInputChange}
                    placeholder="587"
                  />
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="emailUsername">SMTP Username</Label>
                  <Input
                    type="text"
                    id="emailUsername"
                    name="emailUsername"
                    value={formData.emailUsername}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="emailPassword">SMTP Password</Label>
                  <Input
                    type="password"
                    id="emailPassword"
                    name="emailPassword"
                    value={formData.emailPassword}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </FormRow>
            </FormSection>
            
            <FormSection>
              <h3>Email Notifications</h3>
              
              <FormGroup>
                <Checkbox>
                  <input
                    type="checkbox"
                    id="enableOrderConfirmation"
                    name="enableOrderConfirmation"
                    checked={formData.enableOrderConfirmation}
                    onChange={handleInputChange}
                  />
                  <Label htmlFor="enableOrderConfirmation">Send Order Confirmation Emails</Label>
                </Checkbox>
              </FormGroup>
              
              <FormGroup>
                <Checkbox>
                  <input
                    type="checkbox"
                    id="enableShippingNotification"
                    name="enableShippingNotification"
                    checked={formData.enableShippingNotification}
                    onChange={handleInputChange}
                  />
                  <Label htmlFor="enableShippingNotification">Send Shipping Notification Emails</Label>
                </Checkbox>
              </FormGroup>
            </FormSection>
          </TabContent>
          
          <SaveButton type="submit">
            <FaSave /> Save Settings
          </SaveButton>
        </Form>
      </SettingsContainer>
    </AdminLayout>
  );
};

export default SettingsPage;
