import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiPackage, 
  FiTruck, 
  FiCheckCircle, 
  FiDownload, 
  FiDollarSign, 
  FiMessageSquare,
  FiAlertCircle,
  FiCalendar,
  FiClipboard
} from 'react-icons/fi';
import { adminAPI } from '../../services/api';

const OrderDetailsModal = ({ isOpen, onClose, order, onStatusUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showShipmentModal, setShowShipmentModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('');
  const [shipmentData, setShipmentData] = useState({
    trackingNumber: '',
    carrier: '',
    estimatedDelivery: '',
    trackingUrl: ''
  });
  const [orderNote, setOrderNote] = useState('');
  
  if (!order) return null;
  
  const handleUpdateStatus = async (newStatus) => {
    try {
      setLoading(true);
      await adminAPI.updateOrderStatus(order._id, newStatus);
      onStatusUpdate(order._id, newStatus);
      setLoading(false);
    } catch (error) {
      console.error('Error updating order status:', error);
      setLoading(false);
    }
  };
  
  const handleCancelOrder = async () => {
    if (!cancelReason.trim()) {
      alert('Please provide a reason for cancellation');
      return;
    }
    
    try {
      setLoading(true);
      await adminAPI.cancelOrder(order._id, cancelReason);
      onStatusUpdate(order._id, 'Cancelled');
      setShowCancelModal(false);
      setCancelReason('');
      setLoading(false);
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert(error.response?.data?.message || 'Failed to cancel order');
      setLoading(false);
    }
  };
  
  const handleProcessRefund = async () => {
    if (!refundReason.trim()) {
      alert('Please provide a reason for the refund');
      return;
    }
    
    try {
      setLoading(true);
      const refundData = {
        amount: refundAmount ? parseFloat(refundAmount) : order.totalAmount,
        reason: refundReason
      };
      
      await adminAPI.processRefund(order._id, refundData);
      onStatusUpdate(order._id, order.orderStatus, 'Refunded');
      setShowRefundModal(false);
      setRefundAmount('');
      setRefundReason('');
      setLoading(false);
    } catch (error) {
      console.error('Error processing refund:', error);
      alert(error.response?.data?.message || 'Failed to process refund');
      setLoading(false);
    }
  };
  
  const handleAddShipment = async () => {
    if (!shipmentData.trackingNumber || !shipmentData.carrier) {
      alert('Please provide tracking number and carrier');
      return;
    }
    
    try {
      setLoading(true);
      await adminAPI.updateShipment(order._id, shipmentData);
      onStatusUpdate(order._id, 'Shipped');
      setShowShipmentModal(false);
      setShipmentData({
        trackingNumber: '',
        carrier: '',
        estimatedDelivery: '',
        trackingUrl: ''
      });
      setLoading(false);
    } catch (error) {
      console.error('Error updating shipment:', error);
      alert(error.response?.data?.message || 'Failed to update shipment');
      setLoading(false);
    }
  };
  
  const handleAddNote = async () => {
    if (!orderNote.trim()) {
      alert('Please enter a note');
      return;
    }
    
    try {
      setLoading(true);
      await adminAPI.addOrderNote(order._id, orderNote);
      onStatusUpdate(order._id, order.orderStatus); // Refresh the order
      setShowNoteModal(false);
      setOrderNote('');
      setLoading(false);
    } catch (error) {
      console.error('Error adding note:', error);
      alert(error.response?.data?.message || 'Failed to add note');
      setLoading(false);
    }
  };
  
  const getNextStatusAction = () => {
    // Ensure we're using the correct property name for order status
    const status = order.orderStatus || order.status;
    
    switch (status) {
      case 'pending':
        return {
          label: 'Mark as Processing',
          status: 'processing',
          icon: <FiPackage />,
          color: 'info'
        };
      case 'processing':
        return {
          label: 'Mark as Shipped',
          status: 'shipped',
          icon: <FiTruck />,
          color: 'primary'
        };
      case 'shipped':
        return {
          label: 'Mark as Delivered',
          status: 'delivered',
          icon: <FiCheckCircle />,
          color: 'success'
        };
      default:
        return null;
    }
  };
  
  const nextAction = getNextStatusAction();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContainer
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ModalContent>
            <ModalHeader>
              <ModalTitle>Order #{order._id.slice(-6)}</ModalTitle>
              <CloseButton onClick={onClose}>
                <FiX />
              </CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <OrderInfo>
                <InfoSection>
                  <SectionTitle>Order Details</SectionTitle>
                  <InfoGrid>
                    <InfoItem>
                      <InfoLabel>Order ID</InfoLabel>
                      <InfoValue>{order._id}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Date</InfoLabel>
                      <InfoValue>{new Date(order.createdAt).toLocaleString()}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Status</InfoLabel>
                      <OrderStatus status={order.orderStatus || order.status}>
                        {order.orderStatus || order.status}
                      </OrderStatus>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Payment</InfoLabel>
                      <PaymentStatus status={order.paymentStatus || order.paymentMethod}>
                        {order.paymentStatus || order.paymentMethod || 'Unknown'}
                      </PaymentStatus>
                    </InfoItem>
                  </InfoGrid>
                </InfoSection>
                
                <InfoSection>
                  <SectionTitle>Customer</SectionTitle>
                  <InfoGrid>
                    <InfoItem>
                      <InfoLabel>Name</InfoLabel>
                      <InfoValue>{order.user.name}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Email</InfoLabel>
                      <InfoValue>{order.user.email}</InfoValue>
                    </InfoItem>
                  </InfoGrid>
                </InfoSection>
                
                <InfoSection>
                  <SectionTitle>Shipping Address</SectionTitle>
                  <AddressBlock>
                    <p>{order.shippingAddress.street}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </AddressBlock>
                </InfoSection>
                
                <InfoSection>
                  <SectionTitle>Products</SectionTitle>
                  <ProductsList>
                    {order.products && order.products.length > 0 ? (
                      order.products.map((item, index) => {
                        // Handle different product structures
                        const productInfo = item.product || item;
                        const productName = productInfo.name || 'Product';
                        const productImages = productInfo.images || [];
                        const productImage = productImages.length > 0 
                          ? productImages[0] 
                          : (productInfo.imageUrl || 'https://via.placeholder.com/80x80?text=No+Image');
                        const size = item.size || '-';
                        const color = item.color || '-';
                        const price = item.price || productInfo.price || 0;
                        const quantity = item.quantity || 1;
                        
                        return (
                          <ProductItem key={index}>
                            <ProductImage>
                              <img src={productImage} alt={productName} />
                            </ProductImage>
                            <ProductDetails>
                              <ProductName>{productName}</ProductName>
                              <ProductMeta>
                                <span>Size: {size}</span>
                                <span>Color: {color}</span>
                              </ProductMeta>
                              <ProductPrice>
                                ${price.toFixed(2)} × {quantity}
                              </ProductPrice>
                            </ProductDetails>
                            <ProductTotal>
                              ${(price * quantity).toFixed(2)}
                            </ProductTotal>
                          </ProductItem>
                        );
                      })
                    ) : (
                      <EmptyMessage>No products in this order</EmptyMessage>
                    )}
                  </ProductsList>
                </InfoSection>
                
                <InfoSection>
                  <SectionTitle>Order Summary</SectionTitle>
                  <SummaryList>
                    <SummaryItem>
                      <span>Subtotal</span>
                      <span>${order.totalAmount.toFixed(2)}</span>
                    </SummaryItem>
                    <SummaryItem>
                      <span>Shipping</span>
                      <span>$0.00</span>
                    </SummaryItem>
                    <SummaryItem>
                      <span>Tax</span>
                      <span>$0.00</span>
                    </SummaryItem>
                    <SummaryTotal>
                      <span>Total</span>
                      <span>${order.totalAmount.toFixed(2)}</span>
                    </SummaryTotal>
                  </SummaryList>
                </InfoSection>
              </OrderInfo>
            </ModalBody>
            
            <ModalFooter>
              <FooterButtons>
                <InvoiceButton>
                  <FiDownload />
                  <span>Download Invoice</span>
                </InvoiceButton>
                
                {/* Order status update button */}
                {nextAction && (
                  <StatusButton 
                    color={nextAction.color}
                    onClick={() => handleUpdateStatus(nextAction.status)}
                    disabled={loading}
                  >
                    {nextAction.icon}
                    <span>{loading ? 'Updating...' : nextAction.label}</span>
                  </StatusButton>
                )}
                
                {/* Cancel order button - only show if order is not delivered, shipped or cancelled */}
                {!['delivered', 'shipped', 'cancelled'].includes((order.orderStatus || order.status || '').toLowerCase()) && (
                  <ActionButton 
                    color="error"
                    onClick={() => setShowCancelModal(true)}
                    title="Cancel Order"
                  >
                    <FiX />
                    <span>Cancel Order</span>
                  </ActionButton>
                )}
                
                {/* Process refund button - only show for delivered, shipped or cancelled orders */}
                {['delivered', 'shipped', 'cancelled'].includes((order.orderStatus || order.status || '').toLowerCase()) && 
                 !(order.refundStatus === 'Refunded') && (
                  <ActionButton 
                    color="warning"
                    onClick={() => setShowRefundModal(true)}
                    title="Process Refund"
                  >
                    <FiDollarSign />
                    <span>Process Refund</span>
                  </ActionButton>
                )}
                
                {/* Add shipment tracking button - only show for processing orders */}
                {(order.orderStatus || order.status || '').toLowerCase() === 'processing' && (
                  <ActionButton 
                    color="primary"
                    onClick={() => setShowShipmentModal(true)}
                    title="Add Tracking"
                  >
                    <FiTruck />
                    <span>Add Tracking</span>
                  </ActionButton>
                )}
                
                {/* Add note button - always available */}
                <ActionButton 
                  color="info"
                  onClick={() => setShowNoteModal(true)}
                  title="Add Note"
                >
                  <FiMessageSquare />
                  <span>Add Note</span>
                </ActionButton>
              </FooterButtons>
            </ModalFooter>
            </ModalContent>
          </ModalContainer>
          
          {/* Cancel Order Modal */}
          {showCancelModal && (
            <SubModalOverlay>
              <SubModalContainer
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
              <SubModalHeader>
                <h3><FiX /> Cancel Order</h3>
                <CloseButton onClick={() => setShowCancelModal(false)}>
                  <FiX />
                </CloseButton>
              </SubModalHeader>
              <SubModalContent>
                <p>Are you sure you want to cancel this order? This action cannot be undone.</p>
                <FormGroup>
                  <FormLabel>Cancellation Reason</FormLabel>
                  <TextArea 
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Please provide a reason for cancellation"
                    rows={3}
                  />
                </FormGroup>
              </SubModalContent>
              <SubModalFooter>
                <CancelButton onClick={() => setShowCancelModal(false)}>Cancel</CancelButton>
                <ActionButton 
                  color="error" 
                  onClick={handleCancelOrder}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Confirm Cancellation'}
                </ActionButton>
              </SubModalFooter>
              </SubModalContainer>
            </SubModalOverlay>
          )}
          
          {/* Refund Modal */}
          {showRefundModal && (
            <SubModalOverlay>
              <SubModalContainer
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
              <SubModalHeader>
                <h3><FiDollarSign /> Process Refund</h3>
                <CloseButton onClick={() => setShowRefundModal(false)}>
                  <FiX />
                </CloseButton>
              </SubModalHeader>
              <SubModalContent>
                <p>Process a refund for this order. The customer will be notified.</p>
                <FormGroup>
                  <FormLabel>Refund Amount</FormLabel>
                  <FormInput 
                    type="number" 
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(e.target.value)}
                    placeholder={`Full amount: $${order.totalAmount?.toFixed(2) || '0.00'}`}
                  />
                  <FormHint>Leave blank for full refund</FormHint>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Refund Reason</FormLabel>
                  <TextArea 
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    placeholder="Please provide a reason for the refund"
                    rows={3}
                  />
                </FormGroup>
              </SubModalContent>
              <SubModalFooter>
                <CancelButton onClick={() => setShowRefundModal(false)}>Cancel</CancelButton>
                <ActionButton 
                  color="warning" 
                  onClick={handleProcessRefund}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Process Refund'}
                </ActionButton>
              </SubModalFooter>
              </SubModalContainer>
            </SubModalOverlay>
          )}
          
          {/* Shipment Modal */}
          {showShipmentModal && (
            <SubModalOverlay>
              <SubModalContainer
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
              <SubModalHeader>
                <h3><FiTruck /> Add Shipment Tracking</h3>
                <CloseButton onClick={() => setShowShipmentModal(false)}>
                  <FiX />
                </CloseButton>
              </SubModalHeader>
              <SubModalContent>
                <p>Add tracking information for this order. The status will be updated to Shipped.</p>
                <FormGroup>
                  <FormLabel>Tracking Number</FormLabel>
                  <FormInput 
                    type="text" 
                    value={shipmentData.trackingNumber}
                    onChange={(e) => setShipmentData({...shipmentData, trackingNumber: e.target.value})}
                    placeholder="Enter tracking number"
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Carrier</FormLabel>
                  <FormSelect
                    value={shipmentData.carrier}
                    onChange={(e) => setShipmentData({...shipmentData, carrier: e.target.value})}
                  >
                    <option value="">Select carrier</option>
                    <option value="USPS">USPS</option>
                    <option value="FedEx">FedEx</option>
                    <option value="UPS">UPS</option>
                    <option value="DHL">DHL</option>
                    <option value="Other">Other</option>
                  </FormSelect>
                </FormGroup>
                <FormRow>
                  <FormGroup>
                    <FormLabel>Estimated Delivery</FormLabel>
                    <FormInput 
                      type="date" 
                      value={shipmentData.estimatedDelivery}
                      onChange={(e) => setShipmentData({...shipmentData, estimatedDelivery: e.target.value})}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Tracking URL (Optional)</FormLabel>
                    <FormInput 
                      type="text" 
                      value={shipmentData.trackingUrl}
                      onChange={(e) => setShipmentData({...shipmentData, trackingUrl: e.target.value})}
                      placeholder="https://"
                    />
                  </FormGroup>
                </FormRow>
              </SubModalContent>
              <SubModalFooter>
                <CancelButton onClick={() => setShowShipmentModal(false)}>Cancel</CancelButton>
                <ActionButton 
                  color="primary" 
                  onClick={handleAddShipment}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Add Tracking & Ship'}
                </ActionButton>
              </SubModalFooter>
              </SubModalContainer>
            </SubModalOverlay>
          )}
          
          {/* Add Note Modal */}
          {showNoteModal && (
            <SubModalOverlay>
              <SubModalContainer
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
              <SubModalHeader>
                <h3><FiMessageSquare /> Add Note</h3>
                <CloseButton onClick={() => setShowNoteModal(false)}>
                  <FiX />
                </CloseButton>
              </SubModalHeader>
              <SubModalContent>
                <p>Add an internal note to this order. Notes are only visible to administrators.</p>
                <FormGroup>
                  <TextArea 
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="Enter your note here"
                    rows={4}
                  />
                </FormGroup>
              </SubModalContent>
              <SubModalFooter>
                <CancelButton onClick={() => setShowNoteModal(false)}>Cancel</CancelButton>
                <ActionButton 
                  color="info" 
                  onClick={handleAddNote}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Add Note'}
                </ActionButton>
              </SubModalFooter>
              </SubModalContainer>
            </SubModalOverlay>
          )}
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

// Styled components with superhero theme
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  /* Ensure modal is on top of everything and properly centered */
  padding-left: 250px; /* Adjust for sidebar width */
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const ModalContainer = styled(motion.div)`
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  position: relative;
  margin: 0 auto; /* Center the modal */
  display: flex;
  flex-direction: column;
  z-index: 1001;
`;

const ModalContent = styled.div`
  background: linear-gradient(to bottom, #1a1a2e, #16213e);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  margin: 0 auto; /* Center the modal */
  
  /* Superhero comic style border */
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff0055, #0066ff, #00ff99, #ff0055);
    z-index: -1;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background-size: 400%;
    animation: glowingBorder 8s linear infinite;
  }
  
  @keyframes glowingBorder {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
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
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(0, 195, 255, 0.5);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 50%;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: rotate(90deg);
  }
`;

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const InfoSection = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const SectionTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 1.2rem;
  font-weight: 500;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const InfoLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const InfoValue = styled.span`
  color: ${({ theme }) => theme.colors.text.light};
  font-weight: 500;
`;

const OrderStatus = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
  
  ${({ status, theme }) => {
    // Convert status to lowercase for case-insensitive comparison
    const statusLower = (status || '').toLowerCase();
    
    if (statusLower === 'delivered') {
      return `
        background: rgba(67, 160, 71, 0.2);
        color: ${theme.colors.success};
        border: 1px solid rgba(67, 160, 71, 0.3);
      `;
    } else if (statusLower === 'shipped') {
      return `
        background: rgba(25, 118, 210, 0.2);
        color: ${theme.colors.primary};
        border: 1px solid rgba(25, 118, 210, 0.3);
      `;
    } else if (statusLower === 'processing') {
      return `
        background: rgba(2, 136, 209, 0.2);
        color: ${theme.colors.info};
        border: 1px solid rgba(2, 136, 209, 0.3);
      `;
    } else if (statusLower === 'pending') {
      return `
        background: rgba(255, 160, 0, 0.2);
        color: ${theme.colors.warning};
        border: 1px solid rgba(255, 160, 0, 0.3);
      `;
    } else {
      return `
        background: rgba(158, 158, 158, 0.2);
        color: ${theme.colors.text.secondary};
        border: 1px solid rgba(158, 158, 158, 0.3);
      `;
    }
  }}
`;

const PaymentStatus = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
  
  ${({ status, theme }) => {
    if (status === 'paid') {
      return `
        background: rgba(67, 160, 71, 0.2);
        color: ${theme.colors.success};
        border: 1px solid rgba(67, 160, 71, 0.3);
      `;
    } else {
      return `
        background: rgba(255, 160, 0, 0.2);
        color: ${theme.colors.warning};
        border: 1px solid rgba(255, 160, 0, 0.3);
      `;
    }
  }}
`;

const AddressBlock = styled.div`
  color: ${({ theme }) => theme.colors.text.light};
  
  p {
    margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ProductsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ProductItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ProductName = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.light};
`;

const ProductMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ProductPrice = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ProductTotal = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.light};
  align-self: center;
`;

const SummaryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.light};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const ModalFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
`;

const InvoiceButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text.light};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const EmptyMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
  background: rgba(0, 0, 0, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px dashed rgba(255, 255, 255, 0.1);
`;

const StatusButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  ${({ color, theme, disabled }) => {
    const baseColor = theme.colors[color] || theme.colors.primary;
    
    if (disabled) {
      return `
        background: rgba(100, 100, 100, 0.2);
        color: ${theme.colors.text.secondary};
        border: 1px solid rgba(100, 100, 100, 0.3);
        cursor: not-allowed;
        transform: none;
      `;
    }
    
    return `
      background: ${baseColor}40;
      color: ${baseColor};
      border: 1px solid ${baseColor}60;
      
      &:hover {
        background: ${baseColor}60;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px ${baseColor}30;
      }
    `;
  }}
`;

// Sub-modal components for additional actions
const SubModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1100;
  backdrop-filter: blur(4px);
`;

const SubModalContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
`;

const SubModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  h3 {
    margin: 0;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text.primary};
    
    svg {
      opacity: 0.8;
    }
  }
`;

const SubModalContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  
  p {
    margin-top: 0;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const SubModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FormRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  ${FormGroup} {
    flex: 1;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const FormInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}30;
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}30;
  }
  
  option {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}30;
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const FormHint = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-style: italic;
`;

const CancelButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background: rgba(100, 100, 100, 0.2);
  border: 1px solid rgba(100, 100, 100, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: rgba(100, 100, 100, 0.3);
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  ${({ color, theme, disabled }) => {
    const baseColor = theme.colors[color] || theme.colors.primary;
    
    if (disabled) {
      return `
        background: rgba(100, 100, 100, 0.2);
        color: ${theme.colors.text.secondary};
        border: 1px solid rgba(100, 100, 100, 0.3);
        cursor: not-allowed;
        transform: none;
      `;
    }
    
    return `
      background: ${baseColor}40;
      color: ${baseColor};
      border: 1px solid ${baseColor}60;
      
      &:hover {
        background: ${baseColor}60;
        transform: translateY(-2px);
        box-shadow: 0 4px 10px ${baseColor}30;
      }
    `;
  }}
`;

export default OrderDetailsModal;
