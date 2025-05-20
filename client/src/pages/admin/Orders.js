import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiEye, FiCheck, FiTruck, FiX, FiMail, FiPrinter, FiPackage, FiDollarSign } from 'react-icons/fi';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';

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
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'Pending':
        return theme.colors.warning;
      case 'Processing':
        return theme.colors.info;
      case 'Shipped':
        return theme.colors.primary;
      case 'Delivered':
        return theme.colors.success;
      case 'Cancelled':
        return theme.colors.danger;
      default:
        return theme.colors.gray[500];
    }
  }};
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
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  max-width: 900px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const ModalClose = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const OrderDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const OrderInfo = styled.div`
  h2 {
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  p {
    margin: ${({ theme }) => theme.spacing.xs} 0;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const OrderActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;



const ActionButtonPrimary = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const OrderDetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OrderDetailSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  h3 {
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1.1rem;
    padding-bottom: ${({ theme }) => theme.spacing.sm};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  }
`;

const OrderItems = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

const OrderItem = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  
  &:last-child {
    border-bottom: none;
  }
  
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

const ItemDetails = styled.div`
  margin-left: ${({ theme }) => theme.spacing.md};
  flex: 1;
  
  h4 {
    margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
    font-size: 1rem;
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const OrderSummary = styled.div`
  background: ${({ theme }) => theme.colors.gray[50]};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  &.total {
    font-weight: bold;
    margin-top: ${({ theme }) => theme.spacing.md};
    padding-top: ${({ theme }) => theme.spacing.md};
    border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: white;
  min-width: 150px;
`;

const SearchInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  flex: 1;
  min-width: 200px;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
`;

// Sample orders data
const sampleOrders = [
  {
    _id: 'ORD123456',
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567'
    },
    orderItems: [
      { _id: '1', name: 'Classic Black T-Shirt - Men', qty: 2, price: 24.99, image: 'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dC1zaGlydHx8fHx8fDE2ODMyMDM5MzA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080', size: 'L', color: 'Black' },
      { _id: '2', name: 'Graphic Print T-Shirt - Men', qty: 1, price: 29.99, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dC1zaGlydHx8fHx8fDE2ODMyMDM5ODI&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080', size: 'M', color: 'White' }
    ],
    shippingAddress: {
      address: '123 Main St',
      city: 'Boston',
      postalCode: '02108',
      country: 'United States'
    },
    paymentMethod: 'Credit Card',
    paymentDetails: {
      id: 'pi_3Mtw5mKn7gFKC1wA0JaOh8Zm',
      status: 'succeeded',
      card: {
        brand: 'visa',
        last4: '4242'
      }
    },
    totalPrice: 79.97,
    status: 'Pending',
    createdAt: '2025-05-18T10:30:00.000Z',
    isPaid: true,
    paidAt: '2025-05-18T10:32:00.000Z',
    isShipped: false,
    shippedAt: null,
    isDelivered: false,
    deliveredAt: null,
    notes: ''
  },
  {
    _id: 'ORD789012',
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543'
    },
    orderItems: [
      { _id: '4', name: 'Organic Cotton T-Shirt - Women', qty: 1, price: 34.99, image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d29tZW4lMjB0LXNoaXJ0fHx8fHx8MTY4MzIwNDA3MQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080', size: 'S', color: 'Pink' },
      { _id: '6', name: 'Slim Fit Cropped T-Shirt - Women', qty: 2, price: 26.99, image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d29tZW4lMjB0LXNoaXJ0fHx8fHx8MTY4MzIwNDE2OA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080', size: 'M', color: 'Black' }
    ],
    shippingAddress: {
      address: '456 Oak Ave, Apt 7B',
      city: 'New York',
      postalCode: '10001',
      country: 'United States'
    },
    paymentMethod: 'PayPal',
    paymentDetails: {
      id: 'PAY-5YK922393D421302CLJBZJVY',
      status: 'COMPLETED',
      email: 'jane@example.com'
    },
    totalPrice: 88.97,
    status: 'Shipped',
    createdAt: '2025-05-17T14:45:00.000Z',
    isPaid: true,
    paidAt: '2025-05-17T14:50:00.000Z',
    isShipped: true,
    shippedAt: '2025-05-18T09:15:00.000Z',
    isDelivered: false,
    deliveredAt: null,
    trackingNumber: 'USP7891234567',
    trackingUrl: 'https://tools.usps.com/go/TrackConfirmAction?tLabels=USP7891234567',
    notes: 'Customer requested gift wrapping'
  },
  {
    _id: 'ORD345678',
    user: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 (555) 456-7890'
    },
    orderItems: [
      { _id: '5', name: 'Vintage Washed T-Shirt - Men', qty: 1, price: 32.99, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dC1zaGlydHx8fHx8fDE2ODMyMDQxMTg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080', size: 'XL', color: 'Blue' }
    ],
    shippingAddress: {
      address: '789 Pine Blvd',
      city: 'San Francisco',
      postalCode: '94107',
      country: 'United States'
    },
    paymentMethod: 'Credit Card',
    paymentDetails: {
      id: 'pi_3MvR5jKn7gFKC1wA1JbPh9Ab',
      status: 'succeeded',
      card: {
        brand: 'mastercard',
        last4: '8765'
      }
    },
    totalPrice: 32.99,
    status: 'Delivered',
    createdAt: '2025-05-15T09:20:00.000Z',
    isPaid: true,
    paidAt: '2025-05-15T09:22:00.000Z',
    isShipped: true,
    shippedAt: '2025-05-16T11:00:00.000Z',
    isDelivered: true,
    deliveredAt: '2025-05-18T13:45:00.000Z',
    trackingNumber: 'FDX9876543210',
    trackingUrl: 'https://www.fedex.com/fedextrack/?trknbr=FDX9876543210',
    notes: ''
  },
  {
    _id: 'ORD901234',
    user: {
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+1 (555) 234-5678'
    },
    orderItems: [
      { _id: '8', name: 'Long Sleeve T-Shirt - Women', qty: 3, price: 31.99, image: 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d29tZW4lMjB0LXNoaXJ0fHx8fHx8MTY4MzIwNDI1NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080', size: 'M', color: 'Burgundy' }
    ],
    shippingAddress: {
      address: '321 Maple Dr',
      city: 'Chicago',
      postalCode: '60601',
      country: 'United States'
    },
    paymentMethod: 'Credit Card',
    paymentDetails: {
      id: 'pi_3MtS9mKn7gFKC1wA0KbQi8Cd',
      status: 'succeeded',
      card: {
        brand: 'amex',
        last4: '0005'
      }
    },
    totalPrice: 95.97,
    status: 'Processing',
    createdAt: '2025-05-19T16:10:00.000Z',
    isPaid: true,
    paidAt: '2025-05-19T16:12:00.000Z',
    isShipped: false,
    shippedAt: null,
    isDelivered: false,
    deliveredAt: null,
    notes: 'Customer requested evening delivery'
  },
  {
    _id: 'ORD562341',
    user: {
      name: 'Robert Chen',
      email: 'robert@example.com',
      phone: '+1 (555) 890-1234'
    },
    orderItems: [
      { _id: '1', name: 'Classic Black T-Shirt - Men', qty: 1, price: 24.99, image: 'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8dC1zaGlydHx8fHx8fDE2ODMyMDM5MzA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080', size: 'M', color: 'Black' },
      { _id: '7', name: 'Pocket T-Shirt - Men', qty: 2, price: 22.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWVuJTIwdC1zaGlydHx8fHx8fDE2ODMyMDQyMTQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080', size: 'L', color: 'Grey' }
    ],
    shippingAddress: {
      address: '567 Cedar Lane',
      city: 'Seattle',
      postalCode: '98101',
      country: 'United States'
    },
    paymentMethod: 'Credit Card',
    paymentDetails: {
      id: 'pi_3MtR7jKn7gFKC1wA0JcRg9Xz',
      status: 'succeeded',
      card: {
        brand: 'discover',
        last4: '1117'
      }
    },
    totalPrice: 70.97,
    status: 'Cancelled',
    createdAt: '2025-05-16T11:30:00.000Z',
    isPaid: true,
    paidAt: '2025-05-16T11:35:00.000Z',
    isShipped: false,
    shippedAt: null,
    isDelivered: false,
    deliveredAt: null,
    notes: 'Customer requested cancellation due to wrong sizes ordered',
    cancelReason: 'Customer requested',
    cancelledAt: '2025-05-16T14:20:00.000Z',
    refundId: 're_3MtR7jKn7gFKC1wA0KcSh8Dw',
    refundStatus: 'succeeded'
  }
];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Order detail modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateSort, setDateSort] = useState('newest'); // 'newest' or 'oldest'
  
  // Load orders
  useEffect(() => {
    // Simulate API call with a delay
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 500));
        setOrders(sampleOrders);
        setFilteredOrders(sampleOrders);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  
  // Apply filters when filter states change
  useEffect(() => {
    let result = [...orders];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => {
        return (
          order._id.toLowerCase().includes(query) ||
          order.user.name.toLowerCase().includes(query) ||
          order.user.email.toLowerCase().includes(query)
        );
      });
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateSort === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredOrders(result);
  }, [orders, statusFilter, searchQuery, dateSort]);

  // View order details
  const handleViewOrder = (orderId) => {
    const order = orders.find(o => o._id === orderId);
    if (order) {
      setSelectedOrder(order);
      setShowOrderModal(true);
    }
  };
  
  // Close order modal
  const handleCloseModal = () => {
    setShowOrderModal(false);
    setSelectedOrder(null);
  };

  // Update order status
  const handleUpdateStatus = (orderId, newStatus) => {
    // In a real app, this would be an API call
    const updatedOrders = orders.map(order => {
      if (order._id === orderId) {
        const updatedOrder = { ...order, status: newStatus };
        
        // Update additional fields based on status
        if (newStatus === 'Shipped') {
          updatedOrder.isShipped = true;
          updatedOrder.shippedAt = new Date().toISOString();
        } else if (newStatus === 'Delivered') {
          updatedOrder.isDelivered = true;
          updatedOrder.deliveredAt = new Date().toISOString();
        } else if (newStatus === 'Cancelled') {
          updatedOrder.cancelledAt = new Date().toISOString();
          updatedOrder.cancelReason = 'Cancelled by admin';
        }
        
        return updatedOrder;
      }
      return order;
    });
    
    setOrders(updatedOrders);
    
    // If currently viewing this order, update it
    if (selectedOrder && selectedOrder._id === orderId) {
      setSelectedOrder(updatedOrders.find(o => o._id === orderId));
    }
    
    // Show success message
    alert(`Order ${orderId} status updated to ${newStatus}`);
  };
  
  // Handle adding tracking number
  const handleAddTracking = (orderId) => {
    const trackingNumber = prompt('Enter tracking number:');
    if (trackingNumber) {
      const trackingUrl = prompt('Enter tracking URL (optional):');
      
      // Update order with tracking info
      const updatedOrders = orders.map(order => {
        if (order._id === orderId) {
          return {
            ...order,
            trackingNumber,
            trackingUrl: trackingUrl || ''
          };
        }
        return order;
      });
      
      setOrders(updatedOrders);
      
      // If currently viewing this order, update it
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder(updatedOrders.find(o => o._id === orderId));
      }
      
      alert(`Tracking information added to order ${orderId}`);
    }
  };
  
  // Email customer
  const handleEmailCustomer = (email, subject = '') => {
    // In a real app, this would open a modal or navigate to an email composition page
    alert(`Email customer at ${email}\nSubject: ${subject || 'Your order from TeeStyle'}`);
  };
  
  // Process refund
  const handleProcessRefund = (orderId, amount) => {
    // In a real app, this would call a payment API
    const confirm = window.confirm(`Process refund of $${amount.toFixed(2)} for order ${orderId}?`);
    
    if (confirm) {
      const updatedOrders = orders.map(order => {
        if (order._id === orderId) {
          return {
            ...order,
            refundId: `re_${Math.random().toString(36).substring(2, 10)}`,
            refundStatus: 'succeeded',
            status: 'Refunded'
          };
        }
        return order;
      });
      
      setOrders(updatedOrders);
      
      // If currently viewing this order, update it
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder(updatedOrders.find(o => o._id === orderId));
      }
      
      alert(`Refund processed for order ${orderId}`);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate order stats
  const getOrderStats = () => {
    const total = orders.length;
    const pending = orders.filter(o => o.status === 'Pending').length;
    const processing = orders.filter(o => o.status === 'Processing').length;
    const shipped = orders.filter(o => o.status === 'Shipped').length;
    const delivered = orders.filter(o => o.status === 'Delivered').length;
    const cancelled = orders.filter(o => o.status === 'Cancelled' || o.status === 'Refunded').length;
    
    return { total, pending, processing, shipped, delivered, cancelled };
  };
  
  const stats = getOrderStats();

  if (loading) return <Loader />;
  if (error) return <Message variant="error" message={error} />;

  return (
    <Container>
      <Title>Order Management</Title>
      
      {/* Order Stats Summary */}
      <OrderDetailSection>
        <h3>Overview</h3>
        <OrderDetailGrid>
          <StatusBadge status="Pending">
            Pending: {stats.pending}
          </StatusBadge>
          <StatusBadge status="Processing">
            Processing: {stats.processing}
          </StatusBadge>
          <StatusBadge status="Shipped">
            Shipped: {stats.shipped}
          </StatusBadge>
          <StatusBadge status="Delivered">
            Delivered: {stats.delivered}
          </StatusBadge>
          <StatusBadge status="Cancelled">
            Cancelled/Refunded: {stats.cancelled}
          </StatusBadge>
          <div style={{ fontWeight: 'bold' }}>
            Total Orders: {stats.total}
          </div>
        </OrderDetailGrid>
      </OrderDetailSection>
      
      {/* Filters */}
      <FilterSection>
        <FilterSelect 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Refunded">Refunded</option>
        </FilterSelect>
        
        <FilterSelect 
          value={dateSort} 
          onChange={(e) => setDateSort(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </FilterSelect>
        
        <SearchInput 
          type="text" 
          placeholder="Search by order ID or customer" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </FilterSection>
      
      {/* Orders Table */}
      <Table>
        <thead>
          <tr>
            <Th>Order ID</Th>
            <Th>Customer</Th>
            <Th>Date</Th>
            <Th>Total</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <Td colSpan="6">No orders found matching your criteria.</Td>
            </tr>
          ) : (
            filteredOrders.map((order) => (
              <tr key={order._id}>
                <Td>{order._id}</Td>
                <Td>
                  <div>{order.user.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{order.user.email}</div>
                </Td>
                <Td>{formatDate(order.createdAt)}</Td>
                <Td>${order.totalPrice.toFixed(2)}</Td>
                <Td>
                  <StatusBadge status={order.status}>{order.status}</StatusBadge>
                </Td>
                <Td>
                  <ActionButtons>
                    <ActionButton onClick={() => handleViewOrder(order._id)} title="View Order">
                      <FiEye />
                    </ActionButton>
                    
                    {order.status === 'Pending' && (
                      <ActionButton onClick={() => handleUpdateStatus(order._id, 'Processing')} title="Process Order">
                        <FiCheck />
                      </ActionButton>
                    )}
                    
                    {order.status === 'Processing' && (
                      <ActionButton onClick={() => handleUpdateStatus(order._id, 'Shipped')} title="Mark as Shipped">
                        <FiTruck />
                      </ActionButton>
                    )}
                    
                    {order.status === 'Shipped' && (
                      <ActionButton onClick={() => handleUpdateStatus(order._id, 'Delivered')} title="Mark as Delivered">
                        <FiCheck />
                      </ActionButton>
                    )}
                    
                    {(order.status === 'Pending' || order.status === 'Processing') && (
                      <ActionButton danger onClick={() => handleUpdateStatus(order._id, 'Cancelled')} title="Cancel Order">
                        <FiX />
                      </ActionButton>
                    )}
                  </ActionButtons>
                </Td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      
      {/* Order Detail Modal */}
      {showOrderModal && selectedOrder && (
        <Modal onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalClose onClick={handleCloseModal}>
              <FiX />
            </ModalClose>
            
            <OrderDetailHeader>
              <OrderInfo>
                <h2>Order {selectedOrder._id}</h2>
                <p>Placed on {formatDate(selectedOrder.createdAt)}</p>
                <p>
                  Status: <StatusBadge status={selectedOrder.status}>{selectedOrder.status}</StatusBadge>
                </p>
              </OrderInfo>
              
              <OrderActions>
                {/* Dynamic action buttons based on order status */}
                {selectedOrder.status === 'Pending' && (
                  <ActionButtonPrimary onClick={() => handleUpdateStatus(selectedOrder._id, 'Processing')}>
                    <FiCheck /> Process Order
                  </ActionButtonPrimary>
                )}
                
                {selectedOrder.status === 'Processing' && (
                  <ActionButtonPrimary onClick={() => handleUpdateStatus(selectedOrder._id, 'Shipped')}>
                    <FiTruck /> Mark as Shipped
                  </ActionButtonPrimary>
                )}
                
                {selectedOrder.status === 'Processing' && (
                  <ActionButtonPrimary onClick={() => handleAddTracking(selectedOrder._id)}>
                    <FiPackage /> Add Tracking
                  </ActionButtonPrimary>
                )}
                
                {selectedOrder.status === 'Shipped' && (
                  <ActionButtonPrimary onClick={() => handleUpdateStatus(selectedOrder._id, 'Delivered')}>
                    <FiCheck /> Mark as Delivered
                  </ActionButtonPrimary>
                )}
                
                <ActionButtonPrimary onClick={() => handleEmailCustomer(selectedOrder.user.email)}>
                  <FiMail /> Email Customer
                </ActionButtonPrimary>
                
                <ActionButtonPrimary onClick={() => window.print()}>
                  <FiPrinter /> Print Order
                </ActionButtonPrimary>
                
                {selectedOrder.isPaid && selectedOrder.status !== 'Refunded' && (
                  <ActionButtonPrimary onClick={() => handleProcessRefund(selectedOrder._id, selectedOrder.totalPrice)}>
                    <FiDollarSign /> Process Refund
                  </ActionButtonPrimary>
                )}
              </OrderActions>
            </OrderDetailHeader>
            
            <OrderDetailGrid>
              <OrderDetailSection>
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> {selectedOrder.user.name}</p>
                <p><strong>Email:</strong> {selectedOrder.user.email}</p>
                {selectedOrder.user.phone && <p><strong>Phone:</strong> {selectedOrder.user.phone}</p>}
              </OrderDetailSection>
              
              <OrderDetailSection>
                <h3>Shipping Address</h3>
                <p>{selectedOrder.shippingAddress.address}</p>
                <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                <p>{selectedOrder.shippingAddress.country}</p>
                
                {selectedOrder.trackingNumber && (
                  <div style={{ marginTop: '10px' }}>
                    <p><strong>Tracking:</strong> {selectedOrder.trackingNumber}</p>
                    {selectedOrder.trackingUrl && (
                      <a href={selectedOrder.trackingUrl} target="_blank" rel="noopener noreferrer">
                        Track Package
                      </a>
                    )}
                  </div>
                )}
              </OrderDetailSection>
            </OrderDetailGrid>
            
            <OrderDetailSection>
              <h3>Payment Information</h3>
              <p><strong>Method:</strong> {selectedOrder.paymentMethod}</p>
              <p><strong>Status:</strong> {selectedOrder.isPaid ? 'Paid' : 'Not Paid'}</p>
              {selectedOrder.isPaid && <p><strong>Paid on:</strong> {formatDate(selectedOrder.paidAt)}</p>}
              
              {selectedOrder.paymentDetails && selectedOrder.paymentDetails.card && (
                <p>
                  <strong>Card:</strong> {selectedOrder.paymentDetails.card.brand.toUpperCase()} ending in {selectedOrder.paymentDetails.card.last4}
                </p>
              )}
              
              {selectedOrder.paymentDetails && selectedOrder.paymentDetails.id && (
                <p><strong>Transaction ID:</strong> {selectedOrder.paymentDetails.id}</p>
              )}
              
              {selectedOrder.refundId && (
                <div style={{ marginTop: '10px' }}>
                  <p><strong>Refund ID:</strong> {selectedOrder.refundId}</p>
                  <p><strong>Refund Status:</strong> {selectedOrder.refundStatus}</p>
                </div>
              )}
            </OrderDetailSection>
            
            <OrderDetailSection>
              <h3>Order Items</h3>
              <OrderItems>
                {selectedOrder.orderItems.map((item) => (
                  <OrderItem key={item._id}>
                    <img src={item.image} alt={item.name} />
                    <ItemDetails>
                      <h4>{item.name}</h4>
                      <p>
                        {item.qty} × ${item.price.toFixed(2)} = ${(item.qty * item.price).toFixed(2)}
                      </p>
                      {item.size && <p>Size: {item.size}</p>}
                      {item.color && <p>Color: {item.color}</p>}
                    </ItemDetails>
                  </OrderItem>
                ))}
              </OrderItems>
            </OrderDetailSection>
            
            <OrderDetailSection>
              <h3>Order Summary</h3>
              <OrderSummary>
                <SummaryRow>
                  <span>Items:</span>
                  <span>${selectedOrder.totalPrice.toFixed(2)}</span>
                </SummaryRow>
                <SummaryRow>
                  <span>Shipping:</span>
                  <span>Free</span>
                </SummaryRow>
                <SummaryRow>
                  <span>Tax:</span>
                  <span>$0.00</span>
                </SummaryRow>
                <SummaryRow className="total">
                  <span>Total:</span>
                  <span>${selectedOrder.totalPrice.toFixed(2)}</span>
                </SummaryRow>
              </OrderSummary>
            </OrderDetailSection>
            
            {selectedOrder.notes && (
              <OrderDetailSection>
                <h3>Notes</h3>
                <p>{selectedOrder.notes}</p>
              </OrderDetailSection>
            )}
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Orders;
