import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUsers, FiShoppingBag, FiDollarSign, FiTruck, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { adminAPI } from '../services/api';
import AdminLayout from '../components/layout/AdminLayout';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalUsers: 0,
    pendingOrders: 0,
    recentOrders: [],
    salesData: {
      labels: [],
      datasets: []
    },
    topProducts: []
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await adminAPI.getDashboardStats();
        
        // Format chart data
        const chartData = {
          labels: response.data.salesData.map(item => item.date),
          datasets: [
            {
              label: 'Sales ($)',
              data: response.data.salesData.map(item => item.amount),
              borderColor: '#FFCA28',
              backgroundColor: 'rgba(255, 202, 40, 0.1)',
              tension: 0.4,
              fill: true,
            }
          ]
        };
        
        setStats({
          ...response.data,
          salesData: chartData
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ECEFF1'
        }
      },
      title: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        titleColor: '#FFCA28',
        bodyColor: '#FFFFFF',
        borderColor: 'rgba(255, 202, 40, 0.3)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: '#B0BEC5'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)'
        },
        ticks: {
          color: '#B0BEC5'
        }
      }
    }
  };

  return (
    <AdminLayout title="Dashboard">
      <DashboardContainer>
        {loading ? (
          <LoadingMessage>Loading dashboard data...</LoadingMessage>
        ) : (
          <>
            <StatsGrid>
              <motion.div 
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <StatsCard color="heroBlue">
                  <StatsIcon>
                    <FiDollarSign />
                  </StatsIcon>
                  <StatsContent>
                    <StatsValue>${stats.totalSales.toFixed(2)}</StatsValue>
                    <StatsTitle>Total Sales</StatsTitle>
                    <StatsChange positive>
                      <FiArrowUp /> 12.5%
                    </StatsChange>
                  </StatsContent>
                </StatsCard>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <StatsCard color="heroRed">
                  <StatsIcon>
                    <FiShoppingBag />
                  </StatsIcon>
                  <StatsContent>
                    <StatsValue>{stats.totalOrders}</StatsValue>
                    <StatsTitle>Total Orders</StatsTitle>
                    <StatsChange positive>
                      <FiArrowUp /> 8.3%
                    </StatsChange>
                  </StatsContent>
                </StatsCard>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <StatsCard color="secondary">
                  <StatsIcon>
                    <FiUsers />
                  </StatsIcon>
                  <StatsContent>
                    <StatsValue>{stats.totalUsers}</StatsValue>
                    <StatsTitle>Total Users</StatsTitle>
                    <StatsChange positive>
                      <FiArrowUp /> 15.2%
                    </StatsChange>
                  </StatsContent>
                </StatsCard>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <StatsCard color="villainPurple">
                  <StatsIcon>
                    <FiTruck />
                  </StatsIcon>
                  <StatsContent>
                    <StatsValue>{stats.pendingOrders}</StatsValue>
                    <StatsTitle>Pending Orders</StatsTitle>
                    <StatsChange>
                      <FiArrowDown /> 5.1%
                    </StatsChange>
                  </StatsContent>
                </StatsCard>
              </motion.div>
            </StatsGrid>
            
            <DashboardGrid>
              <ChartContainer
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <SectionTitle>Sales Overview</SectionTitle>
                <ChartWrapper>
                  <Line data={stats.salesData} options={chartOptions} />
                </ChartWrapper>
              </ChartContainer>
              
              <RecentOrdersContainer
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <SectionTitle>Recent Orders</SectionTitle>
                {stats.recentOrders.length > 0 ? (
                  <OrdersTable>
                    <OrdersTableHead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </OrdersTableHead>
                    <OrdersTableBody>
                      {stats.recentOrders.map((order) => (
                        <OrdersTableRow key={order._id}>
                          <td>#{order._id.slice(-6)}</td>
                          <td>{order.user.name}</td>
                          <td>${order.totalAmount.toFixed(2)}</td>
                          <td>
                            <OrderStatus status={order.status}>
                              {order.status}
                            </OrderStatus>
                          </td>
                        </OrdersTableRow>
                      ))}
                    </OrdersTableBody>
                  </OrdersTable>
                ) : (
                  <EmptyMessage>No recent orders found</EmptyMessage>
                )}
              </RecentOrdersContainer>
            </DashboardGrid>
            
            <TopProductsContainer
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <SectionTitle>Top Selling Products</SectionTitle>
              {stats.topProducts.length > 0 ? (
                <ProductsGrid>
                  {stats.topProducts.map((product) => (
                    <ProductCard key={product._id}>
                      <ProductImage src={product.images[0]} alt={product.name} />
                      <ProductDetails>
                        <ProductName>{product.name}</ProductName>
                        <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                        <ProductSales>{product.totalSold} sold</ProductSales>
                      </ProductDetails>
                    </ProductCard>
                  ))}
                </ProductsGrid>
              ) : (
                <EmptyMessage>No product data available</EmptyMessage>
              )}
            </TopProductsContainer>
          </>
        )}
      </DashboardContainer>
    </AdminLayout>
  );
};

// Styled components with superhero theme
const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StatsCard = styled.div`
  background: ${({ theme, color }) => `linear-gradient(135deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), linear-gradient(45deg, ${theme.colors[color || 'primary']}40, transparent)`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme, color }) => `${theme.colors[color || 'primary']}30`};
  position: relative;
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  /* Comic book style border */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 95%, rgba(255,255,255,0.1) 100%);
    background-size: 100% 100%;
    pointer-events: none;
    z-index: 2;
  }
  
  /* Starry effect */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 100px 100px;
    z-index: -1;
    opacity: 0.5;
  }
`;

const StatsIcon = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-right: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 0 15px rgba(255, 202, 40, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatsContent = styled.div`
  flex: 1;
`;

const StatsValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  text-shadow: ${({ theme }) => theme.effects.textShadow.normal};
`;

const StatsTitle = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatsChange = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: ${({ theme, positive }) => positive ? theme.colors.success : theme.colors.error};
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartContainer = styled.div`
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.background.starry}, ${theme.colors.background.deeper})`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  overflow: hidden;
  
  /* Comic book style border */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 95%, rgba(255,255,255,0.1) 100%);
    background-size: 100% 100%;
    pointer-events: none;
    z-index: 2;
  }
`;

const ChartWrapper = styled.div`
  height: 300px;
  position: relative;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography.heading.fontFamily};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 1.5rem;
  text-shadow: 0 0 8px rgba(255, 202, 40, 0.5);
`;

const RecentOrdersContainer = styled.div`
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.background.starry}, ${theme.colors.background.deeper})`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  overflow: hidden;
  
  /* Comic book style border */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 95%, rgba(255,255,255,0.1) 100%);
    background-size: 100% 100%;
    pointer-events: none;
    z-index: 2;
  }
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const OrdersTableHead = styled.thead`
  th {
    text-align: left;
    padding: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text.secondary};
    font-weight: 500;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const OrdersTableBody = styled.tbody``;

const OrdersTableRow = styled.tr`
  td {
    padding: ${({ theme }) => theme.spacing.md};
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const OrderStatus = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
  
  ${({ status, theme }) => {
    if (status === 'delivered') {
      return `
        background: rgba(67, 160, 71, 0.2);
        color: ${theme.colors.success};
        border: 1px solid rgba(67, 160, 71, 0.3);
      `;
    } else if (status === 'shipped') {
      return `
        background: rgba(2, 136, 209, 0.2);
        color: ${theme.colors.info};
        border: 1px solid rgba(2, 136, 209, 0.3);
      `;
    } else if (status === 'processing') {
      return `
        background: rgba(255, 160, 0, 0.2);
        color: ${theme.colors.warning};
        border: 1px solid rgba(255, 160, 0, 0.3);
      `;
    } else {
      return `
        background: rgba(211, 47, 47, 0.2);
        color: ${theme.colors.error};
        border: 1px solid rgba(211, 47, 47, 0.3);
      `;
    }
  }}
`;

const TopProductsContainer = styled.div`
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.background.starry}, ${theme.colors.background.deeper})`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  overflow: hidden;
  
  /* Comic book style border */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0) 95%, rgba(255,255,255,0.1) 100%);
    background-size: 100% 100%;
    pointer-events: none;
    z-index: 2;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ProductCard = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.secondary}50;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProductDetails = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const ProductName = styled.h3`
  font-size: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.white};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProductSales = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const EmptyMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
`;

export default DashboardPage;
