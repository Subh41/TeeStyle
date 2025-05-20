import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiCreditCard, FiDollarSign } from 'react-icons/fi';
import { SiPaypal } from 'react-icons/si';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #666;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #4CAF50;
    }
  }
`;

const OrderSummary = styled.div`
  h2 {
    margin: 0;
    margin-bottom: 1.5rem;
    color: #333;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
  color: #666;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
    color: #333;
    font-weight: 600;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #388E3C;
  }
  
  &:disabled {
    background: #9E9E9E;
    cursor: not-allowed;
  }
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.25rem;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
`;

const PaymentMethods = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PaymentMethodOption = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 2px solid ${({ selected }) => selected ? '#4CAF50' : '#ddd'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${({ selected }) => selected ? 'rgba(76, 175, 80, 0.1)' : 'transparent'};
  
  &:hover {
    border-color: #4CAF50;
    background-color: rgba(76, 175, 80, 0.05);
  }
  
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 1rem;
    font-size: 1.5rem;
    color: ${({ selected }) => selected ? '#4CAF50' : '#757575'};
  }
  
  .details {
    flex: 1;
  }
  
  .title {
    font-weight: 500;
    color: ${({ selected }) => selected ? '#4CAF50' : '#333'};
    margin-bottom: 4px;
  }
  
  .description {
    font-size: 0.875rem;
    color: #757575;
  }
`;

const CardForm = styled.div`
  display: ${({ visible }) => (visible ? 'grid' : 'none')};
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => columns || '1fr'};
  gap: 1rem;
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 3rem 1.5rem;
  
  .icon {
    font-size: 4rem;
    color: #4CAF50;
    margin-bottom: 1.5rem;
  }
  
  h1 {
    margin-bottom: 1rem;
    color: #333;
  }
  
  p {
    color: #666;
    margin-bottom: 0.5rem;
  }
`;

const CheckoutPage = () => {
  const navigate = useNavigate();

  const { items, total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    // Credit card fields
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  // Pre-fill form with user data if available
  useEffect(() => {
    if (user) {
      const names = user.name ? user.name.split(' ') : ['', ''];
      setFormData(prevData => ({
        ...prevData,
        firstName: names[0] || '',
        lastName: names.slice(1).join(' ') || '',
        email: user.email || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.postalCode || '',
        country: user.country || ''
      }));
    }
  }, [user]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Basic form validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || 
        !formData.city || !formData.state || !formData.zipCode || !formData.country) {
      alert('Please fill in all required shipping information');
      return;
    }
    
    // Validate form based on payment method
    if (paymentMethod === 'creditCard') {
      if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
        alert('Please fill in all credit card details');
        return;
      }
    }
    
    // Process the order
    setIsProcessing(true);
    
    // Create order data
    const orderData = {
      shippingDetails: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      },
      items,
      total: total + (total * 0.07), // Including tax
      tax: total * 0.07,
      paymentMethod,
      paymentDetails: paymentMethod === 'creditCard' ? {
        cardNumber: formData.cardNumber.replace(/\s/g, '').slice(-4), // Only store last 4 digits
        cardName: formData.cardName,
        expiryDate: formData.expiryDate,
        // Don't store CVV for security reasons
      } : {}
    };
    
    // Simulate API call with delay
    setTimeout(() => {
      // In a real app, this would be an API call to process the order
      console.log('Order processed:', orderData);
      
      // Save payment method if requested
      if (paymentMethod === 'creditCard' && formData.saveCard && user) {
        // In a real app, this would save to the user profile via API
        console.log('Saving card to profile:', {
          last4: formData.cardNumber.replace(/\s/g, '').slice(-4),
          expiryDate: formData.expiryDate
        });
      }
      
      // Clear cart (in a real app)
      // dispatch(clearCart());
      
      setIsProcessing(false);
      setOrderComplete(true);
      
      // Navigate to order confirmation page after a delay
      // In a real app, this would include the order ID
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  // If order is complete, show success message
  if (orderComplete) {
    return (
      <Container>
        <SuccessMessage>
          <div className="icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase. Your order has been placed successfully.</p>
          <p>You will receive a confirmation email shortly.</p>
          <p>Redirecting to your orders page...</p>
        </SuccessMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Checkout</Title>
      <Grid>
        <div>
          <Section>
            <SectionTitle>Shipping Information</SectionTitle>
            <Form onSubmit={handleSubmit}>
              <FormRow columns="1fr 1fr">
                <FormGroup>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormRow columns="2fr 1fr">
                <FormGroup>
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="zipCode">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>
              
              <FormRow columns="1fr 1fr">
                <FormGroup>
                  <label htmlFor="state">State/Province</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </FormRow>
            </Form>
          </Section>
          
          <Section>
            <SectionTitle>Payment Method</SectionTitle>
            <PaymentMethods>
              <PaymentMethodOption 
                selected={paymentMethod === 'creditCard'}
                onClick={() => handlePaymentMethodChange('creditCard')}
              >
                <div className="icon"><FiCreditCard /></div>
                <div className="details">
                  <div className="title">Credit / Debit Card</div>
                  <div className="description">Pay with Visa, Mastercard, or other cards</div>
                </div>
              </PaymentMethodOption>
              
              <PaymentMethodOption 
                selected={paymentMethod === 'paypal'}
                onClick={() => handlePaymentMethodChange('paypal')}
              >
                <div className="icon"><SiPaypal /></div>
                <div className="details">
                  <div className="title">PayPal</div>
                  <div className="description">Pay with your PayPal account</div>
                </div>
              </PaymentMethodOption>
              
              <PaymentMethodOption 
                selected={paymentMethod === 'cod'}
                onClick={() => handlePaymentMethodChange('cod')}
              >
                <div className="icon"><FiDollarSign /></div>
                <div className="details">
                  <div className="title">Cash on Delivery</div>
                  <div className="description">Pay when you receive your order</div>
                </div>
              </PaymentMethodOption>
            </PaymentMethods>
            
            {/* Credit Card Form */}
            <CardForm visible={paymentMethod === 'creditCard'}>
              <FormGroup>
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  maxLength="19"
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="cardName">Name on Card</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  placeholder="John Doe"
                  value={formData.cardName}
                  onChange={handleChange}
                />
              </FormGroup>
              
              <FormRow columns="1fr 1fr">
                <FormGroup>
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    maxLength="5"
                  />
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    maxLength="4"
                  />
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    name="saveCard"
                    checked={formData.saveCard}
                    onChange={handleChange}
                    style={{ marginRight: '8px' }}
                  />
                  Save card for future purchases
                </label>
              </FormGroup>
            </CardForm>
            
            {/* PayPal Info */}
            {paymentMethod === 'paypal' && (
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px', marginBottom: '20px' }}>
                <p>You will be redirected to PayPal to complete your payment after reviewing your order.</p>
              </div>
            )}
            
            {/* COD Info */}
            {paymentMethod === 'cod' && (
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '4px', marginBottom: '20px' }}>
                <p>You will pay the full amount when your order is delivered.</p>
                <p>Please have the exact amount ready to ensure a smooth delivery.</p>
              </div>
            )}
            
            <Button 
              type="button" 
              onClick={handleSubmit}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>
          </Section>
        </div>
        
        <Section>
          <OrderSummary>
            <h2>Order Summary</h2>
            {items.map((item) => (
              <div key={item.cartItemId} style={{ 
                display: 'flex', 
                marginBottom: '15px', 
                paddingBottom: '15px',
                borderBottom: '1px solid #eee'
              }}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '15px' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    {item.quantity} × ${item.price.toFixed(2)}
                    {item.selectedSize && <span> | Size: {item.selectedSize}</span>}
                    {item.selectedColor && <span> | Color: {item.selectedColor}</span>}
                  </div>
                </div>
                <div style={{ fontWeight: 'bold' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            
            <SummaryItem>
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </SummaryItem>
            <SummaryItem>
              <span>Shipping</span>
              <span>Free</span>
            </SummaryItem>
            <SummaryItem>
              <span>Tax</span>
              <span>${(total * 0.07).toFixed(2)}</span>
            </SummaryItem>
            <SummaryItem>
              <span>Total</span>
              <span>${(total + (total * 0.07)).toFixed(2)}</span>
            </SummaryItem>
          </OrderSummary>
        </Section>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
