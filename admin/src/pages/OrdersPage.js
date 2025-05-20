import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiEye, FiCheckCircle, FiTruck, FiPackage } from 'react-icons/fi';
import { adminAPI } from '../services/api';
import AdminLayout from '../components/layout/AdminLayout';
import OrderDetailsModal from '../components/orders/OrderDetailsModal';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  
  // Fetch a single order's details
  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await adminAPI.getOrder(orderId);
      return response.data;
    } catch (error) {
      console.error('Error fetching order details:', error);
      return null;
    }
  };
  
  // Handle order status updates, refunds, cancellations, etc.
  const handleOrderStatusUpdate = async (orderId, newStatus, refundStatus) => {
    setOrders(orders.map(order => {
      if (order._id === orderId) {
        const updatedOrder = { ...order, orderStatus: newStatus };
        
        // If refund status is provided, update it
        if (refundStatus) {
          updatedOrder.refundStatus = refundStatus;
        }
        
        return updatedOrder;
      }
      return order;
    }));
    
    // If the order details modal is open, update the current order
    if (showOrderDetails && currentOrder && currentOrder._id === orderId) {
      // Fetch the updated order to get all the changes
      const updatedOrder = await fetchOrderDetails(orderId);
      if (updatedOrder) {
        setCurrentOrder(updatedOrder);
      }
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);
  
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getOrders();
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };
  
  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    setShowOrderDetails(true);
  };
  
  const handleUpdateStatus = async (orderId, status) => {
    try {
      await adminAPI.updateOrderStatus(orderId, status);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  
  const filteredOrders = orders.filter(order => {
    // Filter by search term
    const searchMatch = 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status - handle both status and orderStatus properties
    const orderStatus = order.orderStatus || order.status;
    const statusMatch = statusFilter === 'all' || 
      (orderStatus && orderStatus.toLowerCase() === statusFilter.toLowerCase());
    
    return searchMatch && statusMatch;
  });
  
  // Sort orders by date (newest first)
  const sortedOrders = [...filteredOrders].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
  
  return (
    <AdminLayout title="Orders">
      <PageContainer>
        <ActionBar>
          <SearchContainer>
            <SearchIcon>
              <FiSearch />
            </SearchIcon>
            <SearchInput 
              type="text" 
              placeholder="Search by order ID, customer name or email..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchContainer>
          
          <FilterContainer>
            <FilterLabel>Status:</FilterLabel>
            <StatusFilterButtons>
              <StatusButton 
                active={statusFilter === 'all'} 
                onClick={() => handleStatusFilter('all')}
              >
                All
              </StatusButton>
              <StatusButton 
                active={statusFilter === 'pending'} 
                onClick={() => handleStatusFilter('pending')}
                color="warning"
              >
                Pending
              </StatusButton>
              <StatusButton 
                active={statusFilter === 'processing'} 
                onClick={() => handleStatusFilter('processing')}
                color="info"
              >
                Processing
              </StatusButton>
              <StatusButton 
                active={statusFilter === 'shipped'} 
                onClick={() => handleStatusFilter('shipped')}
                color="primary"
              >
                Shipped
              </StatusButton>
              <StatusButton 
                active={statusFilter === 'delivered'} 
                onClick={() => handleStatusFilter('delivered')}
                color="success"
              >
                Delivered
              </StatusButton>
            </StatusFilterButtons>
          </FilterContainer>
        </ActionBar>
        
        {loading ? (
          <LoadingMessage>Loading orders...</LoadingMessage>
        ) : (
          <>
            {sortedOrders.length > 0 ? (
              <OrdersTable>
                <OrdersTableHead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </OrdersTableHead>
                <OrdersTableBody>
                  {sortedOrders.map((order) => (
                    <OrdersTableRow 
                      key={order._id}
                      as={motion.tr}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    >
                      <td>#{order._id.slice(-6)}</td>
                      <td>
                        <CustomerInfo>
                          <CustomerName>{order.user.name}</CustomerName>
                          <CustomerEmail>{order.user.email}</CustomerEmail>
                        </CustomerInfo>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>${order.totalAmount.toFixed(2)}</td>
                      <td>
                        <OrderStatus status={order.orderStatus || order.status}>
                          {order.orderStatus || order.status}
                        </OrderStatus>
                      </td>
                      <td>
                        <ActionButtons>
                          <ActionButton 
                            onClick={() => handleViewOrder(order)}
                            title="View Order Details"
                          >
                            <FiEye />
                          </ActionButton>
                          
                          {order.status === 'pending' && (
                            <ActionButton 
                              onClick={() => handleUpdateStatus(order._id, 'processing')}
                              color="info"
                              title="Mark as Processing"
                            >
                              <FiPackage />
                            </ActionButton>
                          )}
                          
                          {order.status === 'processing' && (
                            <ActionButton 
                              onClick={() => handleUpdateStatus(order._id, 'shipped')}
                              color="primary"
                              title="Mark as Shipped"
                            >
                              <FiTruck />
                            </ActionButton>
                          )}
                          
                          {order.status === 'shipped' && (
                            <ActionButton 
                              onClick={() => handleUpdateStatus(order._id, 'delivered')}
                              color="success"
                              title="Mark as Delivered"
                            >
                              <FiCheckCircle />
                            </ActionButton>
                          )}
                        </ActionButtons>
                      </td>
                    </OrdersTableRow>
                  ))}
                </OrdersTableBody>
              </OrdersTable>
            ) : (
              <EmptyMessage>
                {searchTerm || statusFilter !== 'all' 
                  ? 'No orders match your search criteria' 
                  : 'No orders found'}
              </EmptyMessage>
            )}
          </>
        )}
      </PageContainer>
      
      {/* Order Details Modal */}
      <OrderDetailsModal 
        isOpen={showOrderDetails} 
        onClose={() => setShowOrderDetails(false)} 
        order={currentOrder}
        onStatusUpdate={handleOrderStatusUpdate}
      />
    </AdminLayout>
  );
};

// Styled components with superhero theme
const PageContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const ActionBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  padding-left: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 1rem;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 0 2px rgba(255, 202, 40, 0.3);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.7;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const FilterLabel = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
`;

const StatusFilterButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const StatusButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  ${({ active, color, theme }) => {
    if (active) {
      if (color === 'success') {
        return `
          background: rgba(67, 160, 71, 0.3);
          color: ${theme.colors.success};
          border: 1px solid ${theme.colors.success};
        `;
      } else if (color === 'primary') {
        return `
          background: rgba(25, 118, 210, 0.3);
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
        `;
      } else if (color === 'warning') {
        return `
          background: rgba(255, 160, 0, 0.3);
          color: ${theme.colors.warning};
          border: 1px solid ${theme.colors.warning};
        `;
      } else if (color === 'info') {
        return `
          background: rgba(2, 136, 209, 0.3);
          color: ${theme.colors.info};
          border: 1px solid ${theme.colors.info};
        `;
      } else {
        return `
          background: rgba(255, 202, 40, 0.3);
          color: ${theme.colors.secondary};
          border: 1px solid ${theme.colors.secondary};
        `;
      }
    } else {
      return `
        background: rgba(0, 0, 0, 0.2);
        color: ${theme.colors.text.secondary};
        border: 1px solid rgba(255, 255, 255, 0.1);
        
        &:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }
      `;
    }
  }}
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.background.starry}, ${theme.colors.background.deeper})`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const OrdersTableHead = styled.thead`
  background: rgba(0, 0, 0, 0.3);
  
  th {
    text-align: left;
    padding: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text.secondary};
    font-weight: 500;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const OrdersTableBody = styled.tbody``;

const OrdersTableRow = styled.tr`
  transition: all ${({ theme }) => theme.transitions.fast};
  
  td {
    padding: ${({ theme }) => theme.spacing.lg};
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  &:last-child td {
    border-bottom: none;
  }
`;

const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CustomerName = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
`;

const CustomerEmail = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const OrderStatus = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.8rem;
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

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, color }) => color ? `${theme.colors[color]}40` : 'rgba(255, 255, 255, 0.1)'};
  color: ${({ theme, color }) => color ? theme.colors[color] : theme.colors.white};
  border: 1px solid ${({ theme, color }) => color ? `${theme.colors[color]}60` : 'rgba(255, 255, 255, 0.2)'};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: translateY(-2px);
    background: ${({ theme, color }) => color ? `${theme.colors[color]}60` : 'rgba(255, 255, 255, 0.2)'};
    box-shadow: 0 0 10px ${({ theme, color }) => color ? `${theme.colors[color]}50` : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const EmptyMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export default OrdersPage;
